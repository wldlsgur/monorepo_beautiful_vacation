import { EnterTheRoomRequest, ExitRoomRequest } from 'common-types';
import { Connection } from '@/config';
import { ResultSetHeader } from 'mysql2/promise';

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

const enterTheRoom = async ({ roomId, userId }: EnterTheRoomRequest) => {
  const query = `
    INSERT INTO chat_room_members (room_id, user_id)
    VALUES (?, ?)
  `;

  try {
    const connection = await Connection();
    const [result] = await connection.query<ResultSetHeader>(query, [
      roomId,
      userId,
    ]);

    return {
      memberId: result.insertId,
    };
  } catch (error) {
    throw new Error(`DB Insert Error: ${error}`);
  }
};

export default {
  exitRoom,
  enterTheRoom,
};
