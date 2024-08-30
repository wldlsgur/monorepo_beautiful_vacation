import dotenv from 'dotenv';

dotenv.config();

const CONFIG = {
  MYSQL: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
  },
};

export default CONFIG;
