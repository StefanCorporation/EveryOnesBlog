import express from 'express';

import { getProfilePage } from '../controllers/profilePage.js';


const router = express.Router();

router.get('/Profile', getProfilePage);

export default router;