import { NextFunction, Response } from 'express';
import { AuthRequest } from '@/type';
import { RoomMemberModel } from '@/models';
import { CustomError } from '@/util';

const exitRoom = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const roomId = Number(req.params.roomId);
  const userId = Number(req.userId);

  try {
    const result = await RoomMemberModel.exitRoom({ roomId, userId });

    res.json({ data: result, message: 'success' });
  } catch (error) {
    next(new CustomError(500, `Internal Server Error: ${error}`));
  }
};

export default { exitRoom };
