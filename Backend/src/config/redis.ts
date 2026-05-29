import IORedis, { RedisOptions } from 'ioredis';
import env from './env';

const isPlaceholder = !env.UPSTASH_REDIS_HOST || env.UPSTASH_REDIS_HOST.includes('your-upstash-host');

const host = isPlaceholder ? '127.0.0.1' : env.UPSTASH_REDIS_HOST;
const port = isPlaceholder ? 6379 : env.UPSTASH_REDIS_PORT;
const password = isPlaceholder ? undefined : env.UPSTASH_REDIS_PASSWORD;

const options: RedisOptions = {
  host,
  port,
  maxRetriesPerRequest: null, // REQUIRED for BullMQ
};

if (password) {
  options.password = password;
}

// Upstash Redis requires TLS encryption
if (!isPlaceholder) {
  options.tls = {};
}

export const redis = new IORedis(options);

redis.on('connect', () => {
  console.log(`[VedaAI Redis] Connected to ${isPlaceholder ? 'Localhost Redis (Fallback)' : 'Upstash Redis'}`);
});

redis.on('error', (err) => {
  // Graceful logging instead of crashing Express event loop on connection drops
  console.warn(`[VedaAI Redis] Socket warning: ${err.message}`);
});

export default redis;
