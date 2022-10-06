import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import * as indexRouter from './modules/index.router.js'
import connectDB from './DB/connection.js'
dotenv.config()


const app = express()
app.use(cors())
app.use(express.json())

app.use(`${process.env.BASEURL}/auth`,indexRouter.authRouter)
app.use(`${process.env.BASEURL}/user`,indexRouter.userRouter)
app.use(`${process.env.BASEURL}/message`,indexRouter.messageRouter)

connectDB()
app.listen(process.env.port,()=>{
    console.log(`server is runinng on port ${process.env.port}`);
})
