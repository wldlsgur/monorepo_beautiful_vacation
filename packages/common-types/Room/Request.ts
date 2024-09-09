import { Room } from './model';

export interface RoomListRequest {
  limit: number;
  offset: number;
}

export interface SearchRoomRequest {
  keyword: string;
  limit: number;
  offset: number;
}

export type CreateRoomServerRequest = Pick<
  Room,
  'room_name' | 'password' | 'owner_id' | 'max_participants'
>;

export type CreateRoomClientRequest = Pick<
  Room,
  'room_name' | 'password' | 'max_participants'
>;

export interface EnterTheRoomRequest {
  roomId: number;
  userId: number;
}
