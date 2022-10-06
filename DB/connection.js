import mongoose from "mongoose";

const connectDB = async ()=>{
    return mongoose.connect(process.env.DB)
    .then(()=>{
        console.log(`DB conneted ${process.env.DB} `);
    })
    .catch(()=>{
        console.log(`Couldn't connect to DB ${process.env.DB} `);
    })
}
export default connectDB