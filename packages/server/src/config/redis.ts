import Redis from 'ioredis';

const redisClient = new Redis();

redisClient.on('error', (error) => {
  console.log('Redis error:', error);
});

export default redisClient;
