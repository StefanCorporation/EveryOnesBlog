import User from '../models/User.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';


import Post from '../models/Post.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//get
export const getProfilePage = async (req, res) => {
    if(!req.session.userId) {
        return res.redirect('EveryOnesBlog/login');
    }

    try {
        const user = await User.findById(req.session.userId);
        if (!user) {
            delete req.session.userId;
            return res.redirect('EevryOnesBlog/login');
        }


        const posts = await Post.find({ author: req.session.userId })
            .sort({ createdAt: -1 })
            .populate('author', 'username firstname lastname profilePicture');

        res.render('pages/profile.ejs', {
            title: 'Profile',
            user, // ← pass full user to template
            errors: {},
            success: null,
            posts,
        });
    } catch (err) {
        console.error(err);
        res.redirect('/EveryOnesBlog')
    }
};


//post
export const updateProfile = async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/EveryOnesBlog/login');
    }


    const { firstname, lastname, username, email } = req.body;
    let profilePicture = null;

    try {
        const user = await User.findById(req.session.userId);
        if(!user) {
            delete req.session.userId;
            return res.render('/EveryOnesBlog/login');
        }
    

    if (req.file) {
        profilePicture = `/uploads/usersAvatars/${req.file.filename}`;

        //option delete old avatar id exists
        if (user.profilePicture && user.profilePicture.includes('/uploads/usersAvatars/')) {
            const oldPath = path.join(__dirname, '..', '..', 'public', user.profilePicture);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
        }

    } 

    //Update fields 
    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    user.username = username || user.username;
    if (profilePicture) {
        user.profilePicture = profilePicture;
    }

    await user.save();
    req.session.username = user.username;

    res.render('pages/profile.ejs', {
      title: 'My Profile',
      user,
      success: 'Profile updated successfully!',
      errors: {}
    });

} catch (err) {
    console.error(err);
    res.render('pages/profile.ejs', {
        title: 'My Profile',
        user: await User.findById(req.session.userId),
        errors: { general: 'Something went wrong. Please try again.'},
        success: null,
    });
  }
};





// GET: Show edit form for a post
export const getEditPost = async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/EveryOnesBlog/login');
    }

    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.redirect('/EveryOnesBlog/profile');
        }

        // Security: Only author can edit
        if (post.author.toString() !== req.session.userId) {
            return res.status(403).send('You can only edit your own posts!');
        }

        res.render('pages/editPost.ejs', {
            title: 'Edit Post',
            post,
            errors: {}
        });
    } catch (err) {
        console.error(err);
        res.redirect('/EveryOnesBlog/profile');
    }
};

// POST: Update a post
export const updatePost = async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/EveryOnesBlog/login');
    }

    const { title, content } = req.body;
    let image = null;

    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.redirect('/EveryOnesBlog/profile');
        }

        // Security check
        if (post.author.toString() !== req.session.userId) {
            return res.status(403).send('Unauthorized');
        }

        // Handle new image
        if (req.file) {
            image = `/uploads/posts/${req.file.filename}`;

            // Delete old image if exists
            if (post.image) {
                const oldPath = path.join(__dirname, '..', '..', 'public', post.image);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
        }

        // Update fields
        post.title = title || post.title;
        post.content = content || post.content;
        if (image) post.image = image;

        await post.save();

        res.redirect('/EveryOnesBlog/profile');
    } catch (err) {
        console.error(err);
        const post = await Post.findById(req.params.id);
        res.render('pages/editPost.ejs', {
            title: 'Edit Post',
            post,
            errors: { general: 'Something went wrong' }
        });
    }
};

// POST: Delete a post
export const deletePost = async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/EveryOnesBlog/login');
    }

    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.redirect('/EveryOnesBlog/profile');
        }

        // Security: Only author can delete
        if (post.author.toString() !== req.session.userId) {
            return res.status(403).send('Unauthorized');
        }

        // Delete image from disk if exists
        if (post.image) {
            const imagePath = path.join(__dirname, '..', '..', 'public', post.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await Post.deleteOne({ _id: req.params.id });

        res.redirect('/EveryOnesBlog/profile');
    } catch (err) {
        console.error(err);
        res.redirect('/EveryOnesBlog/profile');
    }
};