import express from 'express';
import * as reservationController from '../controllers/reservationController.js';

const router = express.Router();

router.put('/update/:id', reservationController.updateReservation);  

export default router;
