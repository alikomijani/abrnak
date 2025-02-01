import { TodoModel } from '@/schema/todo.schema';
import { ISubTask, ITodo } from '@/types';
import { TodoType } from '@/validations/todo.validations';
import { Types } from 'mongoose';

export async function createTodo(params: TodoType & { user: string }) {
  try {
    const todo = await TodoModel.create(params);
    console.info(`Todo created: ${todo._id}`);
    return todo;
  } catch (e) {
    console.error(`Failed to create todo: ${(e as Error)?.message}`);
    throw e;
  }
}
export async function findTodoByID(id: string) {
  try {
    const todo = await TodoModel.findById(id);
    return todo;
  } catch (e) {
    console.error(`Failed to find todo: ${(e as Error)?.message}`);
    throw e;
  }
}

export interface FindTodoParams {
  user: string;
  isComplete?: any;
  limit: number;
  offset: number;
}

export async function findTodoList(params: FindTodoParams) {
  const { user, isComplete, limit, offset } = params;
  const query: any = { user };
  if (isComplete != undefined) {
    query.isComplete = isComplete;
  }
  try {
    const todoList = await TodoModel.find(query)
      .skip(offset)
      .limit(limit)
      .lean();
    const total = await TodoModel.countDocuments(query);
    return { results: todoList, total, limit, offset };
  } catch (error) {
    console.error(`Failed to find todos list: ${(error as Error)?.message}`);
    throw error;
  }
}

export async function deleteTodo(id: string) {
  try {
    const todo = await TodoModel.findByIdAndDelete(id);
    if (!todo) {
      throw new Error('Todo not found');
    }
    return todo;
  } catch (e) {
    console.error(`Failed to delete todo: ${(e as Error)?.message}`);
    throw e;
  }
}

// Update a todo's details
export async function updateTodo(id: string, updateData: Partial<TodoType>) {
  try {
    const todo = await TodoModel.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators on update
    });
    if (!todo) {
      throw new Error('Todo not found');
    }
    return todo;
  } catch (e) {
    console.error(`Failed to update todo: ${(e as Error)?.message}`);
    throw e;
  }
}

// Update a todo's details
export async function updateTodoStatus(id: string, isComplete: boolean) {
  try {
    const todo = await TodoModel.findByIdAndUpdate(
      id,
      { isComplete },
      {
        new: true, // Return the updated document
        runValidators: true, // Run schema validators on update
      }
    );
    if (!todo) {
      throw new Error('Todo not found');
    }
    return todo;
  } catch (e) {
    console.error(`Failed to update todo: ${(e as Error)?.message}`);
    throw e;
  }
}

export async function updateSubTaskStatus(
  todoId: string,
  subTaskId: string,
  isComplete: boolean
): Promise<ITodo> {
  // Find the parent Todo document
  const todo = await TodoModel.findById(todoId);

  if (!todo) {
    throw new Error('Todo not found');
  }

  const subTask = todo.subTasks.id(subTaskId);

  if (!subTask) {
    throw new Error('Subtask not found');
  }

  // Update the isComplete status
  subTask.isComplete = isComplete;

  // Save the parent document (triggers validation)
  const updatedTodo = await todo.save();

  return updatedTodo;
}
