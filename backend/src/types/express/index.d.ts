import type { Request, Response, NextFunction } from 'express';

export enum UserRole {
  User = 1,
  Admin = 2,
}
interface RequestUser {
  id: string; // Or Types.ObjectId if applicable
  role: UserRole;
}

declare global {
  namespace Express {
    interface Request {
      user?: RequestUser;
    }
  }
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: RequestUser;
  }
}
