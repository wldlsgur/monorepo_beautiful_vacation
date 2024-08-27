import initDB from '@/config/db';

const getUsers = async () => {
  try {
    const connection = await initDB();
    const [rows] = await connection.query('SELECT * FROM users');

    return rows;
  } catch (error) {
    throw new Error(`DB Query Error: ${error}`);
  }
};

export default {
  getUsers,
};
