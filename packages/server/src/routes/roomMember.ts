import express from 'express';
import { authenticateToken } from '@/middlewares';

const router = express.Router();

router.delete('/:roomId', authenticateToken);

export default router;
