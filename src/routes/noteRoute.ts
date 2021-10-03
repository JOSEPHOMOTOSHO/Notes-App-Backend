import express , { Router } from 'express';
import createNote from '../controller/notesController';

const router = Router();

router.post('/:folderId', createNote )

export default router;
