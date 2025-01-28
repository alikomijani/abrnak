import { StatusCodes } from 'http-status-codes';
import { verifyToken } from '@/lib/jwt';
import { NextFunction, Request, Response } from 'express';

export const loginMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: 'Error! Token was not provided.',
    });
  }

  try {
    const decodedToken = verifyToken(token!);
    req.user = {
      id: decodedToken.id,
      role: decodedToken.role,
    };
    next();
  } catch {
    res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: 'Error! Token is invalid.',
    });
  }
};
