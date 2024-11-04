import {
  MadeRoomRequest,
  ParticipatedRoomRequest,
  RoomListRequest,
  RoomRequest,
  SearchRoomRequest,
} from 'common-types';

export const QUERY_KEY = {
  ROOM: ({ roomId }: RoomRequest) => ['room', roomId],
  ROOM_LIST: ({ offset, limit }: RoomListRequest) => [
    'room',
    'list',
    offset,
    limit,
  ],
  SEARCH_ROOM: ({ keyword, offset, limit }: SearchRoomRequest) => [
    'room',
    'search',
    'list',
    keyword,
    offset,
    limit,
  ],
  PARTICIPATE_ROOM: ({ offset, limit }: ParticipatedRoomRequest) => [
    'room',
    'participate',
    'list',
    offset,
    limit,
  ],
  MADE_ROOM: ({ offset, limit }: MadeRoomRequest) => [
    'room',
    'MADE',
    'list',
    offset,
    limit,
  ],
  AUTH: ['auth'],
  REISSUE_TOKEN: ['reissue', 'token'],
  ROOM_AUTH: (roomId: number) => ['auth', 'room', roomId],
  HOLIDAYS: (year: number) => ['holidays', year],
};
