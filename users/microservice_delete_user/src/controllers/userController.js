import * as userModel from '../models/userModel.js';

const deleteUser = async (req, res) => {
    const { id } = req.params;  

    try {
        const result = await userModel.deleteUser(id);  

        if (!result) {
            return res.status(404).json({ message: 'User not found' });  
        }

        return res.status(200).json({ message: 'User deleted successfully', id: result.id }); 
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Error deleting user' });
    }
};

export { deleteUser };