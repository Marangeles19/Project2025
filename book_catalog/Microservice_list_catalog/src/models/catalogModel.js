import { connectDB } from '../config/postrgedb.js';

export const getCatalog = async () => {
  try {
    const result = await connectDB.query('SELECT * FROM catalog_db');
    return result.rows;
  } catch (error) {
    console.error('Error getting catalogs:', error);
    throw error;
  }
};

