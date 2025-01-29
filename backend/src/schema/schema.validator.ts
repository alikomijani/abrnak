import mongoose from 'mongoose';

export default function refValidator(model: string) {
  return {
    async validator(value: mongoose.Types.ObjectId) {
      try {
        const obj = await mongoose.model(model).findById(value).lean();
        return !!obj; // Returns true if obj exists, false otherwise
      } catch (error) {
        return false;
      }
    },
    message: `Invalid ${model} ID`,
  };
}
