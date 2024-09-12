import { AuthRequest } from '@/type';
import { verifyToken } from '@/util';
import { NextFunction, Response } from 'express';

const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const { accessToken, refreshToken } = req.signedCookies;

  if (req.originalUrl === '/api/v1/auth' && !accessToken && !refreshToken) {
    res.status(200).json({
      data: null,
      message:
        'Authentication failed. Both access token and refresh token are missing.',
    });
    return;
  }

  if (!accessToken) {
    res.status(401).json({ message: 'accessToken is missing' });
    return;
  }

  try {
    const { userId } = verifyToken({ token: accessToken });

    if (!userId) {
      res.status(401).json({ message: 'invalid accessToken' });
      return;
    }

    req.userId = userId;
    next();
  } catch {
    res.status(401).json({ message: 'invalid accessToken' });
    return;
  }
};

export default authenticateToken;
