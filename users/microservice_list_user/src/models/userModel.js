import { connectDB } from '../config/postrgedb.js';

export const getUser = async () => {
  try {
    const result = await connectDB.query('SELECT * FROM users_db');
    return result.rows;
  } catch (error) {
    console.error('Error getting users:', error);
    throw error;
  }
};

