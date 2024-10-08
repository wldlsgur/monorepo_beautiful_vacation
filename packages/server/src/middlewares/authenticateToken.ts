import { AuthRequest } from '@/type';
import { CustomError, verifyRoomToken, verifyToken } from '@/util';
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
    next(new CustomError(401, `accessToken is missing`));
    return;
  }

  try {
    const { userId } = verifyToken({ token: accessToken });

    if (!userId) {
      next(new CustomError(401, `invalid accessToken`));
      return;
    }

    req.userId = userId;
    next();
  } catch (error) {
    next(new CustomError(401, `invalid accessToken`));
    return;
  }
};

const authenticateRoomToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const { roomAccessToken } = req.signedCookies;
  const { roomId } = req.params;

  if (!roomAccessToken) {
    next(new CustomError(401, `roomAccessToken is missing`));
    return;
  }

  try {
    const {
      userId,
      roomId: { tokenRoomId },
      role,
    } = verifyRoomToken({
      token: roomAccessToken,
    });

    if (!userId || !tokenRoomId || !role) {
      next(new CustomError(401, `invalid roomAccessToken`));
      return;
    }

    if (roomId !== tokenRoomId) {
      next(
        new CustomError(403, `You do not have permission to access this room`),
      );
      return;
    }

    req.userId = userId;
    req.roomId = roomId;
    req.role = role;
    next();
  } catch (error) {
    next(new CustomError(401, `invalid roomAccessToken`));
    return;
  }
};

export { authenticateToken, authenticateRoomToken };
