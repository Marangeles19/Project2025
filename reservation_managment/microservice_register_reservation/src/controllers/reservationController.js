import * as reservationModel from '../models/reservationModel.js';

const registerReservation = async (req, res) => {
    const { user_id, book_title, return_date } = req.body;

    try {
        if (!user_id || !book_title) {
            return res.status(400).json({ 
                message: 'All fields are required: user_id, book_title'
            });
        }

        const newReservation = await reservationModel.registerReservation(user_id, book_title, return_date);
        res.status(201).json(newReservation);

    } catch (err) {
        console.error('Error registering reservation', err);
        res.status(500).json({ message: 'Error registering reservation' });
    }
};

export { registerReservation };
