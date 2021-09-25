import express from 'express';
import { createUsers } from '../controller/signupContoller';

const router = express.Router();

router.post('/signup', createUsers);

export default router
