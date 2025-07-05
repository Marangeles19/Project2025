import express from 'express';
import * as catalogController from '../controllers/catalogController.js';

const router = express.Router();

router.get('/list', catalogController.getCatalog); // Delete a catalog by ID

export default router;