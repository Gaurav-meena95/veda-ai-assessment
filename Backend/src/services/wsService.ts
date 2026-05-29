import { WebSocket, WebSocketServer } from 'ws';
import { Server } from 'http';

// Store all active socket connections
export const clients = new Set<WebSocket>();

export const initWebSocketServer = (server: Server): void => {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws: WebSocket) => {
    clients.add(ws);
    console.log(`[VedaAI WS] Client connected. Active clients: ${clients.size}`);

    ws.on('close', () => {
      clients.delete(ws);
      console.log(`[VedaAI WS] Client disconnected. Active clients: ${clients.size}`);
    });

    ws.on('error', (err) => {
      console.error('[VedaAI WS] Client socket warning:', err.message);
      clients.delete(ws);
    });
  });

  console.log('[VedaAI WS] WebSocket Server bound to HTTP server successfully.');
};

export const broadcast = (message: unknown): void => {
  const payload = JSON.stringify(message);
  
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      try {
        client.send(payload);
      } catch (err) {
        console.error('[VedaAI WS] Failed to dispatch socket payload:', err);
        clients.delete(client);
      }
    }
  });
};

export const wsService = {
  initWebSocketServer,
  broadcast,
};

export default wsService;
