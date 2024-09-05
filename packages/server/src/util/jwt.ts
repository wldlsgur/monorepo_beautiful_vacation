import jwt, { JwtPayload } from 'jsonwebtoken';
import { CONFIG } from '@/config';

export const signAccessToken = ({ userId }: { userId: number }) => {
  const payload = { userId };

  return jwt.sign(payload, CONFIG.JWT_SECRET!, {
    algorithm: 'HS256',
    expiresIn: '1h',
  });
};

export const signRefreshToken = ({ userId }: { userId: number }) => {
  const payload = { userId };

  return jwt.sign(payload, CONFIG.JWT_SECRET!, {
    algorithm: 'HS256',
    expiresIn: '24h',
  });
};

export const verifyToken = ({ token }: { token: string }) => {
  let decoded: JwtPayload | null = null;

  try {
    decoded = jwt.verify(token, CONFIG.JWT_SECRET!) as JwtPayload;

    return {
      message: 'success',
      userId: decoded.userId,
    };
  } catch {
    return {
      message: 'failed',
      userId: null,
    };
  }
};
