import express, {Request, Response, NextFunction} from "express";
import authorization  from '../auth/authorization-passport'
const router = express.Router();
router.post('/create',authorization, createFolder);

module.exports= router;
// import authorization  from '../auth/authorization-passport'
import { createFolder, getNote, trashNote} from '../controller/folderController';  


router.post('/create',authorization, createFolder);
router.get('/:_id',authorization, getNote);
router.get('/delete/:_id',authorization, trashNote);

module.exports= router; 


 
