"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const assignmentController_1 = require("../controllers/assignmentController");
const router = (0, express_1.Router)();
// Multer parser configured to store uploads inside standard memory arrays
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB max size limit
    },
});
router.get('/', assignmentController_1.assignmentController.getAssignments);
router.post('/', upload.single('file'), assignmentController_1.assignmentController.createAssignment);
router.get('/:id', assignmentController_1.assignmentController.getAssignmentById);
router.delete('/:id', assignmentController_1.assignmentController.deleteAssignment);
exports.default = router;
