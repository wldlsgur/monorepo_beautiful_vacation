import { Request, Response } from 'express';
import { AuthRequest } from '@/type';
import { RoomModel } from '@/models';

const getRoom = async (req: Request, res: Response) => {
  const roomId = Number(req.params.roomId);

  try {
    const room = await RoomModel.getRoom({ roomId });

    res.json({ data: room, message: 'success' });
  } catch (error) {
    res.status(500).json(`Internal Server Error: ${error}`);
  }
};

const getRoomList = async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string, 10) || 10;
  const offset = parseInt(req.query.offset as string, 10) || 0;

  try {
    const roomList = await RoomModel.getRoomList({ limit, offset });

    res.json({ data: roomList, message: 'success' });
  } catch (error) {
    res.status(500).json(`Internal Server Error: ${error}`);
  }
};

const getSearchRoom = async (req: Request, res: Response) => {
  const keyword = (req.query.keyword as string) || '';
  const limit = parseInt(req.query.limit as string, 10) || 10;
  const offset = parseInt(req.query.offset as string, 10) || 0;

  if (!keyword) {
    res.json({ data: [], message: 'success' });
    return;
  }

  try {
    const searchRoom = await RoomModel.getSearchRoom({
      keyword,
      limit,
      offset,
    });

    res.json({ data: searchRoom, message: 'success' });
  } catch (error) {
    res.status(500).json(`Internal Server Error: ${error}`);
  }
};

const createRoom = async (req: AuthRequest, res: Response) => {
  const { room_name, password, max_participants } = req.body;
  const userId = Number(req.userId);

  if (!room_name || !password || !userId || !max_participants) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  try {
    const { roomId } = await RoomModel.createRoom({
      room_name,
      password,
      owner_id: userId,
      max_participants,
    });
    await RoomModel.enterTheRoom({ roomId, userId });

    res.json({ data: roomId, message: 'success' });
  } catch (error) {
    res.status(500).json(`Internal Server Error: ${error}`);
  }
};

const getParticipatedRoom = async (req: AuthRequest, res: Response) => {
  const limit = parseInt(req.query.limit as string, 10) || 10;
  const offset = parseInt(req.query.offset as string, 10) || 0;
  const userId = Number(req.userId);

  try {
    const participateRoomList = await RoomModel.getParticipatedRoom({
      userId,
      limit,
      offset,
    });

    res.json({ data: participateRoomList, message: 'success' });
  } catch (error) {
    res.status(500).json(`Internal Server Error: ${error}`);
  }
};

const deleteRoom = async (req: AuthRequest, res: Response) => {
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
    res.status(500).json(`Internal Server Error: ${error}`);
  }
};

export default {
  getRoom,
  getRoomList,
  getSearchRoom,
  createRoom,
  getParticipatedRoom,
  deleteRoom,
};
