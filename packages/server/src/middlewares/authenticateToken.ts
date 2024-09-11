import { AuthRequest } from '@/type';
import { verifyToken } from '@/util';
import { NextFunction, Response } from 'express';

const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const { accessToken } = req.signedCookies;

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
