import express from 'express';
import { rootController, uploadController } from '../controllers/controller.js';
const router = express.Router();

router.get('/', rootController);
router.get('/upload', uploadController);

export default router;
