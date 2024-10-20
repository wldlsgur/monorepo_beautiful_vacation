import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { CreateRoomRequest } from 'common-types';
import { axiosInstance } from '@/shared/config';
import { QUERY_KEY } from '@/shared/constant';

interface Props {
  options?: UseMutationOptions<unknown, Error, CreateRoomRequest>;
}

export const postRoom = async (room: CreateRoomRequest) => {
  const response = await axiosInstance.post('/api/v1/rooms', room);

  return response.data;
};

export const usePostRoom = ({ options }: Props = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRoomRequest) => postRoom(data),
    onSuccess: (_: unknown, { room_name }: CreateRoomRequest) => {
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
        queryKey: QUERY_KEY.SEARCH_ROOM({
          keyword: room_name,
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
