import { KakaoLoginRequest, LogoutRequest } from 'common-types';
import { axiosInstance } from '@/shared/config';

export const postKakaoLogin = async ({ code }: KakaoLoginRequest) => {
  const response = await axiosInstance.post('/api/v1/auth/kakao', { code });

  return response.data;
};

export const checkAuth = async () => {
  const response = await axiosInstance.get('/api/v1/auth');

  return response.data;
};

export const postLogout = async ({ userId }: LogoutRequest) => {
  const response = await axiosInstance.post('/api/v1/auth/logout', { userId });

  return response.data;
};

export const reissueToken = async () => {
  const response = await axiosInstance.post('/api/v1/auth/reissue');

  return response.data;
};
