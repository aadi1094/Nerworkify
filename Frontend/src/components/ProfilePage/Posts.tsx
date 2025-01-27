import React from 'react';
import { ThumbsUp, Trash, MessageCircle, Share2 } from 'lucide-react';
import useUser from '../../hooks/useUser';
import { axiosInstance } from '../../utils/axios';

const Posts = () => {
  const { post, user, getPosts } = useUser();

  const likePost = async (postId:string) => {
    try {
      await axiosInstance.post(`/post/like/${postId}`);
      getPosts();
    } catch (error) {
      console.log('Error liking post', error);
    }
  };

  const unlikePost = async (postId:string) => {
    try {
      await axiosInstance.post(`/post/unlike/${postId}`);
      getPosts();
    } catch (error) {
      console.log('Error unliking post', error);
    }
  };

  const deletePost = async (postId:string) => {
    try {
      await axiosInstance.delete(`/post/deletepost/${postId}`);
      getPosts();
    } catch (error) {
      console.log("Error in delete post", error);
    }
  };

  const formatDate = (dateString:string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 space-y-6 px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Posts</h2>
      
      <div className="space-y-6">
        {post && post.map((data, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Post Header */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <img
                  src={data.author.image}
                  alt={data.author.username}
                  className="w-12 h-12 rounded-full border-2 border-gray-200 object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">
                    {data.author.username}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {formatDate(data.createdAt)}
                  </p>
                </div>
                {data.author._id === user._id && (
                  <button
                    onClick={() => deletePost(data._id)}
                    className="p-2 hover:bg-red-50 rounded-full group transition-colors duration-200"
                  >
                    <Trash className="h-5 w-5 text-gray-400 group-hover:text-red-500" />
                  </button>
                )}
              </div>
            </div>

            {/* Post Content */}
            <div className="p-4">
              <p className="text-gray-800 text-lg leading-relaxed">
                {data.content}
              </p>
            </div>

            {/* Post Actions */}
            <div className="px-4 py-3 bg-gray-50 flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => data.likes.includes(user._id) 
                    ? unlikePost(data._id) 
                    : likePost(data._id)
                  }
                  className={`flex items-center space-x-2 group transition-colors duration-200
                    ${data.likes.includes(user._id) 
                      ? 'text-blue-500' 
                      : 'text-gray-500 hover:text-blue-500'}`}
                >
                  <ThumbsUp className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    {data.likes.length > 0 ? data.likes.length : 'Like'}
                  </span>
                </button>

                <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors duration-200">
                  <MessageCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">Comment</span>
                </button>

                <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors duration-200">
                  <Share2 className="h-5 w-5" />
                  <span className="text-sm font-medium">Share</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {(!post || post.length === 0) && (
          <div className="text-center py-10 bg-white rounded-xl shadow">
            <p className="text-gray-500 text-lg">No posts yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;