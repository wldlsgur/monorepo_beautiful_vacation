import {
  CreateRoomRequest,
  MadeRoomRequest,
  ParticipatedRoomRequest,
  PatchRoomRequest,
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

export const getMadeRoom = async ({ limit, offset }: MadeRoomRequest) => {
  const response = await axiosInstance.get('/api/v1/rooms/made', {
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

export const getRoom = async (roomId: number) => {
  const response = await axiosInstance.get(`/api/v1/rooms/${roomId}`);

  return response.data;
};

export const patchRoom = async ({
  room_id,
  room_name,
  password,
  max_participants,
}: PatchRoomRequest) => {
  const response = await axiosInstance.patch(`/api/v1/rooms/${room_id}`, {
    room_name,
    password,
    max_participants,
  });

  return response.data;
};
