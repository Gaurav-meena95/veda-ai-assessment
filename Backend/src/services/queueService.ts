import { Queue } from 'bullmq';
import redis from '../config/redis';
import { QuestionTypeConfig } from '../types';

export const questionQueue = new Queue('questionGeneration', {
  connection: redis as any,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
    removeOnComplete: true, // Keep redis memory clean by pruning completed jobs
    removeOnFail: false,   // Retain failures for diagnosis
  },
});

export const addGenerationJob = async (
  assignmentId: string,
  questionTypes: QuestionTypeConfig[],
  additionalInfo: string,
  fileContent?: string
): Promise<string> => {
  const job = await questionQueue.add('generate', {
    assignmentId,
    questionTypes,
    additionalInfo,
    fileContent
  });
  
  return job.id || '';
};

export const queueService = {
  questionQueue,
  addGenerationJob,
};

export default queueService;
