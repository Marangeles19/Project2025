import * as catalogModelModel from '../models/catalogModel.js';

const registerCatalog = async (req, res) => {
    const { name, description, category } = req.body; 
    try {
        if (!name || !description || !category) {
            return res.status(400).json({ message: 'All fields are required: name, description, category' });
        }

        const newCatalog = await catalogModelModel.registerCatalog(name, description, category);
        res.status(201).json(newCatalog);
    } catch (err) {
        console.error('Error register catalog', err);
        res.status(500).json({ message: 'Error register catalog' });
    }
};

export { registerCatalog };




