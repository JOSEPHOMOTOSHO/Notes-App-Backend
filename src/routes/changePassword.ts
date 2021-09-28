import { Router } from 'express';
import changePassword from '../controller/changePassword';

const router = Router();


router.post('/changePassword', changePassword)



export = router;
