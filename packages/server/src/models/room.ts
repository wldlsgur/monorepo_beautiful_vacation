import { DB } from '@/config';

interface GetRoomListRequest {
  limit: number;
  offset: number;
}

const getRoomList = async ({ limit, offset }: GetRoomListRequest) => {
  const query = `
    SELECT * FROM chat_rooms
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;

  try {
    const connection = await DB();
    const [rows] = await connection.query(query, [limit, offset]);

    return rows;
  } catch (error) {
    throw new Error(`DB Query Error: ${error}`);
  }
};

export default {
  getRoomList,
};
