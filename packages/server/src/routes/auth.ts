import express from 'express';
import { AuthController } from '@/controllers';

const router = express.Router();

router.post('/kakao', AuthController.kakaoLogin);
router.post('/logout', AuthController.logout);
router.get('/', AuthController.checkAuth);

export default router;
