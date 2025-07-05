import * as reservationModel from '../models/reservationModel.js';

const getReservation = async (req, res) => {
    try {
        const reservation = await reservationModel.getReservation();
        res.status(200).json(reservation);
    } catch (err) {
        console.error('Error getting reservations', err);
        res.status(500).json({ message: 'Error getting reservation' });
    }
};

export { getReservation };
