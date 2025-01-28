import bcrypt from "bcryptjs";

export async function hash(data: string) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(data, salt);
}
export async function checkHash(rowString: string, hashedString: string) {
  return await bcrypt.compare(rowString, hashedString);
}
