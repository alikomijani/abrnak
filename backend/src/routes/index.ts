import { Request, Response, NextFunction } from 'express';
import express from 'express';

import authRouter from './auth';
const router = express.Router();

/* GET home page. */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
  res.json({ message: 'welcome to to do app' });
});

router.use('/auth', authRouter);

export default router;
