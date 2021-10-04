import express from 'express';
import { confirmCollab, postCollab, removeCollab, uploadFile } from '../controller/collab';
import { joiValidateCollab } from '../middleware/joi';
import  authorization  from '../auth/authorization-passport'
import { upload } from '../middleware/cloudimage';

const router = express.Router();

router.use(authorization)

router.post('/:noteId', postCollab);

router.post('/collab/:token', joiValidateCollab, confirmCollab);

router.get('/remove/:id', removeCollab);

router.post('/upload/:upId',upload, uploadFile);

module.exports = router;

