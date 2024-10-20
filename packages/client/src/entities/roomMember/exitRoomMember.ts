import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { axiosInstance } from '@/shared/config';
import { QUERY_KEY } from '@/shared/constant';

interface Props {
  options?: UseMutationOptions<unknown, Error, number>;
}

export const exitRoomMember = async (roomId: number) => {
  const response = await axiosInstance.delete(`/api/v1/rooms/member/${roomId}`);

  return response.data;
};

export const useExitRoomMember = ({ options }: Props = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (roomId: number) => exitRoomMember(roomId),
    onSuccess: () => {
      const [offset, limit] = [0, 20];

      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.ROOM_LIST({ offset, limit }),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.PARTICIPATE_ROOM({
          offset,
          limit,
        }),
      });
    },
    ...options,
  });
};
