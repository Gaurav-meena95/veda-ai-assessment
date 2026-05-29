"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load the environment variables from root of Backend
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
exports.env = {
    PORT: Number(process.env.PORT || '3000'),
    MONGODB_URI: process.env.MONGODB_URI || '',
    UPSTASH_REDIS_HOST: process.env.UPSTASH_REDIS_HOST || '',
    UPSTASH_REDIS_PORT: Number(process.env.UPSTASH_REDIS_PORT || '6379'),
    UPSTASH_REDIS_PASSWORD: process.env.UPSTASH_REDIS_PASSWORD || '',
    GROQ_API_KEY: process.env.GROQ_API_KEY || '',
};
// Strict check for vital credentials
const requiredEnvVars = [
    'MONGODB_URI',
    'UPSTASH_REDIS_HOST',
    'UPSTASH_REDIS_PASSWORD',
    'GROQ_API_KEY'
];
const missing = requiredEnvVars.filter((key) => !exports.env[key]);
if (missing.length > 0) {
    console.warn(`\n[VedaAI Warning] Missing critical configuration keys: ${missing.join(', ')}`);
    console.warn(`Please ensure these are populated in Backend/.env for features to function.\n`);
}
exports.default = exports.env;
