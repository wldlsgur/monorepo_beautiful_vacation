import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { RoomListRequest } from 'common-types';
import { axiosInstance } from '@/shared/config';
import { QUERY_KEY } from '@/shared/constant';

interface Props extends RoomListRequest {
  options?: UseInfiniteQueryOptions;
}

export const getRoomList = async ({ limit, offset }: RoomListRequest) => {
  const response = await axiosInstance.get('/api/v1/rooms', {
    params: {
      limit,
      offset,
    },
  });

  return response.data;
};

export const useGetRoomList = ({ offset, limit, options }: Props) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEY.ROOM_LIST({ offset, limit }),
    queryFn: ({ pageParam }: any) => getRoomList({ offset: pageParam, limit }),
    initialPageParam: offset,
    getNextPageParam: (lastPage: any, allPages: any) =>
      lastPage.data.length < limit ? null : allPages.length * limit,
    ...options,
  });
};
