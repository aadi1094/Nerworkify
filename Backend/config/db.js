import mongoose from "mongoose";

const connectDB=async()=>{
    try {
        if(!process.env.MONGO_DB){
            console.log("Provide a database url")
            return 
        }
      
        await mongoose.connect(process.env.MONGO_DB)
        console.log("Connected to database")

    } catch (error) {
        console.log(error)
    }
}

export default connectDB