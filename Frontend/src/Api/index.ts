import axios from "axios"

const API_url=import.meta.env.VITE_API_URL

export const signup= async(formdata:any)=>{
    try {
       const res=await axios.post(`${API_url}/user/signup`,formdata) 
       return res.data
    } catch (error) {
       return {error} 
    }
}

export const login= async(formdata:any)=>{
    try {
       const res=await axios.post(`${API_url}/user/login`,formdata) 
       return res.data
    } catch (error) {
       return {error} 
    }
}