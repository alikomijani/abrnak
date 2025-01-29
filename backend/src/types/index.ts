import { Document, Schema } from 'mongoose';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
export enum UserRole {
  User = 1,
  Admin = 2,
}
interface ITimestamps {
  createdAt: Date;
  updatedAt: Date;
}
export interface IUser extends Document, ITimestamps {
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

export interface ISubTask {
  title: string;
  isComplete: boolean;
}
export interface ITodo extends Document, ITimestamps {
  user: typeof Schema.Types.ObjectId;
  title: string;
  description: string;
  isComplete: boolean;
  subTasks: Array<ISubTask>;
}
