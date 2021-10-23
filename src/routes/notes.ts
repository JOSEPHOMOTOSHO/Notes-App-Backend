
import express, {Request,Response, Router } from 'express';
import authorization from '../auth/authorization-passport';
import { createNote, getTrash, getCollaborators, getCollaboratorsNotes, sortByDesc, sortByTitle, getAllNotes , editNotes } from '../controller/notes-Controller';
import { createFolder, getNote, trashNote, getFolder, restoreNote, permanentlyDeleteNote} from '../controller/folder-Controller'; 
import { confirmCollaborator, inviteCollborator, removeCollaborator,  uploadFile, getNotification, adminRemoveCollaborator } from '../controller/collaborators-Controller';
import { joiValidateCollab } from '../middleware/joi';
import { upload } from '../middleware/cloudimage';


const router = Router();
router.post('/collab/:token', joiValidateCollab, confirmCollaborator);
router.use(authorization)
declare module "express" {
    interface Request {
        user?: any,
        isAuthenticated?:any,
    }
  }
router.get('/tests', (req:Request, res)=>{
    // let id = req.user.id
    res.send(req.user.id)
})
router.get('/gettrash', getTrash);
router.get('/getfolder', getFolder);
router.get('/desc', sortByDesc)
router.post('/search', sortByTitle);
router.post('/createFolder', createFolder);//authorization required
router.get('/getNotification', getNotification);
router.get('/:_id', getNote);
router.put('/editnote/:noteId', editNotes);
router.get('/delete/:_id', trashNote);
router.get('/restoredelete/:_id', restoreNote);
router.get('/permanentdelete/:_id', permanentlyDeleteNote);
router.post('/createNote/:folderId', createNote);
router.get('/:noteId/collaborators', getCollaborators);
router.get('/collaborators/notes', getCollaboratorsNotes);  
router.get('/getAllNote/:folderId',  getAllNotes)
router.post('/invite/:noteId', inviteCollborator);

router.get('/remove/:id', removeCollaborator);
router.post('/admin/remove/:id', adminRemoveCollaborator);
router.post('/upload/:upId',upload, uploadFile);


module.exports =  router;