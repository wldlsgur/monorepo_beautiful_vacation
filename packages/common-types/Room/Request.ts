export interface RoomListRequest {
  limit: number;
  offset: number;
}

export interface SearchRoomRequest {
  keyword: string;
  limit: number;
  offset: number;
}
