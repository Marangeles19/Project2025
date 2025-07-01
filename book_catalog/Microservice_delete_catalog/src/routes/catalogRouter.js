import express from 'express';
import * as catalogController from '../controllers/catalogController.js'; // Import the catalog controller

const router = express.Router();

router.delete('/delete/:id', catalogController.deleteCatalog); // Delete a catalog by ID

export default router;

