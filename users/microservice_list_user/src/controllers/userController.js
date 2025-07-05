import * as usergModel from '../models/userModel.js';

const getUser = async (req, res) => {
    try {
        const user = await usergModel.getUser();
        res.status(200).json(user);
    } catch (err) {
        console.error('Error getting users', err);
        res.status(500).json({ message: 'Error getting users' });
    }
};

export { getUser };
