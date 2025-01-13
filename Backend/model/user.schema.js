import mongoose, { Schema } from "mongoose";

const userSchema =new Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
    image:{
        type:String,
        default:"https://avatar.iran.liara.run/public/18"
    }
})
 const User=mongoose.model("User",userSchema)

 export default User


