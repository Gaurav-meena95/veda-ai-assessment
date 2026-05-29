"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wsService = exports.broadcast = exports.initWebSocketServer = exports.clients = void 0;
const ws_1 = require("ws");
// Store all active socket connections
exports.clients = new Set();
const initWebSocketServer = (server) => {
    const wss = new ws_1.WebSocketServer({ server });
    wss.on('connection', (ws) => {
        exports.clients.add(ws);
        console.log(`[VedaAI WS] Client connected. Active clients: ${exports.clients.size}`);
        ws.on('close', () => {
            exports.clients.delete(ws);
            console.log(`[VedaAI WS] Client disconnected. Active clients: ${exports.clients.size}`);
        });
        ws.on('error', (err) => {
            console.error('[VedaAI WS] Client socket warning:', err.message);
            exports.clients.delete(ws);
        });
    });
    console.log('[VedaAI WS] WebSocket Server bound to HTTP server successfully.');
};
exports.initWebSocketServer = initWebSocketServer;
const broadcast = (message) => {
    const payload = JSON.stringify(message);
    exports.clients.forEach((client) => {
        if (client.readyState === ws_1.WebSocket.OPEN) {
            try {
                client.send(payload);
            }
            catch (err) {
                console.error('[VedaAI WS] Failed to dispatch socket payload:', err);
                exports.clients.delete(client);
            }
        }
    });
};
exports.broadcast = broadcast;
exports.wsService = {
    initWebSocketServer: exports.initWebSocketServer,
    broadcast: exports.broadcast,
};
exports.default = exports.wsService;
