import express from 'express';
import { UsersController } from '@/controllers';

const router = express.Router();

router.get('/', UsersController.getUsers);

export default router;
