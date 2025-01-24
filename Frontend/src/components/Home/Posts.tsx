import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../utils/axios';
import { ThumbsUp } from 'lucide-react';

export const Posts = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [userId, setUserId] = useState<string>(''); // User ID

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
            const res = await axiosInstance.get('/post/getpost');
            setPosts(res.data.post);
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
    }, []);

    return (
        <div className="space-y-3">
            {posts.map((data, index) => (
                <div key={index} className="bg-[#EEF2FF] p-3">
                    <div className="flex items-center">
                        <img
                            src={data.author.image}
                            alt="Author"
                            className="w-10 h-10 rounded-full"
                        />
                        <div className="flex flex-col">
                            <h1 className="font-semibold px-4 text">{data.author.username}</h1>
                            <h2 className="text-sm text-gray-400 px-4">
                                {new Date(data.createdAt).toDateString()}
                            </h2>
                        </div>
                    </div>
                    <div className="text-xl p-4">{data.content}</div>
                    <div className="flex items-center space-x-3 text-xs">
                        <button
                            onClick={() =>
                                data.likes.includes(userId)
                                    ? unlikePost(data._id)
                                    : likePost(data._id)
                            }
                            className={`px-4 py-2 rounded ${
                                data.likes.includes(userId)
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-black'
                            }`}
                        >
                           <ThumbsUp className='h-3 w-3' />
                        </button>
                        <span>{data.likes.length}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};
