import express from 'express';
import multer from 'multer';
import path from 'path';

// import { getProfilePage } from '../controllers/profilePage.js';
import { getProfilePage, updateProfile } from '../controllers/profilePage.js';


const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, '/uploads/usersAvatars/');
    },
    filename: (req, res, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math(random() * 1E9));
        cb(null, 'avatar-', + req.session.UserId + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});


const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, res, cb) => {
        const filetypes = /jpeg|jpg|png|webp/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        }
        cb(new Error('Only images are allowed!'));
  }

});


router.get('/Profile', getProfilePage);
router.post('/profile', upload.single('avatar'), updateProfile);

export default router;