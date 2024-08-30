import express from 'express';
import { RoomController } from '@/controllers';

const router = express.Router();

router.get('/', RoomController.getRoomList);

export default router;
