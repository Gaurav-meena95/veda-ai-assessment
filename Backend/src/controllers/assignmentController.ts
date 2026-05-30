import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Assignment from '../models/Assignment';
import queueService from '../services/queueService';
import { QuestionTypeConfig } from '../types';

export const createAssignment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { dueDate, additionalInfo, title, schoolName, subject, className } = req.body;

    if (!dueDate || !req.body.questionTypes) {
      res.status(400).json({ error: 'Missing required parameters. Ensure dueDate and questionTypes are supplied.' });
      return;
    }

    let parsedQuestionTypes: QuestionTypeConfig[] = [];
    try {
      parsedQuestionTypes = typeof req.body.questionTypes === 'string'
        ? JSON.parse(req.body.questionTypes)
        : req.body.questionTypes;
    } catch (e) {
      res.status(400).json({ error: 'Invalid JSON format for questionTypes array.' });
      return;
    }

    const fileContent = req.file
      ? `[Context file] Name: ${req.file.originalname}, MIME: ${req.file.mimetype}, Size: ${req.file.size} bytes.`
      : undefined;

    // 1. Initialize and Save new Assessment in MongoDB with pending status
    const newAssignment = new Assignment({
      title: title || 'New Assessment',
      dueDate: new Date(dueDate),
      questionTypes: parsedQuestionTypes,
      additionalInfo: additionalInfo || '',
      status: 'pending',
      schoolName: schoolName || 'Harvard Public School',
      subject: subject || 'English',
      className: className || '5th',
    });

    const savedAssignment = await newAssignment.save();

    // 2. Add job to BullMQ queue
    const jobId = await queueService.addGenerationJob(
      savedAssignment._id.toString(),
      parsedQuestionTypes,
      additionalInfo || '',
      fileContent
    );

    // 3. Store jobId back inside the assignment document
    savedAssignment.jobId = jobId;
    await savedAssignment.save();

    res.status(201).json({
      assignment: savedAssignment,
      jobId,
      message: 'Generation started successfully.',
    });
  } catch (error) {
    console.error('[VedaAI Controller] createAssignment Error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
  }
};

export const getAssignments = async (_req: Request, res: Response): Promise<void> => {
  try {
    const assignments = await Assignment.find().sort({ createdAt: -1 });
    res.status(200).json(assignments);
  } catch (error) {
    console.error('[VedaAI Controller] getAssignments Error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : String(error)
    });
  }
};

export const getAssignmentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id) || id === 'undefined') {
      res.status(400).json({ error: 'Invalid Assignment ID structure' });
      return;
    }

    const assignment = await Assignment.findById(id);

    if (!assignment) {
      res.status(404).json({ error: 'Assignment not found' });
      return;
    }

    res.status(200).json(assignment);
  } catch (error) {
    console.error('[VedaAI Controller] getAssignmentById Error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : String(error)
    });
  }
};

export const deleteAssignment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id) || id === 'undefined') {
      res.status(400).json({ error: 'Invalid Assignment ID structure' });
      return;
    }

    const deleted = await Assignment.findByIdAndDelete(id);

    if (!deleted) {
      res.status(404).json({ error: 'Assignment not found for deletion' });
      return;
    }

    res.status(200).json({ success: true, message: 'Assignment deleted successfully' });
  } catch (error) {
    console.error('[VedaAI Controller] deleteAssignment Error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : String(error)
    });
  }
};

export const assignmentController = {
  createAssignment,
  getAssignments,
  getAssignmentById,
  deleteAssignment,
};

export default assignmentController;
