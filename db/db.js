
import mongoose from "mongoose";


let isConnected = false

export const connectToDB = async ()=>{

    mongoose.set('strictQuery', true)

    if(isConnected){
        console.log("mongoDB already connected")
        return
    }

    try{

        await mongoose.connect(process.env.MONGODB_URI,{
            dbName: "poc",
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        isConnected = true
    }
    catch(e){
        console.log("error in connecting db",e)
    }

}