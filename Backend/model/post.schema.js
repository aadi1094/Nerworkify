
import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    content:{
        type:String,
        default: ''
    },
    media:{
        type:[String],  
        default: []
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes:{
        type:[mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const Post= mongoose.model('post', postSchema);

export default Post;