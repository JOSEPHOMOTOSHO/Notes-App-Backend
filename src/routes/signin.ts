import { Router } from 'express'
import signIn from '../controller/signin'
//import userAuthentication from '../auth/authentication'

const router = Router();

router.post('/signin', signIn)

export default router
