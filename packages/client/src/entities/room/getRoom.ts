import { UseQueryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { RoomResponse } from 'common-types';
import { axiosInstance } from '@/shared/config';
import { QUERY_KEY } from '@/shared/constant';

interface Props {
  roomId: number;
  options?: UseQueryOptions<RoomResponse>;
}

export const getRoom = async (roomId: number) => {
  const response = await axiosInstance.get<RoomResponse>(
    `/api/v1/rooms/${roomId}`,
  );

  return response.data;
};

export const useGetRoom = ({ roomId, options }: Props) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.ROOM({ roomId }),
    queryFn: () => getRoom(roomId),
    gcTime: 0,
    staleTime: 0,
    ...options,
  });
};
