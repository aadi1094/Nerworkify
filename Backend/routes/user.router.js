import express, {  Router } from "express";
import { Login, SignUp } from "../controller/user.controller.js";

const userRouter=Router()

userRouter.post("/signup",SignUp)
userRouter.post("/login",Login)

export default userRouter