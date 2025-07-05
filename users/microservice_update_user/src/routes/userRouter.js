import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.put('/update', userController.updateUser);  

export default router;
