import { createNormalUser, findUserByCredentials } from '@/models/auth.models';
import {
  LoginSchemaZod,
  RegisterSchemaZod,
} from '@/validations/auth.validations';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export async function registerUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validate = RegisterSchemaZod.safeParse(req.body);
    if (!validate.success) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: 'invalid data',
        success: false,
        errors: validate.error.flatten().fieldErrors,
      });
    } else {
      const user = await createNormalUser(validate.data);
      const tokens = user.createToken();
      res.status(StatusCodes.CREATED).json({
        tokens,
        user,
      });
    }
  } catch (error) {
    next(error);
  }
}

export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validate = LoginSchemaZod.safeParse(req.body);
    if (!validate.success) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: 'invalid data',
        success: false,
        errors: validate.error.flatten().fieldErrors,
      });
      return;
    }
    const { email, password } = validate.data;
    try {
      const user = await findUserByCredentials(email, password);
      if (!user.isActive) {
        res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ success: false, messages: ['user is deactivate!'] });
        return;
      }
      const tokens = user.createToken();
      res.status(StatusCodes.OK).json({
        tokens,
        user,
      });
    } catch (e) {
      console.log(e);
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ success: false, messages: ['Invalid credential'] });
    }
  } catch (error) {
    next(error);
  }
}
