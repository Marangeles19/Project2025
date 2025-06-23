import { connectDB } from '../config/postgredb.js';

const registerCatalog = async (name, description, category) => {
  try {
    const query = `
      INSERT INTO catalog_db (name, description, category) 
      VALUES ($1, $2, $3) 
      RETURNING *;
    `;
    const values = [name, description, category];

    const result = await connectDB.query(query, values);

    return result.rows[0]; // Retorna el catálogo registrado
  } catch (error) {
    console.error('Error registering catalog:', error);
    throw error;
  }
};

export { registerCatalog };
