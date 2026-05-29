import mongoose from 'mongoose';
import env from './env';

export const connectDB = async (): Promise<void> => {
  if (!env.MONGODB_URI || env.MONGODB_URI.includes('<user>')) {
    console.warn('[VedaAI DB] MongoDB URI placeholder detected or undefined. Skipping database connection.');
    return;
  }

  try {
    const conn = await mongoose.connect(env.MONGODB_URI);
    console.log(`[VedaAI DB] MongoDB Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error('[VedaAI DB] MongoDB connection failed:', error);
    process.exit(1);
  }
};

export default connectDB;
