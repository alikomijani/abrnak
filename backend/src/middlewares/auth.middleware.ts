import { StatusCodes } from 'http-status-codes';
import { verifyToken } from '@/lib/jwt';
import { NextFunction, Request, Response } from 'express';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: 'Error! Token was not provided.',
    });
    return;
  }

  try {
    const decodedToken = verifyToken(token!);
    req.user = {
      id: decodedToken.id,
      role: decodedToken.role,
    };
    next();
  } catch (e) {
    console.log(e);
    res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: 'Error! Token is invalid.',
    });
  }
};
