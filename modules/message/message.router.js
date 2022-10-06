import { Router } from "express";
import * as controller from './controller/message.js'
// import {auth} from '../../middlewares/auth.js'


const router = Router()


router.post("/",controller.sendMessage)
router.get("/:id",controller.GetAllMessages)
router.delete(":id",controller.deleteMessage)


export default router