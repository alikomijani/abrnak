import z from 'zod';

// SubTask Zod Schema
const SubTaskSchemaZod = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  isComplete: z.boolean().optional().default(false),
});

export const TodoSchemaZod = z.object({
  user: z.string().min(1, 'User ID is required'), // Assuming user ID is a string (e.g., MongoDB ObjectId)
  title: z.string().trim().min(1, 'Title is required'),
  isComplete: z.boolean().optional().default(false),
  description: z.string().trim().optional(),
  subTasks: z.array(SubTaskSchemaZod).optional(),
});

export type TodoType = z.infer<typeof TodoSchemaZod>;
