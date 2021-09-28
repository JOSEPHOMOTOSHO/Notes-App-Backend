import { Router } from 'express'
import signIn from '../controller/signin'

const router = Router();

router.post('/signin', signIn)

export default router
