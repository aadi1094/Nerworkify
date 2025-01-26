import { useEffect, useState } from "react"
import { axiosInstance } from "../utils/axios"

const useUser=()=>{
    const [user,setUser]=useState<any>()
    const [post,setPost]=useState<any[]>()


  const getUser= async()=>{
    try {
      const res=await axiosInstance.get("/user/getuser")
      setUser(res.data.user)
      
    } catch (error) {
      console.log(error)
    }
  }

  const getPosts=async()=>{
    try {
      const res=await axiosInstance.get("/post/getprofilepost")
      setPost(res.data.post)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getUser()
  },[])

  useEffect(()=>{
    getPosts()
  },[user])

  return {
    user,
    post,
    getPosts
  }
}

export default useUser