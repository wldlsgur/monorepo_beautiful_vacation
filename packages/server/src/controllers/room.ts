import { Request, Response } from 'express';
import { RoomModel } from '@/models';

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

export default { getRoomList };
