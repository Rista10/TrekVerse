import express from 'express';
import { loginUser, refreshAccessToken, registerUser,getCurrentUser, logoutUser, getUserByEmail } from '../Controllers/authControllers.js'
import { verifyAccessToken } from '../Middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/refresh', refreshAccessToken)
router.get('/me', verifyAccessToken, getCurrentUser);
router.post('/logout', logoutUser);
router.get("/user/:email", getUserByEmail);

export default router;