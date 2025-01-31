
import { ThumbsUp, Trash, MessageCircle, Share2, MessageSquare, ArrowUpLeft, ArrowUpRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import useUser from '../../hooks/useUser';
import { axiosInstance } from '../../utils/axios';

const Posts = () => {
  const { post, user, getPosts } = useUser();

  const likePost = async (postId: string) => {
    try {
      await axiosInstance.post(`/post/like/${postId}`);
      getPosts();
    } catch (error) {
      console.log('Error liking post', error);
    }
  };

  const unlikePost = async (postId: string) => {
    try {
      await axiosInstance.post(`/post/unlike/${postId}`);
      getPosts();
    } catch (error) {
      console.log('Error unliking post', error);
    }
  };

  const deletePost = async (postId: string) => {
    try {
      await axiosInstance.delete(`/post/deletepost/${postId}`);
      getPosts();
    } catch (error) {
      console.log("Error in delete post", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <MessageSquare className="w-6 h-6 text-violet-600" />
          <h2 className="text-2xl font-bold text-gray-800">Posts</h2>
        </div>

        <div className="space-y-6">
          {post && post.length > 0 ? (
            post.map((data, index) => (
              <div 
                key={index} 
                className="border border-violet-100 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 bg-white"
              >
                {/* Post Header */}
                <div className="p-4 border-b border-violet-50">
                  <div className="flex items-center space-x-4">
                    <div className="relative group">
                      <img
                        src={data.author.image}
                        alt={data.author.username}
                        className="w-12 h-12 rounded-full object-cover border-2 border-violet-200 transition-all duration-300 group-hover:border-violet-400"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 hover:text-violet-700 transition-colors duration-200">
                        {data.author.username}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {formatDate(data.createdAt)}
                      </p>
                    </div>
                    {data.author._id === user._id && (
                      <button
                        onClick={() => deletePost(data._id)}
                        className="p-2 hover:bg-red-50 rounded-full group transition-all duration-200"
                        aria-label="Delete post"
                      >
                        <Trash className="h-5 w-5 text-gray-400 group-hover:text-red-500" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-6">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {data.content}
                  </p>
                  <a href={data.link} target="_blank" className="mt-4 text-blue-800 flex gap-2"><ArrowUpRight/> Apply</a>
                </div>

                {/* Post Actions */}
                <div className="px-6 py-4 bg-gradient-to-r from-violet-50/50 to-fuchsia-50/50">
                  <div className="flex items-center space-x-6">
                    <button
                      onClick={() => data.likes.includes(user._id)
                        ? unlikePost(data._id)
                        : likePost(data._id)
                      }
                      className={`flex items-center space-x-2 group transition-all duration-200
                        ${data.likes.includes(user._id)
                          ? 'text-violet-600'
                          : 'text-gray-500 hover:text-violet-600'
                        }`}
                      aria-label={data.likes.includes(user._id) ? 'Unlike post' : 'Like post'}
                    >
                      <ThumbsUp className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                      <span className="text-sm font-medium">
                        {data.likes.length > 0 ? `${data.likes.length} ${data.likes.length === 1 ? 'like' : 'likes'}` : 'Like'}
                      </span>
                    </button>

                    <button 
                      className="flex items-center space-x-2 text-gray-500 hover:text-violet-600 transition-all duration-200 group"
                      aria-label="Comment on post"
                    >
                      <MessageCircle className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                      <span className="text-sm font-medium">Comment</span>
                    </button>

                    <button 
                      className="flex items-center space-x-2 text-gray-500 hover:text-violet-600 transition-all duration-200 group"
                      aria-label="Share post"
                    >
                      <Share2 className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                      <span className="text-sm font-medium">Share</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 px-6 bg-gradient-to-r from-violet-50 to-fuchsia-50 rounded-xl border border-violet-100">
              <MessageSquare className="w-12 h-12 text-violet-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg font-medium">No posts yet</p>
              <p className="text-gray-500 mt-2">Be the first one to share something!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Posts;