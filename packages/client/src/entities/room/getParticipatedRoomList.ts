import {
  InfiniteData,
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ParticipatedRoomRequest, RoomListResponse } from 'common-types';
import { axiosInstance } from '@/shared/config';
import { QUERY_KEY } from '@/shared/constant';

interface Props extends ParticipatedRoomRequest {
  options?: UseInfiniteQueryOptions<
    RoomListResponse,
    AxiosError,
    InfiniteData<RoomListResponse>
  >;
}

export const getParticipatedRoomList = async ({
  limit,
  offset,
}: ParticipatedRoomRequest) => {
  const response = await axiosInstance.get<RoomListResponse>(
    '/api/v1/rooms/participated',
    {
      params: {
        limit,
        offset,
      },
    },
  );

  return response.data;
};

export const useGetParticipatedRoomList = ({
  offset,
  limit,
  options,
}: Props) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEY.PARTICIPATE_ROOM({ offset, limit }),
    queryFn: ({ pageParam }: any) =>
      getParticipatedRoomList({ offset: pageParam, limit }),
    initialPageParam: offset,
    getNextPageParam: (lastPage: any, allPages: any) =>
      lastPage.data.length < limit ? null : allPages.length * limit,
    gcTime: Infinity,
    staleTime: Infinity,
    ...options,
  });
};
