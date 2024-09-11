import { Room } from './model';

export interface RoomListResponse {
  data: Room[];
  message: string;
}

export interface RoomResponse {
  data: Pick<Room, 'room_id' | 'room_name' | 'max_participants'>;
  message: string;
}
