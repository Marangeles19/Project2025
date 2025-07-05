import express from 'express';
import * as catalogController from '../controllers/catalogController.js';

const router = express.Router();

router.put('/update/:id', catalogController.updateCatalog);  

export default router;
