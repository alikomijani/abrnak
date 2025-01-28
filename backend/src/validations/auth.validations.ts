import { z } from 'zod';

export const LoginSchemaZod = z.object({
  email: z.string().email('Invalid Email'),
  password: z.string(),
});

export const RegisterSchemaZod = z.object({
  email: z.string().email('Invalid Email').trim(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstName: z.string().min(1, 'firstName is required'),
  lastName: z.string().min(1, 'lastName is required'),
});

export const RefreshTokenSchemaZod = z.object({
  refreshToken: z.string(),
});

export type UserType = z.infer<typeof RegisterSchemaZod>;
