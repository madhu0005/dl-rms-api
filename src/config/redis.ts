import { createClient } from 'redis';
import * as dotenv from 'dotenv';

dotenv.config();

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

redisClient.connect().catch(err => console.error('Failed to connect to Redis:', err));

export default redisClient;
