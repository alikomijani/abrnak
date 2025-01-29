import { isValidObjectId } from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import createHttpError from 'http-errors';
import { NextFunction, Response, Request } from 'express';

export const validateIdMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  if (!id) {
    return next(createHttpError(StatusCodes.BAD_REQUEST, 'ID is required'));
  }
  if (!isValidObjectId(id)) {
    return next(createHttpError(StatusCodes.BAD_REQUEST, 'Invalid ID'));
  }
  next();
};
