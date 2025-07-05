import { connectDB } from '../config/postgredb.js';

const registerUser = async (name, lastname, email) => {
  try {
    const query = `
      INSERT INTO users_db (name, lastname, email)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [name, lastname, email];

    const result = await connectDB.query(query, values);

    return result.rows[0]; // Returns the registered user
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export { registerUser };
