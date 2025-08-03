import { Redis } from 'ioredis';
import { serverConfig } from '.';
import logger from './logger.config';

/**
 * @name connectToRedis
 * @description function to connect to Redis using singleton pattern
 * @returns Redis client
 */
function connectToRedis() {
  try {
    let connection: Redis;
    const redisConfig = {
      port: serverConfig.REDIS_PORT,
      host: serverConfig.REDIS_HOST,
      maxRetriesPerRequest: null,
    };

    return () => {
      if (!connection) {
        connection = new Redis(redisConfig);
      }
      return connection;
    };
  } catch (error) {
    logger.error('Redis connection error:', error);
    throw error;
  }
}

export const getRedisClient = connectToRedis();
