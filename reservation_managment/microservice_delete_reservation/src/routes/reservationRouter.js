import express from 'express';
import * as reservationController from '../controllers/reservationController.js'; // Import the user controller

const router = express.Router();

router.delete('/delete/:id', reservationController.deleteReservation); // Delete a reservation by ID

export default router;

