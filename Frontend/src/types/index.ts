export interface Assignment {
  _id: string;
  title: string;
  assignedOn: string;
  dueDate: string;
  status: 'pending' | 'generated' | 'failed';
  questionTypes: QuestionTypeConfig[];
  additionalInfo: string;
  schoolName: string;
  subject: string;
  className: string;
  generatedPaper?: GeneratedPaper;
  createdAt?: string;
  updatedAt?: string;
}

export interface QuestionTypeConfig {
  type: string;
  noOfQuestions: number;
  marks: number;
}

export interface GeneratedPaper {
  aiMessage: string;
  schoolHeader: SchoolHeader;
  timeAllowed: string;
  maxMarks: number;
  instructions: string;
  sections: Section[];
  answerKey: AnswerKey[];
}

export interface Section {
  title: string;
  questionType: string;
  instruction: string;
  questions: Question[];
}

export interface Question {
  number: number;
  text: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  marks: number;
}

export interface AnswerKey {
  number: number;
  answer: string;
}

export interface SchoolHeader {
  schoolName: string;
  subject: string;
  className: string;
}

export interface CreateAssignmentFormData {
  file?: File;
  dueDate: string;
  questionTypes: QuestionTypeConfig[];
  additionalInfo: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  school: string;
  avatarColor: string;
}
