import express from 'express';
import multer from 'multer';
import path from 'path';
import { getAllPosts, createPost } from '../controllers/homePage.js';  // ← use getAllPosts!

const router = express.Router();

// Multer for post images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/postsImages');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'post-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif|webp/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (extname) {
            return cb(null, true);
        }
        cb(new Error('Images only!'));
    }
});

// Homepage: Show all posts
router.get('/', getAllPosts);  // ← THIS is the key change!

// Create post (from modal or form)
router.post('/create-post', upload.single('image'), createPost);

export default router;