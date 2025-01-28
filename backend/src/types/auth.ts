import { Document } from 'mongoose';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
export enum UserRole {
  User = 1,
  Admin = 2,
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  isActive: boolean;
  checkPassword(rawPassword: string): Promise<boolean>;
  setPassword(rawPassword: string): Promise<void>;
  createToken(): AuthTokens;
}
