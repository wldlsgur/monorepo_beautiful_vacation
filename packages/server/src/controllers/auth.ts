import { Request, Response } from 'express';
import { AuthModel } from '@/models';
import { UsersModel } from '@/models';
import { CONFIG, redisClient } from '@/config';
import { signAccessToken, signRefreshToken, verifyAccessToken } from '@/util';

const kakaoLogin = async (req: Request, res: Response) => {
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
    const refreshToken = signRefreshToken();

    redisClient.set(user?.user_id, refreshToken, 'PX', 86400000);

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
    res.status(500).json(`Internal Server Error: ${error}`);
  }
};

const checkAuth = async (req: Request, res: Response) => {
  const { accessToken } = req.signedCookies;

  if (!accessToken) {
    res.status(401).json({ data: null, message: 'accessToken is missing' });
    return;
  }

  const { userId } = verifyAccessToken({ token: accessToken });

  if (!userId) {
    res.status(401).json({ data: null, message: 'invalid accessToken' });
    return;
  }

  const user = await UsersModel.getUserByUserId({ userId });

  res.json({ data: user, message: 'success' });
};

const logout = async (req: Request, res: Response) => {
  const { accessToken, refreshToken } = req.signedCookies;
  const { userId } = req.body;

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
    res.status(500).json(`Internal Server Error: ${error}`);
  }
};

export default { kakaoLogin, checkAuth, logout };
