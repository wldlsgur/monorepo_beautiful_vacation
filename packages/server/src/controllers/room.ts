import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { AuthRequest } from '@/type';
import { RoomModel } from '@/models';
import { CONFIG } from '@/config';
import { CustomError } from '@/util';

const getRoom = async (req: Request, res: Response, next: NextFunction) => {
  const roomId = Number(req.params.roomId);

  try {
    const room = await RoomModel.getRoom({ roomId });

    res.json({ data: room, message: 'success' });
  } catch (error) {
    next(new CustomError(500, `Internal Server Error: ${error}`));
  }
};

const getRoomList = async (req: Request, res: Response, next: NextFunction) => {
  const limit = Number(req.query.limit);
  const offset = Number(req.query.offset);

  try {
    const roomList = await RoomModel.getRoomList({ limit, offset });

    res.json({ data: roomList, message: 'success' });
  } catch (error) {
    next(new CustomError(500, `Internal Server Error: ${error}`));
  }
};

const getSearchRoom = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const keyword = String(req.query.keyword);
  const limit = Number(req.query.limit);
  const offset = Number(req.query.offset);

  try {
    const searchRoom = await RoomModel.getSearchRoom({
      keyword,
      limit,
      offset,
    });

    res.json({ data: searchRoom, message: 'success' });
  } catch (error) {
    next(new CustomError(500, `Internal Server Error: ${error}`));
  }
};

const createRoom = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const { room_name, password, max_participants } = req.body;
  const userId = Number(req.userId);

  try {
    const hashedPassword = await bcrypt.hash(
      password,
      Number(CONFIG.BCRYPT_SALT_ROUNDS),
    );

    const { roomId } = await RoomModel.createRoom({
      room_name,
      password: hashedPassword,
      owner_id: userId,
      max_participants,
    });
    await RoomModel.enterTheRoom({ roomId, userId });

    res.json({ data: roomId, message: 'success' });
  } catch (error) {
    next(new CustomError(500, `Internal Server Error: ${error}`));
  }
};

const getParticipatedRoom = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const limit = Number(req.query.limit);
  const offset = Number(req.query.offset);
  const userId = Number(req.userId);

  try {
    const participateRoomList = await RoomModel.getParticipatedRoom({
      userId,
      limit,
      offset,
    });

    res.json({ data: participateRoomList, message: 'success' });
  } catch (error) {
    next(new CustomError(500, `Internal Server Error: ${error}`));
  }
};

const getMadeRoom = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const limit = Number(req.query.limit);
  const offset = Number(req.query.offset);
  const userId = Number(req.userId);

  try {
    const madeRoomList = await RoomModel.getMadeRoom({
      userId,
      limit,
      offset,
    });

    res.json({ data: madeRoomList, message: 'success' });
  } catch (error) {
    next(new CustomError(500, `Internal Server Error: ${error}`));
  }
};

const deleteRoom = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const roomId = Number(req.params.roomId);
  const userId = Number(req.userId);

  try {
    const owner_id = await RoomModel.getRoomOwner({ roomId });

    if (owner_id !== userId) {
      res.status(403).json({ message: 'You are not the owner of this room' });
      return;
    }

    const result = await RoomModel.deleteRoom({
      userId: Number(userId),
      roomId,
    });

    res.json({ data: result, message: 'success' });
  } catch (error) {
    next(new CustomError(500, `Internal Server Error: ${error}`));
  }
};

const patchRoom = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const roomId = Number(req.params.roomId);
  const { room_name, password, max_participants } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(
      password,
      Number(CONFIG.BCRYPT_SALT_ROUNDS),
    );

    const result = await RoomModel.patchRoom({
      room_id: roomId,
      room_name,
      password: hashedPassword,
      max_participants,
    });

    res.json({ data: result, message: 'success' });
  } catch (error) {
    next(new CustomError(500, `Internal Server Error: ${error}`));
  }
};

export default {
  getRoom,
  getRoomList,
  getSearchRoom,
  createRoom,
  getParticipatedRoom,
  getMadeRoom,
  deleteRoom,
  patchRoom,
};
