import { useEffect, useState } from "react"
import { axiosInstance } from "../utils/axios"

const useUser=()=>{
    const [user,setUser]=useState<any>()

  const getUser= async()=>{
    try {
      const res=await axiosInstance.get("/user/getuser")
      setUser(res.data.user)
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getUser()
  },[])

  return {
    user
  }
}

export default useUser