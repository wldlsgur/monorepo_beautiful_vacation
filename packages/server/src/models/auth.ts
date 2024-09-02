import axios from 'axios';
import { KakaoLoginRequest } from 'common-types';
import { CONFIG } from '@/config';

const kakaoLogin = async ({ code }: KakaoLoginRequest) => {
  const data = {
    grant_type: 'authorization_code',
    client_id: CONFIG.KAKAO_REST_API_KEY!,
    redirect_uri: CONFIG.KAKAO_REDIRECT_URL!,
    code,
  };

  try {
    const response = await axios.post(
      'https://kauth.kakao.com/oauth/token',
      new URLSearchParams(data).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      },
    );

    return response;
  } catch (error) {
    throw new Error(`Kakao Login Error: ${error}`);
  }
};

const getKakaoUserInfo = async ({ accessToken }: { accessToken: string }) => {
  try {
    const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response;
  } catch (error) {
    throw new Error(`Kakao Login Error: ${error}`);
  }
};

export default {
  kakaoLogin,
  getKakaoUserInfo,
};
