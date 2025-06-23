import * as catalogModel from '../models/catalogModel.js';

const updateCatalog = async (req, res) => {
  try {
    const { id, name, description, category } = req.body;

    if (!id || !name || !description || !category) {
      return res.status(400).json({ message: 'All fields are required: id, name, description, dose' });
    }

    const updatedCatalog = await catalogModel.updateCatalog(id, name, description, category);
    res.status(200).json(updatedCatalog);
  } catch (err) {
    console.error('Error updating catalog', err);
    res.status(500).json({ message: 'Error updating catalog' });
  }
};

export { updateCatalog };
