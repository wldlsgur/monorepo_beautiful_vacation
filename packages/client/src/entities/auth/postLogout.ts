import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { axiosInstance } from '@/shared/config';
import { QUERY_KEY } from '@/shared/constant';

interface Props {
  options?: UseMutationOptions;
}

export const postLogout = async () => {
  const response = await axiosInstance.post('/api/v1/auth/logout');

  return response.data;
};

export const usePostLogout = ({ options }: Props = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postLogout,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.AUTH }),
    ...options,
  });
};
