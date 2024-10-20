import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { SearchRoomRequest } from 'common-types';
import { axiosInstance } from '@/shared/config';
import { QUERY_KEY } from '@/shared/constant';
import { validateSearchKeyword } from '@/widgets/room/util';

interface Props extends SearchRoomRequest {
  options?: UseInfiniteQueryOptions;
}

export const getSearchRoomList = async ({
  keyword,
  limit,
  offset,
}: SearchRoomRequest) => {
  const response = await axiosInstance.get('/api/v1/rooms/search', {
    params: {
      keyword,
      limit,
      offset,
    },
  });

  return response.data;
};

export const useGetSearchRoomList = ({
  keyword,
  offset,
  limit,
  options,
}: Props) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEY.SEARCH_ROOM({ keyword, offset, limit }),
    queryFn: ({ pageParam }: any) =>
      getSearchRoomList({ keyword, offset: pageParam, limit }),
    initialPageParam: offset,
    getNextPageParam: (lastPage: any, allPages: any) =>
      lastPage.data.length < limit ? null : allPages.length * limit,
    enabled: !!keyword && validateSearchKeyword({ keyword }),
    gcTime: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};
