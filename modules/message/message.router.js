import { Router } from "express";
import * as controller from './controller/message.js'
import {auth} from '../../middlewares/auth.js'


const router = Router()


router.get("/",auth(),controller.GetAllMessages)
router.post("/:id",controller.sendMessage)
router.delete("/:id",auth(),controller.deleteMessage)


export default router