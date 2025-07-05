import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.get('/list', userController.getUser); // Endpoint to get the list of users

export default router;