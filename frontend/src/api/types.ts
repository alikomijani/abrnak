export interface SubTask {
  title: string;
  isComplete: boolean;
  _id: string;
}

export interface Todo {
  _id: string;
  user: string;
  title: string;
  isComplete: boolean;
  description: string;
  subTasks: SubTask[];
  createdAt: string;
  updatedAt: string;
}
export interface PaginatedServerApi<T> extends PaginationParams {
  results: T[];
  total: number;
}
export interface PaginationParams {
  offset: number;
  limit: number;
}
export interface ToDoParams extends PaginationParams {
  search: string;
  isComplete: "true" | "false" | "";
}

enum UserRole {
  User = 1,
  Admin = 2,
}
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
