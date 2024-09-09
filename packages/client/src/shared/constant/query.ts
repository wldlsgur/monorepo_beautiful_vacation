import { QueryClient } from '@tanstack/react-query';
import {
  CreateRoomClientRequest,
  KakaoLoginRequest,
  RoomListRequest,
  SearchRoomRequest,
} from 'common-types';
import {
  checkAuth,
  postKakaoLogin,
  postLogout,
  reissueToken,
} from '@/entities/auth';
import { getRoomList, getSearchRoom, postRoom } from '@/entities/room';
import { validateSearchKeyword } from '@/widgets/room/util';

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
  AUTH: ['auth'],
  REISSUE_TOKEN: ['reissue', 'token'],
};

export const QUERY_OPTION = {
  ROOM_LIST: ({ offset, limit }: RoomListRequest) => ({
    queryKey: QUERY_KEY.ROOM_LIST({ offset, limit }),
    queryFn: ({ pageParam }: any) => getRoomList({ offset: pageParam, limit }),
    initialPageParam: offset,
    getNextPageParam: (lastPage: any, allPages: any) =>
      lastPage.data.length < limit ? null : allPages.length * limit,
  }),
  SEARCH_ROOM: ({ keyword, offset, limit }: SearchRoomRequest) => ({
    queryKey: QUERY_KEY.SEARCH_ROOM({ keyword, offset, limit }),
    queryFn: ({ pageParam }: any) =>
      getSearchRoom({ keyword, offset: pageParam, limit }),
    initialPageParam: offset,
    getNextPageParam: (lastPage: any, allPages: any) =>
      lastPage.data.length < limit ? null : allPages.length * limit,
    enabled: !!keyword && validateSearchKeyword({ keyword }),
    gcTime: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  }),
  AUTH: () => ({
    queryKey: QUERY_KEY.AUTH,
    queryFn: checkAuth,
    gcTime: Infinity,
    staleTime: Infinity,
  }),
  REISSUE_TOKEN: () => ({
    queryKey: QUERY_KEY.REISSUE_TOKEN,
    queryFn: reissueToken,
    gcTime: 0,
    staleTime: 0,
  }),
};

export const MUTATE_OPTION = {
  KAKAO_LOGIN: ({ code }: KakaoLoginRequest) => ({
    mutationFn: () => postKakaoLogin({ code }),
  }),
  LOGOUT: ({ queryClient }: { queryClient: QueryClient }) => ({
    mutationFn: postLogout,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.AUTH }),
  }),
  CREATE_ROOM: ({ queryClient }: { queryClient: QueryClient }) => ({
    mutationFn: (data: CreateRoomClientRequest) => postRoom(data),
    onSuccess: (_: unknown, variables: CreateRoomClientRequest) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.ROOM_LIST({ offset: 0, limit: 20 }),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.SEARCH_ROOM({
          keyword: variables.room_name,
          offset: 0,
          limit: 20,
        }),
      });
    },
  }),
};
