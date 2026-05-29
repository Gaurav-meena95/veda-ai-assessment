"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const env_1 = __importDefault(require("./config/env"));
const db_1 = __importDefault(require("./config/db"));
const wsService_1 = __importDefault(require("./services/wsService"));
const assignments_1 = __importDefault(require("./routes/assignments"));
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
// CORS middlewares enabling secure local integrations
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Standard health checking interface
app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});
// Primary assignments controller route mapping
app.use('/api/assignments', assignments_1.default);
// Server bootstrapping sequence
const startServer = async () => {
    // 1. Establish database mapping
    await (0, db_1.default)();
    // 2. Initialize and attach WebSocket client structures
    wsService_1.default.initWebSocketServer(server);
    // 3. Listen on configured port 3000
    server.listen(env_1.default.PORT, () => {
        console.log(`[VedaAI Server] API Server actively listening on http://localhost:${env_1.default.PORT}`);
        console.log(`[VedaAI Server] WebSocket Server listening at ws://localhost:${env_1.default.PORT}`);
    });
};
startServer().catch((error) => {
    console.error('[VedaAI Server] Global application startup crash:', error);
    process.exit(1);
});
