import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import {
  CreateRoomRequest,
  DeleteRoomRequest,
  EnterTheRoomRequest,
  ParticipatedRoomRequest,
  PatchRoomRequest,
  RoomListRequest,
  RoomOwnerRequest,
  RoomRequest,
  SearchRoomRequest,
} from 'common-types';
import { Connection } from '@/config';

const getRoom = async ({ roomId }: RoomRequest) => {
  const query = `
    SELECT room_id, room_name, owner_id, max_participants FROM chat_rooms
    WHERE room_id = ?
  `;

  try {
    const connection = await Connection();
    const [rows] = await connection.query<RowDataPacket[]>(query, [roomId]);

    return rows[0];
  } catch (error) {
    throw new Error(`DB Query Error: ${error}`);
  }
};

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
}: CreateRoomRequest) => {
  const query = `
    INSERT INTO chat_rooms (room_name, password, owner_id, max_participants, current_participants)
    VALUES (?, ?, ?, ?, 0)
  `;

  try {
    const connection = await Connection();
    const [result] = await connection.query<ResultSetHeader>(query, [
      room_name,
      password,
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

const getParticipatedRoom = async ({
  userId,
  limit,
  offset,
}: ParticipatedRoomRequest) => {
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

const deleteRoom = async ({ roomId }: DeleteRoomRequest) => {
  const query = `
    DELETE FROM chat_rooms
    WHERE room_id = ?
  `;

  try {
    const connection = await Connection();
    const [result] = await connection.query(query, [roomId]);

    return result;
  } catch (error) {
    throw new Error(`DB Query Error: ${error}`);
  }
};

const getRoomOwner = async ({ roomId }: RoomOwnerRequest) => {
  const query = `
    SELECT owner_id FROM chat_rooms
    WHERE room_id = ?
    LIMIT 1
  `;

  try {
    const connection = await Connection();
    const [rows] = await connection.query<RowDataPacket[]>(query, [roomId]);

    if (rows.length === 0) {
      return null;
    }

    return rows[0].owner_id;
  } catch (error) {
    throw new Error(`DB Query Error: ${error}`);
  }
};

const patchRoom = async ({
  room_id,
  room_name,
  password,
  max_participants,
}: PatchRoomRequest) => {
  const query = `
    UPDATE chat_rooms
    SET
      room_name = ?,
      password = ?,
      max_participants = ?
    WHERE room_id = ?
  `;

  try {
    const connection = await Connection();
    const [result] = await connection.query(query, [
      room_name,
      password,
      max_participants,
      room_id,
    ]);

    return result;
  } catch (error) {
    throw new Error(`DB Query Error: ${error}`);
  }
};

export default {
  getRoomList,
  getSearchRoom,
  createRoom,
  getParticipatedRoom,
  enterTheRoom,
  deleteRoom,
  getRoomOwner,
  getRoom,
  patchRoom,
};
