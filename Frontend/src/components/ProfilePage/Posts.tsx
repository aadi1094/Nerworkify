import { ThumbsUp, Trash } from "lucide-react";
import useUser from "../../hooks/useUser"
import { axiosInstance } from "../../utils/axios";
import axios from "axios";



const Posts = () => {

    const {post,user,getPosts}=useUser()

    const likePost = async (postId: string) => {
            try {
                await axiosInstance.post(`/post/like/${postId}`);
                 getPosts()
            } catch (error) {
                console.log('Error liking post', error);
            }
        };
    
        const unlikePost = async (postId: string) => {
            try {
                await axiosInstance.post(`/post/unlike/${postId}`);
               getPosts()
            } catch (error) {
                console.log('Error unliking post', error);
            }
        };

        const deletePost = async (postId:string)=>{
            try {
                await axiosInstance.delete(`/post/deletepost/${postId}`);
                getPosts()
            } catch (error) {
                console.log("Error in delete post",error);
                
            }
        }
    

  return (
    <div className="mt-10">
      <div className="space-y-3">
        {post &&
          post.map((data, index) => (
            <div key={index} className="bg-[#EEF2FF] p-3">
              <div className="flex items-center">
                <img
                  src={data.author.image}
                  alt="Author"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex flex-col">
                  <h1 className="font-semibold px-4 text">
                    {data.author.username}
                  </h1>
                  <h2 className="text-sm text-gray-400 px-4">
                    {new Date(data.createdAt).toDateString()}
                  </h2>
                </div>
              </div>
              <div className="text-xl p-4">{data.content}</div>
              <div className="flex items-center text-xs justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      data.likes.includes(user._id)
                        ? unlikePost(data._id)
                        : likePost(data._id)
                    }
                    className={`px-4 py-2 rounded ${
                      data.likes.includes(user._id)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    <ThumbsUp className="h-3 w-3" />
                  </button>
                  <span>{data.likes.length}</span>
                </div>

                <button
                  onClick={() => {
                    deletePost(data._id);
                  }}
                  className="bg-red-600 text-yellow-400 rounded-md p-2"
                >
                  <Trash className="h-3 w-3"/>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Posts