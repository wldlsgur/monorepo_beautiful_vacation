import express from 'express';
import { RoomController } from '@/controllers';
import {
  authenticateToken,
  validateRequest,
  validateRoom,
} from '@/middlewares';

const router = express.Router();

router.get(
  '/',
  validateRoom.getRoomList,
  validateRequest,
  RoomController.getRoomList,
);
router.get(
  '/search',
  validateRoom.getSearchRoom,
  validateRequest,
  RoomController.getSearchRoom,
);
router.get(
  '/participated',
  authenticateToken,
  validateRoom.getRoomList,
  validateRequest,
  RoomController.getParticipatedRoom,
);
router.post(
  '/',
  authenticateToken,
  validateRoom.createRoom,
  validateRequest,
  RoomController.createRoom,
);
router.delete(
  '/:roomId',
  authenticateToken,
  validateRoom.deleteRoom,
  validateRequest,
  RoomController.deleteRoom,
);
router.patch(
  '/:roomId',
  authenticateToken,
  validateRoom.patchRoom,
  validateRequest,
  RoomController.patchRoom,
);
router.get(
  '/:roomId',
  validateRoom.getRoom,
  validateRequest,
  RoomController.getRoom,
);

export default router;
