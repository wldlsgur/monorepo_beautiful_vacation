import { Request, Response } from 'express';
import { UsersModel } from '@/models';

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UsersModel.getUsers();

    res.json(users);
  } catch (error) {
    res.status(500).json(`Internal Server Error: ${error}`);
  }
};

export default { getUsers };
