import { connectDB } from '../config/postgredb.js';  

const deleteUser = async (id) => {
    try {
        if (!id || isNaN(id)) {
            throw new Error('Invalid ID provided');
        }
        const result = await connectDB.query(
            'DELETE FROM users_db WHERE id = $1 RETURNING *',
            [id] 
        );
        if (result.rows.length === 0) {
            return null; 
        }

        return result.rows[0]; 
    } catch (error) {
        throw new Error(`Error deleting users: ${error.message}`);

    }
};

export { deleteUser };