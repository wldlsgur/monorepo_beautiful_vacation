import { Request, Response } from 'express';
import userModel from '@/models/users';

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userModel.getUsers();

    res.json(users);
  } catch (error) {
    res.status(500).json(`Internal Server Error: ${error}`);
  }
};

export default { getUsers };