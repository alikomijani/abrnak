import 'dotenv/config';
import { AuthTokens, UserRole } from '@/types/auth';
import type { JwtPayload } from 'jsonwebtoken';
import {
  JsonWebTokenError,
  sign,
  TokenExpiredError,
  verify,
} from 'jsonwebtoken';

const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY as string;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY as string;

type TokenPayload = JwtPayload & {
  id: string;
  role: UserRole;
};

export function createAuthToken(payload: TokenPayload): AuthTokens {
  console.log(ACCESS_SECRET_KEY, REFRESH_SECRET_KEY);
  const accessToken = sign(payload, ACCESS_SECRET_KEY, { expiresIn: '1h' });
  const refreshToken = sign(payload, REFRESH_SECRET_KEY, { expiresIn: '7d' });
  return { accessToken, refreshToken };
}

export function verifyToken(
  token: string,
  type: 'access' | 'refresh' = 'access'
): TokenPayload {
  const secretKey = type === 'access' ? ACCESS_SECRET_KEY : REFRESH_SECRET_KEY;

  try {
    const decodedToken = verify(token, secretKey);
    if (
      decodedToken &&
      typeof decodedToken !== 'string' &&
      decodedToken.hasOwnProperty('id') &&
      decodedToken.hasOwnProperty('role')
    ) {
      return decodedToken as TokenPayload;
    }
    throw new Error('Invalid token structure');
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new Error('Token has expired');
    }
    if (error instanceof JsonWebTokenError) {
      throw new Error('Invalid token');
    }
    throw new Error('Token verification failed');
  }
}
