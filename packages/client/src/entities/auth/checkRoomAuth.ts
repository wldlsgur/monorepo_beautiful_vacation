import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { axiosInstance } from '@/shared/config';
import { QUERY_KEY } from '@/shared/constant';

interface Props {
  roomId: number;
  options?: UseQueryOptions;
}

export const checkRoomAuth = async (roomId: number) => {
  const response = await axiosInstance.get(`/api/v1/auth/room/${roomId}`);

  return response.data;
};

export const useCheckRoomAuth = ({ roomId, options }: Props) => {
  return useQuery({
    queryKey: QUERY_KEY.ROOM_AUTH(roomId),
    queryFn: () => checkRoomAuth(roomId),
    gcTime: Infinity,
    staleTime: Infinity,
    ...options,
  });
};
