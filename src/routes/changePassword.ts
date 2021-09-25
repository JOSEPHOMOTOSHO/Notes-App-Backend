import { Router } from 'express';
import getNewPasswordFromUser  from '../controller/changePassword'
import authorization from '../auth/authorization'

const router = Router();


router.post('/changePassword', getNewPasswordFromUser)


export = router;
