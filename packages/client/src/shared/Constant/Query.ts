import { RoomListRequest } from 'common-types';
import { getRoomList } from '@/entities/Room';

export const QUERY_KEY = {
  ROOM_LIST: ({ offset, limit }: RoomListRequest) => [
    'room',
    'list',
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
};

export default QUERY_KEY;
