import { Router } from 'express'
import siginIn from '../controller/signin'
import router from './changePassword'
import userAuthentication from '../auth/authentication'

router.post('/sigin', userAuthentication, siginIn)
