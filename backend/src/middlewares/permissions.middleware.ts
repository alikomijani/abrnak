import { TodoModel } from '@/schema/todo.schema';
import { UserRole } from '@/types';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';

export function checkModelOwnership(model: string) {
  return async function checkTodoOwnership(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const userId = req.user?.id; // Assuming `req.user` is populated by authentication middleware.
      const userRole = req.user?.role;
      const object = await mongoose.model(model).findById(id);
      if (!object) {
        return res.status(404).json({ error: 'Todo not found' });
      }

      if (userRole != UserRole.Admin && object.user.toString() !== userId) {
        return res
          .status(StatusCodes.FORBIDDEN)
          .json({ error: 'You do not have permission to retrive this Todo' });
      }
      next();
    } catch (error) {
      console.error('Ownership check failed:', error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal server error' });
    }
  };
}
