import * as catalogModel from '../models/catalogModel.js';

const deleteCatalog = async (req, res) => {
    const { id } = req.params;  

    try {
        const result = await catalogModel.deleteCatalog(id);  

        if (!result) {
            return res.status(404).json({ message: 'Catalog not found' });  
        }

        return res.status(200).json({ message: 'Catalog deleted successfully', id: result.id }); 
    } catch (error) {
        console.error('Error deleting catalog:', error);
        res.status(500).json({ message: 'Error deleting catalog' });
    }
};

export { deleteCatalog };