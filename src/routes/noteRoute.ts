import express, { Router } from 'express';
import {
  createNote,
  getCollaborators,
  getCollaboratorsNotes,
} from '../controller/notesController';
import authorization from '../auth/authorization-passport';

const router = Router();

router.post('/:folderId', createNote);
router.get('/:collaboratorId/notes', authorization, getCollaboratorsNotes);
router.get('/:noteId/collaborators', authorization, getCollaborators);
export default router;
