import express from 'express';
import { authenticateToken } from '@/middlewares';
import { RoomMemberController } from '@/controllers';

const router = express.Router();

router.delete('/:roomId', authenticateToken, RoomMemberController.exitRoom);

export default router;
