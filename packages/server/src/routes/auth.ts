import express from 'express';
import { AuthController } from '@/controllers';

const router = express.Router();

router.post('/kakao', AuthController.kakaoLogin);
router.post('/logout', AuthController.authenticateToken, AuthController.logout);
router.post('/reissue', AuthController.reissueAccessToken);
router.get('/', AuthController.authenticateToken, AuthController.checkAuth);

export default router;
