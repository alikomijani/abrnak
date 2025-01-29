import { ISubTask, ITodo } from '@/types';
import mongoose, { Schema } from 'mongoose';
import refValidator from './schema.validator';

// Mongoose Schema

const SubTaskSchema = new Schema<ISubTask>({
  title: { type: String, required: true, trim: true },
  isComplete: { type: Boolean, default: false },
});
const TodoSchema = new Schema<ITodo>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      validate: refValidator('User'),
    },
    title: { type: String, required: true, trim: true },
    isComplete: { type: Boolean, default: false },
    description: { type: String, trim: true },
    subTasks: [SubTaskSchema],
  },
  {
    timestamps: true,
  }
);
TodoSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.__v;
    delete ret._id;
  },
});
TodoSchema.set('toObject', {
  virtuals: true,
});

export const TodoModel = mongoose.model('Todo', TodoSchema);
