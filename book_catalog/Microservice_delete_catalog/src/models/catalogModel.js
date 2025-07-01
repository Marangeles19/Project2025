import { connectDB } from '../config/postgredb.js';  

const deleteCatalog = async (id) => {
    try {
        if (!id || isNaN(id)) {
            throw new Error('Invalid ID provided');
        }
        const result = await connectDB.query(
            'DELETE FROM catalog_db WHERE id = $1 RETURNING *',
            [id] 
        );
        if (result.rows.length === 0) {
            return null; 
        }

        return result.rows[0]; 
    } catch (error) {
        throw new Error(`Error deleting catalog: ${error.message}`);

    }
};

export { deleteCatalog };