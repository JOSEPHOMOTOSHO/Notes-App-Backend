import express, { Router } from 'express';
import authorization from '../auth/authorization-passport';
import { createNote, getCollaborators, sortByDesc, sortByTitle, getAllNotes  } from '../controller/notes-Controller';
import { createFolder, getNote, trashNote} from '../controller/folder-Controller'; 
import { confirmCollaborator, inviteCollborator, removeCollaborator,  uploadFile, getNotification, adminRemoveCollaborator } from '../controller/collaborators-Controller';
import { joiValidateCollab } from '../middleware/joi';
import { upload } from '../middleware/cloudimage';

const router = Router();
router.use(authorization)
router.get('/desc', sortByDesc)
router.post('/search', sortByTitle);
router.post('/createFolder', createFolder);
router.get('/getNotification', getNotification);
router.get('/:_id',authorization, getNote);
router.get('/delete/:_id',authorization, trashNote);
router.post('/createNote/:folderId', createNote);
router.get('/:noteId/collaborators', getCollaborators)
// router.get('/:noteId/collaborators', authorization, getCollaborators);
router.get('/getAllNote/:folderId',  getAllNotes)
router.post('/invite/:noteId', inviteCollborator);
router.post('/collab/:token', joiValidateCollab, confirmCollaborator);
router.get('/remove/:id', removeCollaborator);
router.get('/admin/remove/:id', adminRemoveCollaborator);
router.post('/upload/:upId',upload, uploadFile);


// import {
//   createNote,
//   getCollaborators,
//   getCollaboratorsNotes,
// } from '../controller/notesController';
// import authorization from '../auth/authorization-passport';

// const router = Router();

// router.post('/:folderId', createNote);
// router.get('/:collaboratorId/notes', authorization, getCollaboratorsNotes);
// router.get('/:noteId/collaborators', authorization, getCollaborators);


module.exports =  router;