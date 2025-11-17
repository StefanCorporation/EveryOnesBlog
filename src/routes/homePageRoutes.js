import express from 'express';

import { getHomePage } from "../controllers/homePage.js";


const router = express.Router();


router.get('/', getHomePage);


export default router;

