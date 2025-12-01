import express from "express";

import { getLoginPage } from '../controllers/loginPage.js';



const router = express.Router();

router.get('/Login', getLoginPage);

export default router;
