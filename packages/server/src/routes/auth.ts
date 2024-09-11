import express from 'express';
import { AuthController } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const router = express.Router();

router.post('/kakao', AuthController.kakaoLogin);
router.post('/logout', authenticateToken, AuthController.logout);
router.post('/reissue', AuthController.reissueAccessToken);
router.get('/', authenticateToken, AuthController.checkAuth);

export default router;
