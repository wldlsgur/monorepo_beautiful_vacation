import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { KakaoLoginRequest } from 'common-types';
import { axiosInstance } from '@/shared/config';

interface Props extends KakaoLoginRequest {
  options?: UseMutationOptions;
}

export const postKakaoLogin = async ({ code }: KakaoLoginRequest) => {
  const response = await axiosInstance.post('/api/v1/auth/kakao', { code });

  return response.data;
};

export const usePostKakaoLogin = ({ code, options }: Props) => {
  return useMutation({
    mutationFn: () => postKakaoLogin({ code }),
    ...options,
  });
};
