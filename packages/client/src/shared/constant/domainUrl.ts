const DOMAIN_URL = {
  HOME: '/',
  ROOM_EDIT: (roomId: number) => `/room/edit/${roomId}`,
  ROOM_ACCESS: (roomId: number) => `/room/access/${roomId}`,
  ROOM: (roomId: number) => `/room/${roomId}`,
};

export default DOMAIN_URL;
