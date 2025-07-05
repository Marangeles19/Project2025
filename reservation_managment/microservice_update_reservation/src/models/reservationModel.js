import { connectDB } from '../config/postgredb.js';

export const updateReservation = async (id, book_title, return_date, status) => {
  try {
    if (!book_title || !status) {
      throw new Error('Book title and status must be provided');
    }

    // If return_date is optional you could not force validation here

    const query = `
      UPDATE book_reservations
      SET 
        book_title = $1,
        return_date = $2,
        status = $3
      WHERE id = $4
      RETURNING *;
    `;
    
    const values = [book_title, return_date, status, id];
    const res = await connectDB.query(query, values);

    if (res.rowCount === 0) {
      throw new Error('No reservation found with the provided ID');
    }

    return res.rows[0];
  } catch (err) {
    throw new Error(`Error updating reservation: ${err.message}`);
  }
};