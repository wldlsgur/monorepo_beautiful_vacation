import mysql from 'mysql2/promise';
import CONFIG from './config';

const Connection = async () => {
  const connection = await mysql.createConnection(CONFIG.MYSQL);

  return connection;
};

export default Connection;
