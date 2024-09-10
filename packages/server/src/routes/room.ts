import express from 'express';
import { AuthController, RoomController } from '@/controllers';

const router = express.Router();

router.get('/', RoomController.getRoomList);
router.get('/search', RoomController.getSearchRoom);
router.get(
  '/participated',
  AuthController.authenticateToken,
  RoomController.getParticipatedRoom,
);
router.post('/', AuthController.authenticateToken, RoomController.createRoom);
router.delete(
  '/:roomId',
  AuthController.authenticateToken,
  RoomController.deleteRoom,
);

export default router;
