import express from 'express';

// import { getRegistrationPage } from '../controllers/registrationPage.js'
import { registration, getRegistrationPage } from '../controllers/authController.js';

const router = express.Router();

router.get('/registration', getRegistrationPage);
router.post('/registration', registration);

export default router; 