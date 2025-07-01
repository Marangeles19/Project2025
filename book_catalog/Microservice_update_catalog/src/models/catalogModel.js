import { connectDB } from '../config/postgredb.js';

export const updateCatalog = async (id, name, description, category) => {
  try {
    if (!name || !description || !category) {
      throw new Error('All fields must be filled');
    }

    const query = `
      UPDATE catalog_db
      SET name = $1, description = $2, category = $3
      WHERE id = $4
      RETURNING *;
    `;
    
    const values = [name, description, category, id];
    const res = await connectDB.query(query, values);

    if (res.rowCount === 0) {
      throw new Error('No catalog found with the provided ID');
    }

    return res.rows[0];  
  } catch (err) {
    throw new Error(`Error updating catalog: ${err.message}`);
  }
};

