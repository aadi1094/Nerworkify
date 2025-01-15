
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export const authenticate= async(req,res,next)=>{
    const token=req.headers.token
    if(!token){
        res.status(404).json({
            message:"Token not found"
        })
    }

    const data= jwt.decode(token,process.env.SECRET_JWT)
    // console.log(data);
    if(!data){
        res.status(404).json({
            message:"invalid token"
        })
    }

    req.user=data

    next()
  
}