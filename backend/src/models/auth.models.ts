import { UserModel } from '@/schema/auth.schema';
import { UserRole } from '@/types/auth';
import type { UserType } from '@/validations/auth.validations';

export async function createNormalUser(data: UserType) {
  const user = await UserModel.create({ ...data, role: UserRole.User });
  return user;
}

export async function createAdminUser(data: UserType) {
  const user = await UserModel.create({ ...data, role: UserRole.Admin });
  return user;
}

export async function findUserByCredentials(
  email: string,
  rowPassword: string
) {
  // Find the user by email
  const user = await UserModel.findOne({ email });
  if (!user) {
    console.log('user not found');
    throw new Error('User not found');
  }

  // Compare the provided password with the hashed password
  const isMatch = await user.checkPassword(rowPassword);
  if (!isMatch) {
    console.log('password found');
    throw new Error('Invalid password');
  }

  return user;
}
