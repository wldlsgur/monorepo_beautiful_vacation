import { RoomListRequest, SearchRoomRequest } from 'common-types';
import { Connection } from '@/config';

const getRoomList = async ({ limit, offset }: RoomListRequest) => {
  const query = `
    SELECT * FROM chat_rooms
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;

  try {
    const connection = await Connection();
    const [rows] = await connection.query(query, [limit, offset]);

    return rows;
  } catch (error) {
    throw new Error(`DB Query Error: ${error}`);
  }
};

const getSearchRoom = async ({ keyword, limit, offset }: SearchRoomRequest) => {
  const query = `
    SELECT * FROM chat_rooms
    WHERE room_name LIKE ?
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;

  try {
    const connection = await Connection();
    const [rows] = await connection.query(query, [
      `%${keyword}%`,
      limit,
      offset,
    ]);

    return rows;
  } catch (error) {
    throw new Error(`DB Query Error: ${error}`);
  }
};

export default {
  getRoomList,
  getSearchRoom,
};
