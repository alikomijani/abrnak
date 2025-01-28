import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { MongoServerError } from 'mongodb';
import mongoose from 'mongoose';

export function dbErrorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction // <-- Include this parameter
) {
  if (error instanceof MongoServerError && error.code === 11000) {
    // handle duplication errors on db
    const duplicatedField = Object.keys(error.keyValue)[0];
    const body = {
      success: false,
      message: `${duplicatedField} already exists. Please use a different ${duplicatedField}.`,
      errors: {
        [duplicatedField]: [
          `${duplicatedField} already exists. Please use a different ${duplicatedField}.`,
        ],
      },
    };
    res.status(StatusCodes.BAD_REQUEST).json(body);
  } else if (error instanceof mongoose.Error.ValidationError) {
    // handle validations errors on schema
    const errorFields = Object.keys(error.errors);
    const errorDetails: Record<string, any> = {};
    errorFields.forEach((key) => {
      errorDetails[key] = [error.errors[key].message];
    });
    const body = {
      success: false,
      message: `Invalid Data`,
      errors: errorDetails,
    };
    res.status(StatusCodes.BAD_REQUEST).json(body);
  } else {
    next();
  }
}
