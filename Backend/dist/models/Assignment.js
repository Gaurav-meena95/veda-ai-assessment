"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Assignment = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const QuestionTypeSchema = new mongoose_1.Schema({
    type: { type: String, required: true },
    noOfQuestions: { type: Number, required: true },
    marks: { type: Number, required: true }
}, { _id: false });
const AssignmentSchema = new mongoose_1.Schema({
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
    generatedPaper: { type: mongoose_1.Schema.Types.Mixed },
    jobId: { type: String },
    schoolName: { type: String, default: 'Harvard Public School' },
    subject: { type: String, default: 'English' },
    className: { type: String, default: '5th' }
}, {
    timestamps: true // Auto-manages createdAt and updatedAt
});
exports.Assignment = mongoose_1.default.model('Assignment', AssignmentSchema);
exports.default = exports.Assignment;
