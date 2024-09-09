import { Request, Response } from 'express';
import { RoomModel } from '@/models';
import { AuthRequest } from '@/type';

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
  const { userId } = req;

  try {
    if (!room_name || !password || !userId || !max_participants) {
      res.status(400).json({ error: 'All fields are required' });
      return;
    }

    const result = await RoomModel.createRoom({
      room_name,
      password,
      owner_id: Number(userId),
      max_participants,
    });

    res.json({ data: result, message: 'success' });
  } catch (error) {
    res.status(500).json(`Internal Server Error: ${error}`);
  }
};

export default { getRoomList, getSearchRoom, createRoom };
