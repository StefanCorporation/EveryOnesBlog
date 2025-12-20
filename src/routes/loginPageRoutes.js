import express from "express";

// import { getLoginPage } from '../controllers/loginPage.js';
import { getLoginPage, login } from "../controllers/authController.js";


const router = express.Router();

router.get('/login', getLoginPage);
router.post('/login', login);

export default router;
