import {
  CreateRoomClientRequest,
  ParticipatedRoomClientRequest,
  RoomListRequest,
  SearchRoomRequest,
} from 'common-types';
import { axiosInstance } from '@/shared/config';

export const getRoomList = async ({ limit, offset }: RoomListRequest) => {
  const response = await axiosInstance.get('/api/v1/rooms', {
    params: {
      limit,
      offset,
    },
  });

  return response.data;
};

export const getSearchRoom = async ({
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

export const getParticipatedRoom = async ({
  limit,
  offset,
}: ParticipatedRoomClientRequest) => {
  const response = await axiosInstance.get('/api/v1/rooms/participated', {
    params: {
      limit,
      offset,
    },
  });

  return response.data;
};

export const postRoom = async (room: CreateRoomClientRequest) => {
  const response = await axiosInstance.post('/api/v1/rooms', room);

  return response.data;
};
