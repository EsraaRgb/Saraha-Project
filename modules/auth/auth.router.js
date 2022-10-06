import Router from 'express'
import * as controller from './controller/auth.js'
import {auth} from '../../middlewares/auth.js'
const router = Router()

router.post('/signup',controller.signUp)
router.get('/confirmEmail/:token',controller.confirmEmail)
router.post('/signin',controller.signIn)
router.post('/signout',auth(),controller.signout)

export default router