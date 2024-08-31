import { RoomListRequest } from 'common-types';
import { axiosInstance } from '@/shared/Config';

export const getRoomList = async ({ limit, offset }: RoomListRequest) => {
  const response = await axiosInstance.get('/api/v1/rooms', {
    params: {
      limit,
      offset,
    },
  });

  return response.data;
};
