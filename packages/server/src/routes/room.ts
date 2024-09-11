import express from 'express';
import { RoomController } from '@/controllers';
import {
  authenticateToken,
  validateRequest,
  validateRoom,
} from '@/middlewares';

const router = express.Router();

router.get('/', RoomController.getRoomList);
router.get('/search', RoomController.getSearchRoom);
router.get(
  '/participated',
  authenticateToken,
  RoomController.getParticipatedRoom,
);
router.post('/', authenticateToken, RoomController.createRoom);
router.delete('/:roomId', authenticateToken, RoomController.deleteRoom);
router.patch(
  '/:roomId',
  authenticateToken,
  validateRoom.patchRoom,
  validateRequest,
  RoomController.patchRoom,
);
router.get('/:roomId', RoomController.getRoom);

export default router;
