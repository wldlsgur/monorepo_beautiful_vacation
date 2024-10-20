import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { PatchRoomRequest } from 'common-types';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '@/shared/config';
import { DOMAIN_URL, QUERY_KEY } from '@/shared/constant';

interface Props {
  options?: UseMutationOptions<unknown, Error, PatchRoomRequest>;
}

export const patchRoom = async ({
  room_id,
  room_name,
  password,
  max_participants,
}: PatchRoomRequest) => {
  const response = await axiosInstance.patch(`/api/v1/rooms/${room_id}`, {
    room_name,
    password,
    max_participants,
  });

  return response.data;
};

export const usePatchRoom = ({ options }: Props = {}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (room: PatchRoomRequest) => patchRoom(room),
    onSuccess: (_: unknown, { room_name }: PatchRoomRequest) => {
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

      navigate(DOMAIN_URL.HOME);
    },
    ...options,
  });
};
