import { ResultSetHeader } from 'mysql2/promise';
import bcrypt from 'bcrypt';
import {
  CreateRoomServerRequest,
  ParticipatedRoomServerRequest,
  RoomListRequest,
  SearchRoomRequest,
} from 'common-types';
import { CONFIG, Connection } from '@/config';

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

const createRoom = async ({
  room_name,
  password,
  owner_id,
  max_participants,
}: CreateRoomServerRequest) => {
  const query = `
    INSERT INTO chat_rooms (room_name, password, owner_id, max_participants, current_participants)
    VALUES (?, ?, ?, ?, 0)
  `;
  const hashedPassword = await bcrypt.hash(
    password,
    Number(CONFIG.BCRYPT_SALT_ROUNDS),
  );

  try {
    const connection = await Connection();
    const [result] = await connection.query<ResultSetHeader>(query, [
      room_name,
      hashedPassword,
      owner_id,
      max_participants,
    ]);

    return {
      roomId: result.insertId,
    };
  } catch (error) {
    throw new Error(`DB Insert Error: ${error}`);
  }
};

const getParticipatedRoom = async ({
  userId,
  limit,
  offset,
}: ParticipatedRoomServerRequest) => {
  const query = `
    SELECT * FROM chat_rooms
    WHERE owner_id = ?
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;

  try {
    const connection = await Connection();
    const [rows] = await connection.query(query, [userId, limit, offset]);

    return rows;
  } catch (error) {
    throw new Error(`DB Query Error: ${error}`);
  }
};

export default {
  getRoomList,
  getSearchRoom,
  createRoom,
  getParticipatedRoom,
};
