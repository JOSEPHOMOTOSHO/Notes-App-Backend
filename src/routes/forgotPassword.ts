import { Router, Request, Response } from 'express';
import {
  processNewPasswordFromUser,
  resetPasswordLink,
  getEmailFromUser,
  displayNewPasswordForm,
} from '../controller/forgotPassword';

const router = Router();

router.get('/recoveryemail', getEmailFromUser);
router.post('/recoveryemail', resetPasswordLink);

router.get('/reset/:token', displayNewPasswordForm);
router.post('/newpassword', processNewPasswordFromUser);



export = router;
