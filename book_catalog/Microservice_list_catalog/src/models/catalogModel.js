import { connectDB } from '../config/postgredb.js';

export const getCatalog = async () => {
  try {
    const result = await connectDB.query('SELECT * FROM catalog');
    return result.rows;
  } catch (error) {
    console.error('Error al obtener catálogos:', error);
    throw error;
  }
};

