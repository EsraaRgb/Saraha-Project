import Router from 'express'
import * as controller from './controller/user.js'
import {auth} from '../../middlewares/auth.js'
const router = Router()

router.get('/',controller.getAllUsers)

router.get('/lastseen/:id',controller.getLastSeen)

router.put('/',auth(),controller.updateProfile)

router.get('/:id',auth(),controller.getUserProfile)

router.get('/profile/:id',controller.shareProfile)

router.delete('/:id',auth(),controller.deleteProfile)

router.patch('/',auth(),controller.softDeleteProfile)

router.patch('/password',auth(),controller.updatePassword)

router.post('/password/email',controller.forgetPasswordEmail)

router.patch('/password/:token',controller.forgetPassword)


export default router