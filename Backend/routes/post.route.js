
import express from "express"
import { authenticate } from "../middleware/auth.middleware.js";
import { createPost, getPost, likePost, unlikePost } from "../controller/post.controller.js"

const postRouter=express.Router()

postRouter.post("/post",authenticate,createPost)
postRouter.get("/getpost",getPost)
postRouter.post('/like/:id',authenticate, likePost);
postRouter.post('/unlike/:id',authenticate, unlikePost);

export default postRouter