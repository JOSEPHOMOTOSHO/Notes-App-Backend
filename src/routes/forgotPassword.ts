import { Router } from 'express';
import { forgotPassword, resetPasswordLink } from '../controller/forgotPassword';

const router = Router();

router.post('/forgotPassword', forgotPassword);

router.get('/emailLink', resetPasswordLink)

export = router;
