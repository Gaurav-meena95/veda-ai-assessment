import mongoose from 'mongoose';
import env from './env';

export const connectDB = async (): Promise<void> => {
  // If already connected or connecting, return immediately
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  if (!env.MONGODB_URI || env.MONGODB_URI.includes('<user>')) {
    console.warn('[VedaAI DB] MongoDB URI placeholder detected or undefined. Skipping database connection.');
    return;
  }

  try {
    const conn = await mongoose.connect(env.MONGODB_URI, {
      bufferCommands: false, // Fail fast rather than buffering if connection drops
    });
    console.log(`[VedaAI DB] MongoDB Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error('[VedaAI DB] MongoDB connection failed:', error);
    throw error;
  }
};

export default connectDB;
