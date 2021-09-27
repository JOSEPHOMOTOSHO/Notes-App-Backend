import express from 'express';
import { confirmUsers, createUsers } from '../controller/signupContoller';

const router = express.Router();

router.post('/signup', createUsers);

router.get('/confirm/:token', confirmUsers);

export default router
