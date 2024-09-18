export interface KakaoLoginRequest {
  code: string;
}

export interface LogoutRequest {
  userId: number;
}

export interface AccessRoomRequest {
  userId?: number;
  roomId: number;
  password: string;
}
