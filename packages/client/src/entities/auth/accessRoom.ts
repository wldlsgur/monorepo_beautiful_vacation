import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { AccessRoomRequest } from 'common-types';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '@/shared/config';
import { DOMAIN_URL, QUERY_KEY } from '@/shared/constant';

interface Props {
  options?: UseMutationOptions<unknown, Error, AccessRoomRequest>;
}

interface SetError {
  password: string;
  participants: string;
}

export const accessRoom = async (roomId: number, password: string) => {
  const response = await axiosInstance.post(
    `/api/v1/auth/access/room/${roomId}`,
    {
      password,
    },
  );

  return response.data;
};

export const useAccessRoom = ({ options }: Props = {}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setError } = useFormContext<SetError>();

  return useMutation({
    mutationFn: ({ roomId, password }: AccessRoomRequest) =>
      accessRoom(roomId, password),
    onSuccess: (_: unknown, variables: AccessRoomRequest) => {
      const [offset, limit] = [0, 20];
      const { roomId } = variables;

      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.PARTICIPATE_ROOM({
          offset,
          limit,
        }),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.MADE_ROOM({
          offset,
          limit,
        }),
      });

      navigate(DOMAIN_URL.ROOM(roomId));
    },
    onError: (error: any) => {
      const { status, response } = error;
      const message = response?.data?.message || '';

      if (status === 403) {
        if (message === 'Incorrect password.') {
          setError('password', {
            type: 'manual',
            message: '비밀번호가 일치하지 않습니다.',
          });
        }

        if (
          message === 'The room has reached the maximum number of participants.'
        ) {
          setError('participants', {
            type: 'manual',
            message: '인원이 모두 찼습니다.',
          });
        }
      }
    },
    ...options,
  });
};
