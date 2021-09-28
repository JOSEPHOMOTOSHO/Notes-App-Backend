import { Router } from 'express';
import changePassword from '../controller/changePassword';
import authorization from '../auth/authorization-passport';

const router = Router();


router.post('/changePassword', authorization, changePassword)



export = router;
