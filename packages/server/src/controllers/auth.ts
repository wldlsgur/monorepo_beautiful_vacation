import { Request, Response } from 'express';
import { AuthModel } from '@/models';
import { UsersModel } from '@/models';
import { signAccessToken, signRefreshToken } from '@/util';
import { CONFIG, redisClient } from '@/config';

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

    redisClient.set(user?.user_id, refreshToken);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: CONFIG.NODE_ENV === 'production',
      maxAge: 3600000,
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: CONFIG.NODE_ENV === 'production',
      maxAge: 86400000,
    });

    res.json({ data: user, message: 'success' });
  } catch (error) {
    res.status(500).json(`Internal Server Error: ${error}`);
  }
};

export default { kakaoLogin };
