import express from 'express';
import {  isAuthenticated, sendResetOtp, verifiEmail } from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';

const authRouter = express.Router();

authRouter.get('/is-auth', userAuth, isAuthenticated);
authRouter.post('/send-reset-otp', sendResetOtp);
authRouter.post('/verify-account', userAuth, verifiEmail);
export default authRouter;
