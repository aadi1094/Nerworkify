import axios from "axios";

let token = localStorage.getItem("token")

export const axiosInstance=axios.create({
    baseURL:"http://localhost:3000",
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