import express from 'express';
import * as reservationController from '../controllers/reservationController.js';

const router = express.Router();

router.get('/list', reservationController.getReservation); // Endpoint to get the list of  reservations

export default router;