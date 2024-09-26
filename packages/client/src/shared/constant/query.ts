import { QueryClient } from '@tanstack/react-query';
import {
  AccessRoomRequest,
  CreateRoomRequest,
  KakaoLoginRequest,
  MadeRoomRequest,
  ParticipatedRoomRequest,
  PatchRoomRequest,
  RoomListRequest,
  RoomRequest,
  SearchRoomRequest,
} from 'common-types';
import { NavigateFunction } from 'react-router-dom';
import {
  accessRoom,
  checkAuth,
  checkRoomAuth,
  postKakaoLogin,
  postLogout,
  reissueToken,
} from '@/entities/auth';
import {
  deleteRoom,
  getMadeRoom,
  getParticipatedRoom,
  getRoom,
  getRoomList,
  getSearchRoom,
  patchRoom,
  postRoom,
} from '@/entities/room';
import { exitRoom } from '@/entities/roomMember';
import { validateSearchKeyword } from '@/widgets/room/util';
import DOMAIN_URL from './domainUrl';

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
};

export const QUERY_OPTION = {
  ROOM: ({ roomId }: RoomRequest) => ({
    queryKey: QUERY_KEY.ROOM({ roomId }),
    queryFn: () => getRoom(roomId),
    gcTime: 0,
    staleTime: 0,
  }),
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
  PARTICIPATE_ROOM: ({ offset, limit }: ParticipatedRoomRequest) => ({
    queryKey: QUERY_KEY.PARTICIPATE_ROOM({ offset, limit }),
    queryFn: ({ pageParam }: any) =>
      getParticipatedRoom({ offset: pageParam, limit }),
    initialPageParam: offset,
    getNextPageParam: (lastPage: any, allPages: any) =>
      lastPage.data.length < limit ? null : allPages.length * limit,
    gcTime: Infinity,
    staleTime: Infinity,
  }),
  MADE_ROOM: ({ offset, limit }: MadeRoomRequest) => ({
    queryKey: QUERY_KEY.MADE_ROOM({ offset, limit }),
    queryFn: ({ pageParam }: any) => getMadeRoom({ offset: pageParam, limit }),
    initialPageParam: offset,
    getNextPageParam: (lastPage: any, allPages: any) =>
      lastPage.data.length < limit ? null : allPages.length * limit,
    gcTime: Infinity,
    staleTime: Infinity,
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
  ROOM_AUTH: ({ roomId }: { roomId: number }) => ({
    queryKey: QUERY_KEY.ROOM_AUTH(roomId),
    queryFn: () => checkRoomAuth(roomId),
    gcTime: Infinity,
    staleTime: Infinity,
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
    mutationFn: (data: CreateRoomRequest) => postRoom(data),
    onSuccess: (_: unknown, { room_name }: CreateRoomRequest) => {
      const [offset, limit] = [0, 20];

      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.PARTICIPATE_ROOM({
          offset,
          limit,
        }),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.MADE_ROOM({
          offset,
          limit,
        }),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.SEARCH_ROOM({
          keyword: room_name,
          offset,
          limit,
        }),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.ROOM_LIST({ offset, limit }),
      });
    },
  }),
  DELETE_ROOM: ({ queryClient }: { queryClient: QueryClient }) => ({
    mutationFn: (roomId: number) => deleteRoom(roomId),
    onSuccess: () => {
      const [offset, limit] = [0, 20];

      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.PARTICIPATE_ROOM({
          offset,
          limit,
        }),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.MADE_ROOM({
          offset,
          limit,
        }),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.ROOM_LIST({ offset, limit }),
      });
    },
  }),
  PATCH_ROOM: ({
    queryClient,
    navigate,
  }: {
    queryClient: QueryClient;
    navigate: NavigateFunction;
  }) => ({
    mutationFn: (room: PatchRoomRequest) => patchRoom(room),
    onSuccess: (_: unknown, { room_name }: PatchRoomRequest) => {
      const [offset, limit] = [0, 20];

      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.ROOM_LIST({ offset, limit }),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.PARTICIPATE_ROOM({
          offset,
          limit,
        }),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.MADE_ROOM({
          offset,
          limit,
        }),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.SEARCH_ROOM({
          keyword: room_name,
          offset,
          limit,
        }),
      });

      navigate(DOMAIN_URL.HOME);
    },
  }),
  EXIT_ROOM: ({ queryClient }: { queryClient: QueryClient }) => ({
    mutationFn: (roomId: number) => exitRoom(roomId),
    onSuccess: () => {
      const [offset, limit] = [0, 20];

      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.ROOM_LIST({ offset, limit }),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.PARTICIPATE_ROOM({
          offset,
          limit,
        }),
      });
    },
  }),
  ACCESS_ROOM: ({
    queryClient,
    setError,
    navigate,
  }: {
    queryClient: QueryClient;
    setError: any;
    navigate: NavigateFunction;
  }) => ({
    mutationFn: ({ roomId, password }: AccessRoomRequest) =>
      accessRoom(roomId, password),
    onSuccess: (_: unknown, variables: AccessRoomRequest) => {
      const [offset, limit] = [0, 20];
      const { roomId } = variables;

      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.PARTICIPATE_ROOM({
          offset,
          limit,
        }),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.MADE_ROOM({
          offset,
          limit,
        }),
      });

      navigate(DOMAIN_URL.ROOM(roomId));
    },
    onError: (error: any) => {
      const { status, response } = error;
      const message = response?.data?.message || '';

      if (status === 403) {
        if (message === 'Incorrect password.') {
          setError('password', {
            type: 'manual',
            message: '비밀번호가 일치하지 않습니다.',
          });
        }

        if (
          message === 'The room has reached the maximum number of participants.'
        ) {
          setError('participants', {
            type: 'manual',
            message: '인원이 모두 찼습니다.',
          });
        }
      }
    },
  }),
};
