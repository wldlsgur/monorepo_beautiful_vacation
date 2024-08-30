import { Connection } from '@/config';

const getUsers = async () => {
  try {
    const connection = await Connection();
    const [rows] = await connection.query('SELECT * FROM users');

    return rows;
  } catch (error) {
    throw new Error(`DB Query Error: ${error}`);
  }
};

export default {
  getUsers,
};
