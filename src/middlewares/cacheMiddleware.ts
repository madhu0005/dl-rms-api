import { Request, Response, NextFunction } from 'express';
import redisClient from '../config/redis';

export const cacheMiddleware = (key: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cachedData = await redisClient.get(key);

      if (cachedData) {
        return res.json(JSON.parse(cachedData));
      }

      res.locals.key = key;
      next();
    } catch (err) {
      console.error('Error fetching from cache:', err);
      next();
    }
  };
};

export const setCache = (key: string, data: any, ttl: number) => {
  redisClient.setEx(key, ttl, JSON.stringify(data)).catch(err => console.error('Error setting cache:', err));
};
