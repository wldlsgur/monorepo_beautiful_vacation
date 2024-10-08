import express from 'express';
import { AuthController } from '@/controllers';
import {
  authenticateRoomToken,
  authenticateToken,
  validateAuth,
  validateRequest,
} from '@/middlewares';

const router = express.Router();

router.post(
  '/kakao',
  validateAuth.kakaoLogin,
  validateRequest,
  AuthController.kakaoLogin,
);
router.post('/logout', authenticateToken, AuthController.logout);
router.post('/reissue', AuthController.reissueAccessToken);
router.get('/', authenticateToken, AuthController.checkAuth);
router.post(
  '/access/room/:roomId',
  authenticateToken,
  validateAuth.accessRoom,
  validateRequest,
  AuthController.accessRoom,
);
router.get(
  '/room/:roomId',
  authenticateToken,
  authenticateRoomToken,
  AuthController.checkRoomAuth,
);

export default router;
