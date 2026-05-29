import mongoose, { Schema, Document } from 'mongoose';
import { Assignment as IAssignment } from '../types';

export interface AssignmentDocument extends Omit<IAssignment, '_id'>, Document {}

const QuestionTypeSchema = new Schema({
  type: { type: String, required: true },
  noOfQuestions: { type: Number, required: true },
  marks: { type: Number, required: true }
}, { _id: false });

const AssignmentSchema: Schema = new Schema({
  title: { type: String, required: true },
  assignedOn: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  questionTypes: { type: [QuestionTypeSchema], required: true },
  additionalInfo: { type: String, default: '' },
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'generated', 'failed'], 
    default: 'pending' 
  },
  generatedPaper: { type: Schema.Types.Mixed },
  jobId: { type: String },
  schoolName: { type: String, default: 'Harvard Public School' },
  subject: { type: String, default: 'English' },
  className: { type: String, default: '5th' }
}, {
  timestamps: true // Auto-manages createdAt and updatedAt
});

export const Assignment = mongoose.model<AssignmentDocument>('Assignment', AssignmentSchema);
export default Assignment;
