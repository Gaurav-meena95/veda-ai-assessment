"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = __importDefault(require("./env"));
const connectDB = async () => {
    if (!env_1.default.MONGODB_URI || env_1.default.MONGODB_URI.includes('<user>')) {
        console.warn('[VedaAI DB] MongoDB URI placeholder detected or undefined. Skipping database connection.');
        return;
    }
    try {
        const conn = await mongoose_1.default.connect(env_1.default.MONGODB_URI);
        console.log(`[VedaAI DB] MongoDB Connected successfully: ${conn.connection.host}`);
    }
    catch (error) {
        console.error('[VedaAI DB] MongoDB connection failed:', error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
exports.default = exports.connectDB;
