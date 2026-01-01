import express from 'express';
import multer from 'multer';
import path from 'path';

import { 
    getProfilePage, 
    updateProfile, 
    getEditPost, 
    updatePost, 
    deletePost 
} from '../controllers/profilePage.js';



const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/usersAvatars');  // ← correct path
    },
    filename: (req, file, cb) => {
        cb(null, 'avatar-' + req.session.userId + '-' + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
    fileFilter: (req, file, cb) => {  // ← correct parameters: req, file, cb
        const filetypes = /jpeg|jpg|png|webp/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        }
        cb(new Error('Only image files (jpg, jpeg, png, webp) are allowed!'));
    }
});

// Routes
router.get('/profile', getProfilePage);
router.post('/profile', upload.single('avatar'), updateProfile);

router.get('/edit-post/:id', getEditPost);
router.post('/edit-post/:id', upload.single('image'), updatePost);
router.post('/delete-post/:id', deletePost);


export default router;