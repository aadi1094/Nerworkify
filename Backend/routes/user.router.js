import express, {  Router } from "express";
import { addEducation, deleteEducation, GetUser, Login, profilePic, SignUp, UpdateInfo } from "../controller/user.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.js";

const userRouter=Router()

userRouter.post("/signup",SignUp)
userRouter.post("/login",Login)
userRouter.get("/getuser",authenticate,GetUser)
userRouter.put("/updateprofile",authenticate,upload.single('profile'),profilePic)
userRouter.put("/updateinfo",authenticate,UpdateInfo)
userRouter.put("/addeducation",authenticate,addEducation)
userRouter.put("/deleteeducation",authenticate,deleteEducation)

export default userRouter