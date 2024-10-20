import {
  InfiniteData,
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { MadeRoomRequest, RoomListResponse } from 'common-types';
import { axiosInstance } from '@/shared/config';
import { QUERY_KEY } from '@/shared/constant';

interface Props extends MadeRoomRequest {
  options?: UseInfiniteQueryOptions<
    RoomListResponse,
    AxiosError,
    InfiniteData<RoomListResponse>
  >;
}

export const getMadeRoomList = async ({ limit, offset }: MadeRoomRequest) => {
  const response = await axiosInstance.get<RoomListResponse>(
    '/api/v1/rooms/made',
    {
      params: {
        limit,
        offset,
      },
    },
  );

  return response.data;
};

export const useGetMadeRoomList = ({ offset, limit, options }: Props) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEY.MADE_ROOM({ offset, limit }),
    queryFn: ({ pageParam }: any) =>
      getMadeRoomList({ offset: pageParam, limit }),
    initialPageParam: offset,
    getNextPageParam: (lastPage: any, allPages: any) =>
      lastPage.data.length < limit ? null : allPages.length * limit,
    gcTime: Infinity,
    staleTime: Infinity,
    ...options,
  });
};
