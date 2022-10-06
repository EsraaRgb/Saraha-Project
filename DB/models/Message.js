import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }



},{timestamps:true})


const MessageModel = mongoose.model('Message',MessageSchema)

export default MessageModel