import axios from "axios";

let token = localStorage.getItem("token")
const API_URL = process.env.VITE_API_URL
export const axiosInstance=axios.create({
    baseURL:API_URL,
    headers:{
        token
    }
})

export const setToken = (token:string) => {
    if (token) {
        axiosInstance.defaults.headers.common["token"] = `${token}`;
      } else {
        delete axiosInstance.defaults.headers.common["token"];
      }
}