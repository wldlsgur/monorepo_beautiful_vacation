export interface ParticipatedRoomServerRequest {
  userId: number;
  limit: number;
  offset: number;
}

export interface ParticipatedRoomClientRequest
  extends Omit<ParticipatedRoomServerRequest, 'userId'> {}
