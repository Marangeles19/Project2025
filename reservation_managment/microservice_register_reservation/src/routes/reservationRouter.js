import express from 'express';
import { registerReservation } from '../controllers/reservationController.js';

const router = express.Router();

router.post('/register', registerReservation);

export default router;
