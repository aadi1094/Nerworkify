import { Image } from "lucide-react"
import { useState } from "react"
import { axiosInstance } from "../../utils/axios"

const Postform = () => {
    const [formData, setFormData] = useState({
        role: "",
        link: "",
        content: ""
    })

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const createPost = async () => {
        if (!formData.content ) return

        try {
            await axiosInstance.post("/post/post", {
                content: formData.content,
                role: formData.role,
                link: formData.link,
                media: []
            })
            setFormData({
                role: "",
                link: "",
                content: ""
            })
            window.location.reload()
        } catch (error) {
            console.log("Error in createPost", error)
        }
    }

    return (
        <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 h-fit py-4 rounded-xl border-b-2">
            <div className="w-5/6 max-w-[800px] mx-auto space-y-3">
                <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={onChange}
                    required
                    className="w-full rounded-xl p-2 border border-[#4B0082] mb-2"
                    placeholder="Enter your role"
                />
                <input
                    type="url"
                    name="link"
                    value={formData.link}
                    onChange={onChange}
                    required
                    className="w-full rounded-xl p-2 border border-[#4B0082] mb-2"
                    placeholder="Enter link (optional)"
                />
                <textarea 
                    name="content"
                    value={formData.content}
                    onChange={onChange}
                    className="w-full rounded-xl p-2 border border-[#4B0082]"
                    placeholder="Description"
                />
                <div className="flex justify-end px-2">
                    
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