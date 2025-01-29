import { Request, Response, NextFunction } from 'express';
import express from 'express';

import authRouter from './auth.router';
import todoRouter from './todo.router';
import { authMiddleware } from '@/middlewares/auth.middleware';
const router = express.Router();

/* GET home page. */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
  res.json({ message: 'welcome to to do app' });
});

router.use('/auth', authRouter);
router.use('/todo', authMiddleware, todoRouter);

export default router;
