import express from 'express';
import * as userController from '../controllers/userController.js'; // Import the user controller

const router = express.Router();

router.delete('/delete/:id', userController.deleteUser); // Delete a user by ID

export default router;

