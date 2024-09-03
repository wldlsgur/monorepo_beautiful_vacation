import jwt, { JwtPayload } from 'jsonwebtoken';
import { CONFIG, redisClient } from '@/config';

export const signAccessToken = ({ userId }: { userId: number }) => {
  const payload = { userId };

  return jwt.sign(payload, CONFIG.JWT_SECRET!, {
    algorithm: 'HS256',
    expiresIn: '1h',
  });
};

export const signRefreshToken = () => {
  return jwt.sign({}, CONFIG.JWT_SECRET!, {
    algorithm: 'HS256',
    expiresIn: '24h',
  });
};

export const verifyAccessToken = ({ token }: { token: string }) => {
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

export const verifyRefreshToken = async ({
  token,
  userId,
}: {
  token: string;
  userId: number;
}) => {
  try {
    const storedToken = await redisClient.get(userId.toString());

    if (token !== storedToken) {
      return {
        message: 'failed',
        userId: null,
      };
    }

    try {
      jwt.verify(token, CONFIG.JWT_SECRET!);

      return {
        message: 'success',
        userId: userId,
      };
    } catch {
      return {
        message: 'failed',
        userId: null,
      };
    }
  } catch {
    return {
      message: 'failed',
      userId: null,
    };
  }
};
