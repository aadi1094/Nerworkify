import Nav_Home from "@/components/Home/Nav_Home"
import useUser from "@/hooks/useUser";
import { axiosInstance } from "@/utils/axios";
import { useEffect, useState } from "react";

const AddConnection = () => {

    const [users,setUsers] = useState<any[]>([]);
    
    const {user}=useUser()

    const getUsers = async()=>{
        try {
            const res= await axiosInstance.get("/user/getusers")
            const filtered=res.data.users.filter((u:any)=>{
                return u._id!==user._id && !user.connections.includes(u._id)
            })
            setUsers(filtered) 
        } catch (error) {
            console.log("Error in getUsers",error)
        }
    }

    useEffect(()=>{
        getUsers()
    },[user])

    const handleConnect = async (id:string): Promise<void> => {
        try {
          await axiosInstance.post('/user/add-connection', { connectionId: id });
          
          window.location.reload()
        } catch (error) {
          console.error('Error connecting with user:', error);
        }
      };

  return (
    <div>
        <Nav_Home/>
        <div className="max-w-2xl mx-auto p-4 ">
            <h1 className="text-3xl font-bold mb-6">Add Connections</h1>
            {users && users.map((user:any)=>(
                <div key={user._id} className="flex items-center justify-between p-4 bg-[#f9f9f9] rounded-xl mb-4">
                    <div className="flex items-center space-x-4">
                        <img src={user.image} alt="" className="w-10 h-10 rounded-full"/>
                        <div>
                            <h2 className="text-xl font-semibold">{user.username}</h2>
                            <p className="text-gray-500">{user.email}</p>
                        </div>
                    </div>
                    <button className="bg-[#4B0082] text-white px-4 py-2 rounded-md" onClick={()=>{
                        handleConnect(user._id)
                    }}>Connect</button>
                </div>
            ))}
        </div>
    </div>
  )
}

export default AddConnection