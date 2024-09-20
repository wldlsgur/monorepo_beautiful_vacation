import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { AuthModel, RoomMemberModel, RoomModel } from '@/models';
import { UsersModel } from '@/models';
import { CONFIG, redisClient } from '@/config';
import {
  CustomError,
  signAccessToken,
  signRefreshToken,
  signRoomAccessToken,
  verifyToken,
} from '@/util';
import { AuthRequest } from '@/type';

const kakaoLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { code } = req.body;

  try {
    const { data: tokenData } = await AuthModel.kakaoLogin({ code });
    const { access_token: kakaoAccessToken } = tokenData;

    const { data: userInfo } = await AuthModel.getKakaoUserInfo({
      accessToken: kakaoAccessToken,
    });
    const {
      id,
      properties: { nickname, profile_image },
    } = userInfo;

    let user = await UsersModel.getUserByKakaoId({ kakaoId: id });

    if (!user) {
      await UsersModel.createUser({
        user: {
          username: nickname,
          oauth_id: id,
          oauth_provider: 'kakao',
          profile_image,
        },
      });

      user = await UsersModel.getUserByKakaoId({ kakaoId: id });
    }

    const accessToken = signAccessToken({ userId: user?.user_id });
    const refreshToken = signRefreshToken({ userId: user?.user_id });

    await redisClient.set(user?.user_id, refreshToken, 'PX', 86400000);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: CONFIG.NODE_ENV === 'production',
      maxAge: 3600000,
      signed: true,
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: CONFIG.NODE_ENV === 'production',
      maxAge: 86400000,
      signed: true,
    });

    res.json({ data: user, message: 'success' });
  } catch (error) {
    next(new CustomError(500, `Internal Server Error: ${error}`));
  }
};

const checkAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const userId = Number(req.userId);

  try {
    const user = await UsersModel.getUserByUserId({ userId });

    res.json({ data: user, message: 'success' });
  } catch (error) {
    next(new CustomError(500, `Internal Server Error: ${error}`));
  }
};

const checkRoomAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const userId = Number(req.userId);
  const roomId = Number(req.roomId);
  const role = req.role;

  try {
    const room = await RoomModel.getRoom({ roomId });

    res.json({ data: { ...room, userId, role }, message: 'success' });
  } catch (error) {
    next(new CustomError(500, `Internal Server Error: ${error}`));
  }
};

const logout = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { accessToken, refreshToken } = req.signedCookies;
  const userId = req.userId as string;

  try {
    const hasToken = await redisClient.exists(userId);

    if (hasToken) {
      await redisClient.del(userId);
    }

    if (accessToken) {
      res.clearCookie('accessToken', {
        httpOnly: true,
        secure: CONFIG.NODE_ENV === 'production',
        expires: new Date(0),
        signed: true,
      });
    }

    if (refreshToken) {
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: CONFIG.NODE_ENV === 'production',
        expires: new Date(0),
        signed: true,
      });
    }

    res.status(200).json({ data: null, message: 'success' });
  } catch (error) {
    next(new CustomError(500, `Internal Server Error: ${error}`));
  }
};

const reissueAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { refreshToken } = req.signedCookies;

  try {
    const { userId } = verifyToken({ token: refreshToken });

    if (!userId) {
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: CONFIG.NODE_ENV === 'production',
        expires: new Date(0),
        signed: true,
      });

      next(new CustomError(401, 'invalid refreshToken'));
      return;
    }

    const storedToken = await redisClient.get(userId.toString());

    if (refreshToken !== storedToken) {
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: CONFIG.NODE_ENV === 'production',
        expires: new Date(0),
        signed: true,
      });

      next(new CustomError(401, 'invalid refreshToken'));
      return;
    }

    const accessToken = signAccessToken({ userId });
    const newRefreshToken = signRefreshToken({ userId });

    await redisClient.set(userId.toString(), newRefreshToken, 'PX', 86400000);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: CONFIG.NODE_ENV === 'production',
      maxAge: 3600000,
      signed: true,
    });
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: CONFIG.NODE_ENV === 'production',
      maxAge: 86400000,
      signed: true,
    });

    res.json({ data: null, message: 'success' });
  } catch (error) {
    next(new CustomError(500, `Internal Server Error: ${error}`));
  }
};

const accessRoom = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const roomId = Number(req.params.roomId);
  const { password } = req.body;
  const userId = Number(req.userId);

  try {
    const room = await RoomModel.getRoom({ roomId });

    if (!room) {
      next(new CustomError(404, 'Room not found.'));
      return;
    }

    const {
      owner_id,
      current_participants,
      max_participants,
      password: roomPassword,
    } = room;

    if (owner_id !== userId && current_participants >= max_participants) {
      next(
        new CustomError(
          403,
          'The room has reached the maximum number of participants.',
        ),
      );
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, roomPassword);

    if (!isPasswordCorrect) {
      next(new CustomError(403, 'Incorrect password.'));
      return;
    }

    let memberId: number | null = null;

    if (owner_id !== userId) {
      ({ memberId } = await RoomMemberModel.enterTheRoom({ roomId, userId }));
    }

    const roomAccessToken = signRoomAccessToken({
      userId,
      roomId,
      role: memberId ? 'participant' : 'owner',
    });

    await redisClient.set(
      `user:${userId}, room:${roomId}`,
      roomAccessToken,
      'PX',
      3600000,
    );

    res.cookie('roomAccessToken', roomAccessToken, {
      httpOnly: true,
      secure: CONFIG.NODE_ENV === 'production',
      maxAge: 3600000,
      signed: true,
    });

    res.json({ data: memberId, message: 'success' });
  } catch (error) {
    next(new CustomError(500, `Internal Server Error: ${error}`));
  }
};

export default {
  kakaoLogin,
  checkAuth,
  checkRoomAuth,
  logout,
  reissueAccessToken,
  accessRoom,
};
