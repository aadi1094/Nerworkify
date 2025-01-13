import User from "../model/user.schema.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const SignUp=async(req,res)=>{
    try {
        const {email,username,password}=req.body

        const hash=await bcrypt.hash(password,12)


        const user=await User.create({
            email,
            password:hash,
            username,
        })

        
        const token= await jwt.sign({
            email:email,
            id:user._id
        },process.env.SECRET_JWT)

        res.status(200).json({
            user,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Error in SignUp"
        })
    }
}

export const Login=async(req,res)=>{
    try {
        const {email,password}=req.body

        const user=await User.findOne({
            email,
        })

        if(!user){
            return res.status(404).json({
                    message:"User not Found"
            })
        }

        const isPasswordMatch= await bcrypt.compare(password,user.password)
        if(!isPasswordMatch){
            return res.status(403).json({
                message:"Incorrect password"
        })
        }
        
        const token= await jwt.sign({
            email:email,
            id:user._id
        },process.env.SECRET_JWT)

        res.status(200).json({
            user,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Error in Login"
        })
    }
}