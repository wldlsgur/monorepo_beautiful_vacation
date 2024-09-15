import express from 'express';
import {
  authenticateToken,
  validateRequest,
  validateRoomMember,
} from '@/middlewares';
import { RoomMemberController } from '@/controllers';

const router = express.Router();

router.delete(
  '/:roomId',
  authenticateToken,
  validateRoomMember.exitRoom,
  validateRequest,
  RoomMemberController.exitRoom,
);

export default router;
