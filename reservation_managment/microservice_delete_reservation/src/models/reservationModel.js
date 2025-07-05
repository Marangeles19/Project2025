import { connectDB } from '../config/postgredb.js';

const deleteReservation = async (id) => {
    try {
        const reservationId = parseInt(id);
        if (isNaN(reservationId)) {
            throw new Error('Invalid ID provided');
        }

        const result = await connectDB.query(
            'DELETE FROM book_reservations WHERE id = $1 RETURNING *',
            [reservationId]
        );

        if (result.rows.length === 0) {
            throw new Error(`No reservation found with ID ${reservationId}`);
        }

        return result.rows[0];
    } catch (error) {
        throw new Error(`Error deleting reservation: ${error.message}`);
    }
};

export { deleteReservation };
