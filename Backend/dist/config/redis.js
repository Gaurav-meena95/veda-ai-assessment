"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const env_1 = __importDefault(require("./env"));
const isPlaceholder = !env_1.default.UPSTASH_REDIS_HOST || env_1.default.UPSTASH_REDIS_HOST.includes('your-upstash-host');
const host = isPlaceholder ? '127.0.0.1' : env_1.default.UPSTASH_REDIS_HOST;
const port = isPlaceholder ? 6379 : env_1.default.UPSTASH_REDIS_PORT;
const password = isPlaceholder ? undefined : env_1.default.UPSTASH_REDIS_PASSWORD;
const options = {
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
exports.redis = new ioredis_1.default(options);
exports.redis.on('connect', () => {
    console.log(`[VedaAI Redis] Connected to ${isPlaceholder ? 'Localhost Redis (Fallback)' : 'Upstash Redis'}`);
});
exports.redis.on('error', (err) => {
    // Graceful logging instead of crashing Express event loop on connection drops
    console.warn(`[VedaAI Redis] Socket warning: ${err.message}`);
});
exports.default = exports.redis;
