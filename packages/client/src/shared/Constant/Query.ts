import { RoomListRequest, SearchRoomRequest } from 'common-types';
import { getRoomList, getSearchRoom } from '@/entities/Room';
import validateSearchKeyword from '@/widgets/Room/Util/ValidateSearchKeyword';

export const QUERY_KEY = {
  ROOM_LIST: ({ offset, limit }: RoomListRequest) => [
    'room',
    'list',
    offset,
    limit,
  ],
  SEARCH_ROOM: ({ keyword, offset, limit }: SearchRoomRequest) => [
    'room',
    'search',
    keyword,
    offset,
    limit,
  ],
};

export const QUERY_OPTION = {
  ROOM_LIST: ({ offset, limit }: RoomListRequest) => ({
    queryKey: [QUERY_KEY.ROOM_LIST({ offset, limit })],
    queryFn: ({ pageParam }: any) => getRoomList({ offset: pageParam, limit }),
    initialPageParam: offset,
    getNextPageParam: (lastPage: any, allPages: any) =>
      lastPage.data.length < limit ? null : allPages.length * limit,
  }),
  SEARCH_ROOM: ({ keyword, offset, limit }: SearchRoomRequest) => ({
    queryKey: [QUERY_KEY.SEARCH_ROOM({ keyword, offset, limit })],
    queryFn: ({ pageParam }: any) =>
      getSearchRoom({ keyword, offset: pageParam, limit }),
    initialPageParam: offset,
    getNextPageParam: (lastPage: any, allPages: any) =>
      lastPage.data.length < limit ? null : allPages.length * limit,
    enabled: !!keyword && validateSearchKeyword({ keyword }),
    gcTime: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  }),
};
