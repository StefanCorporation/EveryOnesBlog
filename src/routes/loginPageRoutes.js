import express from "express";

// import { getLoginPage } from '../controllers/loginPage.js';
import { getLoginPage, login } from "../controllers/authController.js";


const router = express.Router();



// LOGOUT ROUTE
router.get('/logout', (req, res) => {
    // Destroy the session
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.redirect('/EveryOnesBlog'); // fallback
        }
        // Optional: Clear the session cookie
        res.clearCookie('connect.sid'); // default cookie name for express-session
        res.redirect('/EveryOnesBlog'); // or '/EveryOnesBlog/login'
    });
});


router.get('/login', getLoginPage);
router.post('/login', login);


export default router;
