import express from 'express';
import { registerCatalog } from '../controllers/catalogController.js';

const router = express.Router();

router.post('/register', registerCatalog);

export default router;

