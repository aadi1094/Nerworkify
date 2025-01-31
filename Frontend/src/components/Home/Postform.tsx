import { Image } from "lucide-react"
import { useState } from "react"
import { axiosInstance } from "../../utils/axios"

const Postform = () => {
    const [formData, setFormData] = useState({
        content: "",
        link: ""
    })

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const createPost = async () => {
        if (!formData.content) return

        try {
            await axiosInstance.post("/post/post", {
                content: formData.content,
                link: formData.link,
                media: []
            })
            setFormData({ content: "", link: "" })
            window.location.reload()
        } catch (error) {
            console.log("Error in createPost", error)
        }
    }

    return (
        <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 h-fit py-4 rounded-xl border-b-2">
            <div className="w-5/6 max-w-[800px] mx-auto space-y-3">
                <textarea 
                    value={formData.content} 
                    name="content"
                    onChange={onChange} 
                    className="w-full rounded-xl p-2 border border-[#4B0082]" 
                    placeholder="Start your post"
                />
                <input 
                    type="url"
                    value={formData.link}
                    name="link"
                    onChange={onChange}
                    className="w-full rounded-xl p-2 border border-[#4B0082]"
                    placeholder="Add a link (optional)"
                />
                <div className="flex justify-between px-2">
                    <button className="bg-blue-200 rounded-md p-2">
                        <Image />
                    </button>
                    <button 
                        className="bg-[#6D28D9] text-white font-semibold rounded-md p-2 px-4" 
                        onClick={createPost}
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Postform