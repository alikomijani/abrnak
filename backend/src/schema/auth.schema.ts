import { checkHash, hash } from '@/lib/hash';
import { createAuthToken } from '@/lib/jwt';
import { IUser, UserRole } from '@/types';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    role: { type: Number, enum: UserRole, default: UserRole.User },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    methods: {
      checkPassword: async function (rawPassword: string) {
        return await checkHash(rawPassword, this.password);
      },
      setPassword: async function (rawPassword: string) {
        this.password = await hash(rawPassword);
        await this.save();
      },
      createToken: function () {
        return createAuthToken({
          id: this._id as string,
          role: this.role,
        });
      },
    },
  }
);

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hash(this.password);
  }
  next();
});
UserSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.password;
  },
});
UserSchema.set('toObject', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.password;
  },
});

export const UserModel = mongoose.model('User', UserSchema);
