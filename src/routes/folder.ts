import express, {Request, Response, NextFunction} from "express";
// import authorization  from '../auth/authorization-passport'
const router = express.Router();
import { createFolder } from '../controller/folderController';  


router.post('/create',createFolder);

module.exports= router; 


