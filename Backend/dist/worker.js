"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
const redis_1 = __importDefault(require("./config/redis"));
const db_1 = __importDefault(require("./config/db"));
const Assignment_1 = __importDefault(require("./models/Assignment"));
const groqService_1 = __importDefault(require("./services/groqService"));
const wsService_1 = __importDefault(require("./services/wsService"));
// Each worker process connects to Mongoose separately
(0, db_1.default)();
console.log('[VedaAI Worker] Bootstrapping questionGeneration BullMQ worker process...');
const worker = new bullmq_1.Worker('questionGeneration', async (job) => {
    const { assignmentId, questionTypes, additionalInfo, fileContent } = job.data;
    console.log(`[VedaAI Worker] Job #${job.id} loaded. Target Assessment ID: ${assignmentId}`);
    try {
        // 1. Shift DB status to processing and alert frontend
        await Assignment_1.default.findByIdAndUpdate(assignmentId, { status: 'processing' });
        wsService_1.default.broadcast({
            type: 'job:processing',
            assignmentId
        });
        // Dispatch dynamic progression states to drive the frontend percentage animations
        await new Promise((resolve) => setTimeout(resolve, 800));
        wsService_1.default.broadcast({ type: 'job:progress', assignmentId, progress: 25 });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        wsService_1.default.broadcast({ type: 'job:progress', assignmentId, progress: 60 });
        // 2. Perform Groq generation call
        const generatedPaper = await groqService_1.default.generatePaper({
            assignmentId,
            questionTypes,
            additionalInfo,
            fileContent,
        });
        wsService_1.default.broadcast({ type: 'job:progress', assignmentId, progress: 90 });
        await new Promise((resolve) => setTimeout(resolve, 600));
        // 3. Save generated JSON data to Mongoose and shift status to generated
        const updatedAssignment = await Assignment_1.default.findByIdAndUpdate(assignmentId, {
            status: 'generated',
            generatedPaper,
        }, { new: true } // Returns updated schema document
        );
        // 4. Alert client that job is successfully generated
        wsService_1.default.broadcast({
            type: 'job:done',
            assignmentId,
            assignment: updatedAssignment,
        });
        console.log(`[VedaAI Worker] Job #${job.id} processed successfully.`);
        return generatedPaper;
    }
    catch (error) {
        const errMsg = error instanceof Error ? error.message : 'Unknown generation crash';
        console.error(`[VedaAI Worker] Job #${job.id} processing crash:`, errMsg);
        // Shift DB status to failed
        await Assignment_1.default.findByIdAndUpdate(assignmentId, { status: 'failed' });
        // Broadcast failure socket to client
        wsService_1.default.broadcast({
            type: 'job:failed',
            assignmentId,
            error: errMsg,
        });
        throw error;
    }
}, {
    connection: redis_1.default,
    concurrency: 1, // Processes jobs in sequential order
});
// Worker tracking hooks
worker.on('completed', (job) => {
    console.log(`[VedaAI Worker] BullMQ event: Job #${job.id} completed successfully.`);
});
worker.on('failed', (job, err) => {
    console.error(`[VedaAI Worker] BullMQ event: Job #${job?.id} failed. Reason: ${err.message}`);
});
