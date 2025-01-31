import { useEffect, useState } from 'react';
import { axiosInstance } from '../../utils/axios';
import { Share2, MessageSquare, MoreVertical, Heart, ArrowUpRight } from 'lucide-react';
import useUser from '@/hooks/useUser';

export const Posts = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [userId, setUserId] = useState<string>(''); 
  const {user} = useUser()

  // Get the userId from the token
  useEffect(() => {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
      setUserId(decodedToken.id); // Assuming the token contains the user ID in the "id" field
    }
  }, []);

  const getPosts = async () => {
    try {
      // First get user's connections
      const connections = user.connections;
      
      // Get all posts
      const postsRes = await axiosInstance.get('/post/getpost');
      
      // Filter posts to only show those from connections
      const filteredPosts = postsRes.data.post.filter((post:any) => 
        connections.includes(post.author._id) || post.author._id === userId
      );
      
      setPosts(filteredPosts);
    } catch (error) {
      console.log('Error fetching posts', error);
    }
  };

  const likePost = async (postId: string) => {
    try {
      await axiosInstance.post(`/post/like/${postId}`);
      getPosts(); // Refresh posts after liking
    } catch (error) {
      console.log('Error liking post', error);
    }
  };

  const unlikePost = async (postId: string) => {
    try {
      await axiosInstance.post(`/post/unlike/${postId}`);
      getPosts(); // Refresh posts after unliking
    } catch (error) {
      console.log('Error unliking post', error);
    }
  };

  useEffect(() => {
    getPosts();
  }, [user]);

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
    <div className="bg-[#fff]  backdrop-blur-sm hover:shadow-lg transition-all duration-300 p-6  rounded-xl">
      <div className="flex items-center space-x-2 mb-6">
        <MessageSquare className="w-6 h-6 text-[#6B7280]" />
        <h2 className="text-2xl font-bold text-[#1F2937]">Posts</h2>
      </div>

      <div className="space-y-6">
        {posts.map((data, index) => (
          <div key={index} className="border border-purple-600/50 rounded-lg p-6 hover:bg-[#F3F4F6] transition-all duration-200 ">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={data.author.image || "/default-profile.png"}
                  alt={data.author.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-[#1F2937]">{data.author.username}</h3>
                  <p className="text-sm text-[#6B7280]">{formatDate(data.createdAt)}</p>
                </div>
              </div>
              {data.author._id === userId && (
                <button className="p-2 hover:bg-[#E5E7EB] rounded-full transition-colors">
                  <MoreVertical className="w-5 h-5 text-[#6B7280]" />
                </button>
              )}
            </div>
            

              {data.role && <h1 className='mt-4 font-semibold font-serif text-xl'>Role : {data.role}</h1>}
            <p className=" text-[#374151]">{data.content}</p>
            {data.link && 
            <a href={data.link} target="_blank" className="mt-4 text-blue-800 flex gap-2"><ArrowUpRight/> Apply</a>

            }
            {data.image && (
              <img
                src={data.image}
                alt="Post content"
                className="mt-4 rounded-lg w-full object-cover max-h-96"
              />
            )}

            <div className="flex items-center space-x-6 mt-4 pt-4 border-t border-[#E5E7EB]">
              <button
                onClick={() => data.likes.includes(userId)
                  ? unlikePost(data._id)
                  : likePost(data._id)
                }
                className={`flex items-center space-x-2 group transition-all duration-200
                  ${data.likes.includes(userId)
                    ? 'text-[#EF4444]'
                    : 'text-[#6B7280] hover:text-[#EF4444]'}`}
              >
                <Heart className="w-5 h-5" />
                <span>{data.likes.length > 0 ? data.likes.length : 'Like'}</span>
              </button>
              <button className="flex items-center space-x-2 text-[#6B7280] hover:text-[#3B82F6] transition-colors">
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        )).reverse()}

        {(!posts || posts.length === 0) && (
          <div className="text-center py-10 bg-white rounded-xl shadow">
            <p className="text-[#6B7280] text-lg">No posts yet</p>
          </div>
        )}
      </div>
    </div>
  );
};
