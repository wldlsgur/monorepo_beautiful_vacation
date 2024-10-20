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

export const deleteRoom = async (roomId: number) => {
  const response = await axiosInstance.delete(`/api/v1/rooms/${roomId}`);

  return response.data;
};

export const useDeleteRoom = ({ options }: Props = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (roomId: number) => deleteRoom(roomId),
    onSuccess: () => {
      const [offset, limit] = [0, 20];

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
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.ROOM_LIST({ offset, limit }),
      });
    },
    ...options,
  });
};
