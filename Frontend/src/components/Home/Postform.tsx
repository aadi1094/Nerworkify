import {  Image } from "lucide-react"
import { useState } from "react"
import { axiosInstance } from "../../utils/axios"
import { Posts } from "./Posts"

const Postform = () => {
    const [content,setContent]=useState("")

    const onChange=(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        setContent(e.target.value)
    }

    const createPost=async()=>{
        if(!content) return 
        try {
            await axiosInstance.post("/post/post",{
                content,
                media:[]
            })
            setContent("")

        } catch (error) {
            console.log("Error in createPost",error)
        }
    }

  return (
    <div className="bg-[#EEF2FF]  h-fit py-4 rounded-md border-b-2">
        <div className="w-5/6 max-w-[800px] mx-auto space-y-3">
            <textarea value={content} onChange={onChange} className=" w-full rounded-xl p-2" placeholder="Start your post"/>
            <div className="flex justify-between px-2">
                <button className="bg-blue-200  rounded-md p-2">
                    <Image/>
                </button>
                <button className="bg-sky-600 text-white font-semibold  rounded-md p-2 px-4" onClick={createPost}>Post</button>
            </div>
            
        </div>
    </div>
  )
}

export default Postform