import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { CheckAuthResponse } from 'common-types';
import { axiosInstance } from '@/shared/config';
import { QUERY_KEY } from '@/shared/constant';

interface Props {
  options?: UseQueryOptions<CheckAuthResponse>;
}

export const checkAuth = async () => {
  const response = await axiosInstance.get<CheckAuthResponse>('/api/v1/auth');

  return response.data;
};

export const useCheckAuth = ({ options }: Props = {}) => {
  return useQuery({
    queryKey: QUERY_KEY.AUTH,
    queryFn: checkAuth,
    gcTime: Infinity,
    staleTime: Infinity,
    ...options,
  });
};
