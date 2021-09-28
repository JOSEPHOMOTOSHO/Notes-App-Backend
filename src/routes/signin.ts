import { Router } from 'express'
import signIn from '../controller/signin'

const router = Router();

router.post('/sign', signIn)

export default router
