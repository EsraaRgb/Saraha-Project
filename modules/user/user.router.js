import Router from 'express'
import * as controller from './controller/user.js'
const router = Router()

router.get('/',controller.getAllUsers)

export default router