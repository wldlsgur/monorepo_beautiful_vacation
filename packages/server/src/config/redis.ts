import Redis from 'ioredis';
import CONFIG from './config';

const redisClient = new Redis({
  host: CONFIG.REDIS.host,
  port: Number(CONFIG.REDIS.port),
});

redisClient.on('error', (error) => {
  console.log('Redis error:', error);
});

export default redisClient;
