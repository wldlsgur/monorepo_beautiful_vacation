import express from 'express';
import { RoomController } from '@/controllers';

const router = express.Router();

router.get('/', RoomController.getRoomList);
router.get('/search', RoomController.getSearchRoom);
router.post('/', RoomController.createRoom);

export default router;
