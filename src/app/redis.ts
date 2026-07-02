import Redis from 'ioredis';

const globalForRedis = globalThis as unknown as { redis: Redis };

// Automatically connects using the REDIS_URL environment variable Vercel provided
export const redis = globalForRedis.redis || new Redis(process.env.REDIS_URL || '');

if (process.env.NODE_ENV !== 'production') globalForRedis.redis = redis;
