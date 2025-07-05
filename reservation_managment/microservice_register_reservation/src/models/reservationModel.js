import { connectDB } from '../config/postgredb.js';

const registerReservation = async (user_id, book_title, return_date = null) => {
  try {
    const query = `
      INSERT INTO book_reservations (user_id, book_title, return_date)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [user_id, book_title, return_date];

    const result = await connectDB.query(query, values);

    return result.rows[0]; // Devuelve la reservación registrada
  } catch (error) {
    console.error('Error registering reservation:', error);
    throw error;
  }
};

export { registerReservation };



