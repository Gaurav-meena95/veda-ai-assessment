import { Router } from 'express';
import multer from 'multer';
import { assignmentController } from '../controllers/assignmentController';

const router = Router();

// Multer parser configured to store uploads inside standard memory arrays
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max size limit
  },
});

router.get('/', assignmentController.getAssignments);
router.post('/', upload.single('file'), assignmentController.createAssignment);
router.get('/:id', assignmentController.getAssignmentById);
router.delete('/:id', assignmentController.deleteAssignment);

export default router;
