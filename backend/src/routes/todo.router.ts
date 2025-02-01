import {
  createTodoHttp,
  deleteTodoHttp,
  getTodoByIdHttp,
  getTodoListHttp,
  updateSubTaskStatusHttp,
  updateTodoHttp,
  updateTodoStatusHttp,
} from '@/controllers/todo.controllers';
import express from 'express';

const router = express.Router();

router.post('/', createTodoHttp);
router.get('/', getTodoListHttp);
router.get('/:id', getTodoByIdHttp);
router.put('/:id', updateTodoHttp);
router.delete('/:id', deleteTodoHttp);

router.put('/:id/update-status', updateTodoStatusHttp);
router.put('/:id/update-sub-status/:subId', updateSubTaskStatusHttp);

export default router;
