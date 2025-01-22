import { useState } from "react"
import { axiosInstance } from "../utils/axios"


const ProfilePage = () => {

    const[image,setImage]=useState<File|null>(null)

    const onChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files){
            setImage(e.target.files[0])
        }
    }

    const uploadImage=async()=>{
        try {
            const formdata=new FormData()
            if(image){
                formdata.append("profile",image)
                await axiosInstance.put("/user/updateprofile",formdata)
            }

        } catch (error) {
            console.log("Error in uploadImage ",error)
        }
    }
  return (
    <div>
        <input type="file" onChange={onChange}/>
        <button onClick={uploadImage}>
            upload
        </button>
    </div>
  )
}

export default ProfilePage