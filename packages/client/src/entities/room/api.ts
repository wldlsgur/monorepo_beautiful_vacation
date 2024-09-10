import {
  CreateRoomRequest,
  ParticipatedRoomRequest,
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
}: ParticipatedRoomRequest) => {
  const response = await axiosInstance.get('/api/v1/rooms/participated', {
    params: {
      limit,
      offset,
    },
  });

  return response.data;
};

export const postRoom = async (room: CreateRoomRequest) => {
  const response = await axiosInstance.post('/api/v1/rooms', room);

  return response.data;
};

export const deleteRoom = async (roomId: number) => {
  const response = await axiosInstance.delete(`/api/v1/rooms/${roomId}`);

  return response.data;
};
