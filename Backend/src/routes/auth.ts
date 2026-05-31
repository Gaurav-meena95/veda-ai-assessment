import { Router } from 'express';
import authController from '../controllers/authController';

const router = Router();

// Route for register/signup
router.post('/register', authController.register);

// Route for login
router.post('/login', authController.login);

// Route for fetching active session user info
router.get('/me', authController.getMe);

export default router;
