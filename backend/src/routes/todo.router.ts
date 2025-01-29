import { createTodoHttp, getTodoList } from '@/controllers/todo.controllers';
import { authMiddleware } from '@/middlewares/auth.middleware';
import express from 'express';

const router = express.Router();

/* GET users listing. */
router.post('/', authMiddleware, createTodoHttp);
router.get('/', authMiddleware, getTodoList);

export default router;
