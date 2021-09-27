import { Router } from 'express'
import signIn from '../controller/signin'
import userAuthentication from '../auth/authentication'

const router = Router();

router.post('/signin', userAuthentication, signIn)

export default router