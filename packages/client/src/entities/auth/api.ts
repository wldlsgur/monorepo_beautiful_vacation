import { KakaoLoginRequest } from 'common-types';
import { axiosInstance } from '@/shared/Config';

export const postKakaoLogin = async ({ code }: KakaoLoginRequest) => {
  const response = await axiosInstance.post('/api/v1/auth/kakao', { code });

  return response.data;
};
