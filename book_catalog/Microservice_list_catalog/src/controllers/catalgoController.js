import * as catalogModel from '../models/catalogModel.js';

const getCatalog = async (req, res) => {
    try {
        const catalog = await catalogModel.getCatalog();
        res.status(200).json(catalog);
    } catch (err) {
        console.error('Error getting catalogs', err);
        res.status(500).json({ message: 'Error getting catalogs' });
    }
};

export { getCatalog };

