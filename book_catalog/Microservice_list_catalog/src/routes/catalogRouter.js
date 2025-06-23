import express from 'express';
import * as catalogController from '../controllers/catalogController.js';

const router = express.Router();

router.get('/catalogs', catalogController.getCatalog);

export default router;