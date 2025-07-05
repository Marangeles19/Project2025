import { connectDB } from '../config/postrgedb.js';

export const getReservation = async () => {
  try {
    const result = await connectDB.query('SELECT * FROM book_reservations');
    return result.rows;
  } catch (error) {
    console.error('Error getting reservation:', error);
    throw error;
  }
};

