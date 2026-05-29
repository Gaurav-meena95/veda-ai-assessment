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
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Standard health checking interface
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Primary assignments controller route mapping
app.use('/api/assignments', assignmentRoutes);

// Server bootstrapping sequence
const startServer = async (): Promise<void> => {
  // 1. Establish database mapping
  await connectDB();
  
  // 2. Initialize and attach WebSocket client structures
  wsService.initWebSocketServer(server);

  // 3. Listen on configured port 5000
  server.listen(env.PORT, () => {
    console.log(`[VedaAI Server] API Server actively listening on http://localhost:${env.PORT}`);
    console.log(`[VedaAI Server] WebSocket Server listening at ws://localhost:${env.PORT}`);
  });
};

startServer().catch((error) => {
  console.error('[VedaAI Server] Global application startup crash:', error);
  process.exit(1);
});
