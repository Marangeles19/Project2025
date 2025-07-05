import * as userModel from '../models/userModel.js';

const updateUser = async (req, res) => {
  try {
    console.log('👉 Body recibido:', req.body); // para debug

    const { id, name, lastname, email } = req.body;

    if (!id || !name || !lastname || !email) {
      return res.status(400).json({ 
        message: 'All fields are required: id, name, lastname, email' 
      });
    }

    const updatedUser = await userModel.updateUser(id, name, lastname, email);

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found or not updated' });
    }

    res.status(200).json({ success: true, user: updatedUser });
  } catch (err) {
    console.error('Error updating user', err);
    res.status(500).json({ message: 'Error updating user', error: err.message });
  }
};

export { updateUser };
