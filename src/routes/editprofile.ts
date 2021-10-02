import express from 'express';
import { upload } from '../middleware/cloudimage'
import { updateUser } from '../controller/updateprofile';

const router = express.Router();

router.put('/:_id', upload, updateUser) 
  //jwt middleware???
export default router