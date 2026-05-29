"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignmentController = exports.deleteAssignment = exports.getAssignmentById = exports.getAssignments = exports.createAssignment = void 0;
const Assignment_1 = __importDefault(require("../models/Assignment"));
const queueService_1 = __importDefault(require("../services/queueService"));
const createAssignment = async (req, res) => {
    try {
        const { dueDate, additionalInfo, title, schoolName, subject, className } = req.body;
        if (!dueDate || !req.body.questionTypes) {
            res.status(400).json({ error: 'Missing required parameters. Ensure dueDate and questionTypes are supplied.' });
            return;
        }
        let parsedQuestionTypes = [];
        try {
            parsedQuestionTypes = typeof req.body.questionTypes === 'string'
                ? JSON.parse(req.body.questionTypes)
                : req.body.questionTypes;
        }
        catch (e) {
            res.status(400).json({ error: 'Invalid JSON format for questionTypes array.' });
            return;
        }
        const fileContent = req.file
            ? `[Context file] Name: ${req.file.originalname}, MIME: ${req.file.mimetype}, Size: ${req.file.size} bytes.`
            : undefined;
        // 1. Initialize and Save new Assessment in MongoDB with pending status
        const newAssignment = new Assignment_1.default({
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
        const jobId = await queueService_1.default.addGenerationJob(savedAssignment._id.toString(), parsedQuestionTypes, additionalInfo || '', fileContent);
        // 3. Store jobId back inside the assignment document
        savedAssignment.jobId = jobId;
        await savedAssignment.save();
        res.status(201).json({
            assignment: savedAssignment,
            jobId,
            message: 'Generation started successfully.',
        });
    }
    catch (error) {
        console.error('[VedaAI Controller] createAssignment Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.createAssignment = createAssignment;
const getAssignments = async (_req, res) => {
    try {
        const assignments = await Assignment_1.default.find().sort({ createdAt: -1 });
        res.status(200).json(assignments);
    }
    catch (error) {
        console.error('[VedaAI Controller] getAssignments Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getAssignments = getAssignments;
const getAssignmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const assignment = await Assignment_1.default.findById(id);
        if (!assignment) {
            res.status(404).json({ error: 'Assignment not found' });
            return;
        }
        res.status(200).json(assignment);
    }
    catch (error) {
        console.error('[VedaAI Controller] getAssignmentById Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getAssignmentById = getAssignmentById;
const deleteAssignment = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Assignment_1.default.findByIdAndDelete(id);
        if (!deleted) {
            res.status(404).json({ error: 'Assignment not found for deletion' });
            return;
        }
        res.status(200).json({ success: true, message: 'Assignment deleted successfully' });
    }
    catch (error) {
        console.error('[VedaAI Controller] deleteAssignment Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.deleteAssignment = deleteAssignment;
exports.assignmentController = {
    createAssignment: exports.createAssignment,
    getAssignments: exports.getAssignments,
    getAssignmentById: exports.getAssignmentById,
    deleteAssignment: exports.deleteAssignment,
};
exports.default = exports.assignmentController;
