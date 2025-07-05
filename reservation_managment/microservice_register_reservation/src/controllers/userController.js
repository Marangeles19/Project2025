import * as usergModelModel from '../models/userModel.js';

const registerUser = async (req, res) => {
    const { name, lastname, email } = req.body; 
    try {
        if (!name || !lastname || !email) {
            return res.status(400).json({ message: 'All fields are required: name, description, category' });
        }

        const newuser = await userModelModel.registerUser(name, lastname, email);
        res.status(201).json(newUser);
    } catch (err) {
        console.error('Error register user', err);
        res.status(500).json({ message: 'Error register user' });
    }
};

export { registerUser };




