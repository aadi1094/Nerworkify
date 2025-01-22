import express, {  Router } from "express";
import { GetUser, Login, profilePic, SignUp } from "../controller/user.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.js";

const userRouter=Router()

userRouter.post("/signup",SignUp)
userRouter.post("/login",Login)
userRouter.get("/getuser",authenticate,GetUser)
userRouter.put("/updateprofile",authenticate,upload.single('profile'),profilePic)

export default userRouter