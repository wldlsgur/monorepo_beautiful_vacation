import { axiosInstance } from '@/shared/config';

export const exitRoom = async (roomId: number) => {
  const response = await axiosInstance.delete(`/api/v1/rooms/member/${roomId}`);

  return response.data;
};
