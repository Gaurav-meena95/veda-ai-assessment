import dotenv from 'dotenv';
import path from 'path';

// Load the environment variables from root of Backend
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const env = {
  PORT: Number(process.env.PORT || '3000'),
  MONGODB_URI: process.env.MONGODB_URI || '',
  UPSTASH_REDIS_HOST: process.env.UPSTASH_REDIS_HOST || '',
  UPSTASH_REDIS_PORT: Number(process.env.UPSTASH_REDIS_PORT || '6379'),
  UPSTASH_REDIS_PASSWORD: process.env.UPSTASH_REDIS_PASSWORD || '',
  GROQ_API_KEY: process.env.GROQ_API_KEY || '',
};

// Strict check for vital credentials
const requiredEnvVars: (keyof typeof env)[] = [
  'MONGODB_URI',
  'UPSTASH_REDIS_HOST',
  'UPSTASH_REDIS_PASSWORD',
  'GROQ_API_KEY'
];

const missing = requiredEnvVars.filter((key) => !env[key]);

if (missing.length > 0) {
  console.warn(`\n[VedaAI Warning] Missing critical configuration keys: ${missing.join(', ')}`);
  console.warn(`Please ensure these are populated in Backend/.env for features to function.\n`);
}

export default env;
