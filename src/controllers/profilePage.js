import User from '../models/User.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';




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
            delete req.session.UserId;
            return res.redirect('EevryOnesBlog/login');
        }

        res.render('pages/profile.ejs', {
            title: 'Profile',
            user, // ← pass full user to template
            errors: {},
            success: null
        });
    } catch (err) {
        console.error(err);
        res.redirect('/EveryOnesBlog')
    }
};


//post
export const updateProfile = async (req, res) => {
    if (!req.session.UserId) {
        return res.redirect('EveryOnesBlog/login');
    }


    const { firstname, lastname, username, email } = req.body;
    let profilePicture = null;

    try {
        const user = await User.findById(req.session.UserId);
        if(!user) {
            delete req.session.UserId;
            return res.render('EveryOnesBlog/login');
        }
    

    if (req.file) {
        profilePicture = `/uploads/userAvatars/${req.file.filename}`;

        //option delete old avatar id exists
        if (user.profilePicture && user.profilePicture.include('/uploads/userAvatars/')) {
            const oldPath = path.join(__dirname, '..', '..', 'public', user.profilePicture) 
        } if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath);
        }

    } 

    //Update fields 
    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    user.username = username || user.username;
    if (profilePicture) {
        user.profilePicture = ProfilePicture;
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
