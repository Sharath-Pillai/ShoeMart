import mongoose from "mongoose"

const connectDB=async()=>{
    mongoose.connection.on("connected",()=>{
        console.log("MongoDB is connected")
    })
    mongoose.connection.on("error",(err)=>{
        console.log(err)
    })
await mongoose.connect(`${process.env.MONGODB_URI}/ShoeMartBridgeOn`)
}

export default connectDB