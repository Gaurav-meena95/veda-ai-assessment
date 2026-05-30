import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import env from './config/env';
import connectDB from './config/db';
import wsService from './services/wsService';
import assignmentRoutes from './routes/assignments';

const app = express();
const server = createServer(app);

// CORS middlewares enabling secure local integrations
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req, res) => {
  res.status(200).json({ message: 'Welcome to VedaAI Backend!' });
})
// Standard health checking interface
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Environment variable status check (without leaking actual secrets)
app.get('/env-check', (req, res) => {
  res.status(200).json({
    MONGODB_URI: env.MONGODB_URI ? 'Defined' : 'Undefined',
    UPSTASH_REDIS_HOST: env.UPSTASH_REDIS_HOST ? 'Defined' : 'Undefined',
    UPSTASH_REDIS_PORT: env.UPSTASH_REDIS_PORT ? 'Defined' : 'Undefined',
    UPSTASH_REDIS_PASSWORD: env.UPSTASH_REDIS_PASSWORD ? 'Defined' : 'Undefined',
    GROQ_API_KEY: env.GROQ_API_KEY ? 'Defined' : 'Undefined',
  });
});

// Primary assignments controller route mapping
app.use('/api/assignments', assignmentRoutes);

// Server bootstrapping sequence
const startServer = async (): Promise<void> => {
  // 1. Establish database mapping
  await connectDB();
  
  // 2. Initialize and attach WebSocket client structures
  wsService.initWebSocketServer(server);

  
  const PORT = process.env.PORT || 3000
  server.listen(env.PORT, () => {
    console.log(`[VedaAI Server] API Server actively listening on http://localhost:${env.PORT}`);
    console.log(`[VedaAI Server] WebSocket Server listening at ws://localhost:${env.PORT}`);
  });
};

startServer().catch((error) => {
  console.error('[VedaAI Server] Global application startup crash:', error);
  process.exit(1);
});
