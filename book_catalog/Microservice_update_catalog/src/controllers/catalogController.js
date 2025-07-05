import * as catalogModel from '../models/catalogModel.js';

const updateCatalog = async (req, res) => {
  try {
    console.log('👉 Body recibido:', req.body); // for debug

    const { id, name, description, category } = req.body;

    if (!id || !name || !description || !category) {
      return res.status(400).json({ 
        message: 'All fields are required: id, name, description, category' 
      });
    }

    const updatedCatalog = await catalogModel.updateCatalog(id, name, description, category);

    if (!updatedCatalog) {
      return res.status(404).json({ message: 'Catalog not found or not updated' });
    }

    res.status(200).json({ success: true, catalog: updatedCatalog });
  } catch (err) {
    console.error('Error updating catalog', err);
    res.status(500).json({ message: 'Error updating catalog', error: err.message });
  }
};

export { updateCatalog };
