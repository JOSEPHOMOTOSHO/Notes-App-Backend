import { Router, Request, Response } from 'express';
import {
  processNewPasswordFromUser,
  resetPasswordLink,
  getEmailFromUser,
  displayNewPasswordForm,
} from '../controller/forgotPassword';

const router = Router();

router.get('/recovery-email', getEmailFromUser);
router.post('/recovery-email', resetPasswordLink);

router.get('/reset/:token', displayNewPasswordForm);
router.post('/reset', processNewPasswordFromUser);



export = router;
