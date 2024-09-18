import { Room } from './model';

export interface RoomListResponse {
  data: Room[];
  message: string;
}

export interface RoomResponse {
  data: Room;
  message: string;
}
