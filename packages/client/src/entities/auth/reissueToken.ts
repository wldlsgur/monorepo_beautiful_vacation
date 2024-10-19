import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { axiosInstance } from '@/shared/config';
import { QUERY_KEY } from '@/shared/constant';

interface Props {
  options?: UseQueryOptions;
}

export const reissueToken = async () => {
  const response = await axiosInstance.post('/api/v1/auth/reissue');

  return response.data;
};

export const useReissueToken = ({ options }: Props) => {
  return useQuery({
    queryKey: QUERY_KEY.REISSUE_TOKEN,
    queryFn: reissueToken,
    gcTime: 0,
    staleTime: 0,
    ...options,
  });
};
