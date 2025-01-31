import Post from "../model/post.schema.js"
import { createNotification } from "./notification.controller.js"

export const createPost=async(req,res)=>{
    try {
        const userId=req.user.id
        const {content,media,link,role}=req.body

        await Post.create({
            content,
            media,
            link,
            role,
            author:userId
        })

        res.status(200).json({
            message:"Post created successfully"
        })
    } catch (error) {
        console.log("Error in createpost",error.message)
        res.status(500).json({
            message:"Error",
            error
        })
    }
}

export const getPost=async(req,res)=>{
    try {

        const post=await Post.find().populate("author")

        res.status(200).json({
            post
        })
    } catch (error) {
        console.log("Error in getpost",error.message)
        res.status(500).json({
            message:"Error",
            error
        })
    }
}

export const likePost = async (req, res) => {
    const postId = req.params.id;
    const userId = req.user.id;

    try {
        const post = await Post.findById(postId);
        if (!post.likes.includes(userId)) {
            post.likes.push(userId);
            await post.save();
            
            // Create notification for post like
            if (post.author.toString() !== userId) {
                await createNotification(post.author, userId, 'LIKE', postId);
            }
            
            res.status(200).json({ message: 'Post liked', post });
        } else {
            res.status(400).json({ message: 'Post already liked' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error liking post', error });
        
    }
};

// Unlike a post
export const unlikePost = async (req, res) => {
    const postId = req.params.id;
    const userId = req.user.id; //
    try {
        const post = await Post.findById(postId);
        if (post.likes.includes(userId)) {
            post.likes = post.likes.filter((id) => id.toString() !== userId);
            await post.save();
            res.status(200).json({ message: 'Post unliked', post });
        } else {
            res.status(400).json({ message: 'Post not liked yet' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error unliking post', error });
    }
};

export const getProfilePost= async(req,res)=>{
    try {
        const userId=req.user.id

        const post=await Post.find({
            author:userId
        }).populate("author")

        res.status(200).json({ message: 'Get profile post',post });
    } catch (error) {
        res.status(500).json({ message: 'Error get profile post', error });
    }
}

export const deletePost= async(req,res)=>{
    try {
        const postId=req.params.id
        
        const deletePost=await Post.findByIdAndDelete(postId)

        res.status(200).json({
            message:"Post deleted successfully",
            deletePost
        })
        
    } catch (error) {
        res.status(500).json({ message: 'Error get delete post', error })
    }
}