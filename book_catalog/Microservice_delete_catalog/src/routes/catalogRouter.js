import express from 'express';
import * as catalogController from '../controllers/catalogController.js';

const router = express.Router();

router.delete('/deleteVaccine/:id', catalogController.deleteCatalog); // Delete a catalog by ID

export default router;