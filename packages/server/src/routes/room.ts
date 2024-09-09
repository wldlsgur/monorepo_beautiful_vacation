import express from 'express';
import { AuthController, RoomController } from '@/controllers';

const router = express.Router();

router.get('/', RoomController.getRoomList);
router.get('/search', RoomController.getSearchRoom);
router.post('/', AuthController.authenticateToken, RoomController.createRoom);

export default router;
