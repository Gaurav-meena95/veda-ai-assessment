"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queueService = exports.addGenerationJob = exports.questionQueue = void 0;
const bullmq_1 = require("bullmq");
const redis_1 = __importDefault(require("../config/redis"));
exports.questionQueue = new bullmq_1.Queue('questionGeneration', {
    connection: redis_1.default,
    defaultJobOptions: {
        attempts: 3,
        backoff: {
            type: 'exponential',
            delay: 2000,
        },
        removeOnComplete: true, // Keep redis memory clean by pruning completed jobs
        removeOnFail: false, // Retain failures for diagnosis
    },
});
const addGenerationJob = async (assignmentId, questionTypes, additionalInfo, fileContent) => {
    const job = await exports.questionQueue.add('generate', {
        assignmentId,
        questionTypes,
        additionalInfo,
        fileContent
    });
    return job.id || '';
};
exports.addGenerationJob = addGenerationJob;
exports.queueService = {
    questionQueue: exports.questionQueue,
    addGenerationJob: exports.addGenerationJob,
};
exports.default = exports.queueService;
