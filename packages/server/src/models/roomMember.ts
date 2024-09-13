import { OutTheRoomRequest } from 'common-types';
import { Connection } from '@/config';

const outTheRoom = async ({ roomId, userId }: OutTheRoomRequest) => {
  const deleteQuery = `
      DELETE FROM chat_room_members
      WHERE room_id = ? AND user_id = ?
    `;

  try {
    const connection = await Connection();
    const result = await connection.query(deleteQuery, [roomId, userId]);

    return result;
  } catch (error) {
    throw new Error(`DB Query Error: ${error}`);
  }
};

export default {
  outTheRoom,
};
