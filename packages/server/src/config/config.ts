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
  REDIS: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || '6379',
  },
  JWT_SECRET: process.env.JWT_SECRET,
  KAKAO_REST_API_KEY: process.env.KAKAO_REST_API_KEY,
  KAKAO_REDIRECT_URL: process.env.KAKAO_REDIRECT_URL,
  NODE_ENV: process.env.NODE_ENV,
};

export default CONFIG;
