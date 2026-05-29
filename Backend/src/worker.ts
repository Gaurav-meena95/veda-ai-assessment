import { Worker, Job } from 'bullmq';
import redis from './config/redis';
import connectDB from './config/db';
import Assignment from './models/Assignment';
import groqService from './services/groqService';
import wsService from './services/wsService';

// Each worker process connects to Mongoose separately
connectDB();

console.log('[VedaAI Worker] Bootstrapping questionGeneration BullMQ worker process...');

const worker = new Worker(
  'questionGeneration',
  async (job: Job) => {
    const { assignmentId, questionTypes, additionalInfo, fileContent } = job.data;
    console.log(`[VedaAI Worker] Job #${job.id} loaded. Target Assessment ID: ${assignmentId}`);

    try {
      // 1. Shift DB status to processing and alert frontend
      await Assignment.findByIdAndUpdate(assignmentId, { status: 'processing' });
      wsService.broadcast({ 
        type: 'job:processing', 
        assignmentId 
      });

      // Dispatch dynamic progression states to drive the frontend percentage animations
      await new Promise((resolve) => setTimeout(resolve, 800));
      wsService.broadcast({ type: 'job:progress', assignmentId, progress: 25 });

      await new Promise((resolve) => setTimeout(resolve, 1000));
      wsService.broadcast({ type: 'job:progress', assignmentId, progress: 60 });

      // 2. Perform Groq generation call
      const generatedPaper = await groqService.generatePaper({
        assignmentId,
        questionTypes,
        additionalInfo,
        fileContent,
      });

      wsService.broadcast({ type: 'job:progress', assignmentId, progress: 90 });
      await new Promise((resolve) => setTimeout(resolve, 600));

      // 3. Save generated JSON data to Mongoose and shift status to generated
      const updatedAssignment = await Assignment.findByIdAndUpdate(
        assignmentId,
        {
          status: 'generated',
          generatedPaper,
        },
        { new: true } // Returns updated schema document
      );

      // 4. Alert client that job is successfully generated
      wsService.broadcast({
        type: 'job:done',
        assignmentId,
        assignment: updatedAssignment,
      });

      console.log(`[VedaAI Worker] Job #${job.id} processed successfully.`);
      return generatedPaper;
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : 'Unknown generation crash';
      console.error(`[VedaAI Worker] Job #${job.id} processing crash:`, errMsg);
      
      // Shift DB status to failed
      await Assignment.findByIdAndUpdate(assignmentId, { status: 'failed' });

      // Broadcast failure socket to client
      wsService.broadcast({
        type: 'job:failed',
        assignmentId,
        error: errMsg,
      });

      throw error;
    }
  },
  {
    connection: redis as any,
    concurrency: 1, // Processes jobs in sequential order
  }
);

// Worker tracking hooks
worker.on('completed', (job) => {
  console.log(`[VedaAI Worker] BullMQ event: Job #${job.id} completed successfully.`);
});

worker.on('failed', (job, err) => {
  console.error(`[VedaAI Worker] BullMQ event: Job #${job?.id} failed. Reason: ${err.message}`);
});
