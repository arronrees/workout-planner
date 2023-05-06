import { genSalt, hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

export async function hashPassword(password: string): Promise<string> {
  const salt = await genSalt();

  const hashedPassword = await hash(password, salt);

  return hashedPassword;
}

export function createJwtToken(id: string) {
  return sign({ id }, process.env.JWT_SECRET as string, { expiresIn: '7d' });
}
