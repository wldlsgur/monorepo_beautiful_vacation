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

export type CreateRoomRequest = Omit<
  Room,
  'room_id' | 'created_at' | 'updated_at' | 'current_participants'
> & {
  owner_id?: number;
};

export interface EnterTheRoomRequest {
  roomId: number;
  userId: number;
}

export interface DeleteRoomRequest {
  userId?: number;
  roomId: number;
}

export interface RoomOwnerRequest {
  roomId: number;
}
