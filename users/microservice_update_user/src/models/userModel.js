import { connectDB } from '../config/postgredb.js';

export const updateUser = async (id, name, lastname, email) => {
  try {
    if (!name || !lastname|| !email) {
      throw new Error('All fields must be filled');
    }

    const query = `
      UPDATE users_db
      SET name = $1, 
      lastname = $2, 
      email = $3
      WHERE id = $4
      RETURNING *;
    `;
    
    const values = [name, lastname,email, id];
    const res = await connectDB.query(query, values);

    if (res.rowCount === 0) {
      throw new Error('No user found with the provided ID');
    }

    return res.rows[0];  
  } catch (err) {
    throw new Error(`Error updating user: ${err.message}`);
  }
};

