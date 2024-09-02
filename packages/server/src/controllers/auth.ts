import { Request, Response } from 'express';
import { AuthModel } from '@/models';
import { UsersModel } from '@/models';

const kakaoLogin = async (req: Request, res: Response) => {
  const { code } = req.body;

  try {
    // 1. 카카오 액세스 토큰을 가져온다.
    const { data: tokenData } = await AuthModel.kakaoLogin({ code });
    const accessToken = tokenData.access_token;

    // 2. 액세스 토큰으로 카카오 사용자 정보를 가져온다.
    const { data: userInfo } = await AuthModel.getKakaoUserInfo({
      accessToken,
    });
    const {
      id,
      properties: { nickname, profile_image },
    } = userInfo;

    // 3. 데이터베이스에서 해당 카카오 ID를 가진 사용자가 있는지 확인한다.
    let user = await UsersModel.getUserByKakaoId(id);

    if (!user) {
      // 4. 사용자가 없으면 새 사용자를 생성한다.
      await UsersModel.createUser({
        user: {
          username: nickname,
          oauth_id: id,
          oauth_provider: 'kakao',
          profile_image,
        },
      });

      // 새로 생성된 사용자를 다시 조회한다.
      user = await UsersModel.getUserByKakaoId(id);
    }

    // 5. 사용자 정보를 반환한다.
    res.json({ data: user, message: 'success' });
  } catch (error) {
    res.status(500).json(`Internal Server Error: ${error}`);
  }
};

export default { kakaoLogin };
