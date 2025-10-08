/**
 * The Redis connection is created when the module is first imported, 
 * not when a Redis operation is performed.
 */

import { config } from 'dotenv';
import redis from 'redis';

// Specify custom .env path
config({ path: ".env" });

export const client = redis.createClient({
    url: process.env.REDIS_URL
});

console.log('redis url:', process.env.REDIS_URL);

client.on('error', (err) => console.error('Redis Client Error', err));

await client.connect();

export { client as redisClient };
