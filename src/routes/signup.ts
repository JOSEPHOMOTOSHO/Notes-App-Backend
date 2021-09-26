import express from 'express';
import { confirmUsers, createUsers } from '../controller/signupContoller';

const router = express.Router();

router.post('/signup', createUsers);

router.post('/confirm', confirmUsers);

export default router
