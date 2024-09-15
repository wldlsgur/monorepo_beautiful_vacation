import { ExitRoomRequest } from 'common-types';
import { Connection } from '@/config';

const exitRoom = async ({ roomId, userId }: ExitRoomRequest) => {
  const query = `
      DELETE FROM chat_room_members
      WHERE room_id = ? AND user_id = ?
    `;

  try {
    const connection = await Connection();
    const result = await connection.query(query, [roomId, userId]);

    return result;
  } catch (error) {
    throw new Error(`DB Query Error: ${error}`);
  }
};

export default {
  exitRoom,
};
