import express from 'express';

import { getRegistrationPage } from '../controllers/registrationPage.js'


const router = express.Router();

router.get('/Registration', getRegistrationPage);


export default router; 