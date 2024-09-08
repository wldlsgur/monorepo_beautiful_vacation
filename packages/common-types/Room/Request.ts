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

export type CreateRoomRequest = Pick<
  Room,
  'room_name' | 'password' | 'owner_id' | 'max_participants'
>;
