import { createTodo, findTodoByID, findTodoList } from '@/models/todo.model';
import { TodoSchemaZod, TodoType } from '@/validations/todo.validations';
import { NextFunction, Response, Request } from 'express';
import createHttpError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
interface GetTodoByIdParams {
  id: string;
}
export async function getTodoByIdHttp(
  req: Request<GetTodoByIdParams>,
  res: Response,
  next: NextFunction
) {
  try {
    const todo = await findTodoByID(req.params.id);
    if (!todo) {
      return next(createHttpError(StatusCodes.NOT_FOUND, 'todo not found'));
    }
    res.json(todo);
  } catch (e) {
    next(e);
  }
}

export async function createTodoHttp(
  req: Request<any, TodoType>,
  res: Response,
  next: NextFunction
) {
  try {
    const validate = TodoSchemaZod.safeParse(req.body);
    if (!validate.success) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Invalid Data',
        errors: validate.error.flatten().fieldErrors,
      });
      return;
    }
    const todo = await createTodo(validate.data);
    res.json(todo);
  } catch (e) {
    next(e);
  }
}

export async function getTodoList(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { isComplete, limit = 10, offset = 0 } = req.params;
    const todoList = await findTodoList({
      isComplete,
      limit: Number(limit),
      offset: Number(offset),
      user: req.user?.id || '',
    });
    res.json(todoList);
  } catch (e) {
    next(e);
  }
}
