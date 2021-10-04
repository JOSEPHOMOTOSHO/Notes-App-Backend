import express, { Router } from 'express';
import { createNote, getCollaborators } from '../controller/notesController';

const router = Router();

router.post('/:folderId', createNote);
router.get('/:noteId/collaborators', getCollaborators);
export default router;
