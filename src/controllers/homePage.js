import Post from '../models/Post.js';


export const getHomePage = (req, res) => {
    res.render('pages/index.ejs', {
        title: 'Home',
        errors: {},
        old: {}
    });
};

// POST: Save new post
export const createPost = async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/EveryOnesBlog/login');
    }

    const { title, content } = req.body;
    let image = null;

    try {
        if (req.file) {
            image = `/uploads/postsImages/${req.file.filename}`;
        }

        const post = new Post({
            title,
            content,
            author: req.session.userId,
            image
        });

        await post.save();

        // Always redirect — let getAllPosts handle rendering
        res.redirect('/EveryOnesBlog');

    } catch (err) {
        console.error('Error creating post:', err);
        // Even on error, redirect — or go to a dedicated error page
        // But best: redirect and show flash message later
        res.redirect('/EveryOnesBlog');  // ← just redirect
    }
};

// GET: Show all posts (homepage or feed)
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', 'username firstname lastname profilePicture')  // get author info
            .sort({ createdAt: -1 })
            .limit(50);

        res.render('pages/index.ejs', {
            title: 'Home',
            posts
        });
    } catch (err) {
        console.error(err);
        res.render('pages/index.ejs', {
            title: 'Home',
            posts: []
        });
    }
};