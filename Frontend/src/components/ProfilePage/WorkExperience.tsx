import React, { useEffect, useState } from 'react'
import useUser from '../../hooks/useUser'
import { axiosInstance } from '../../utils/axios'
import { Trash } from 'lucide-react'

const WorkExperience = () => {
  const {user} = useUser()
 
  const [isAdding, setIsAdding] = useState(false)

  const [formData, setFormData] = useState<any[]>([
    {
        companyRole: "",
        companyName: "",
        expto: "",
        expfrom: ""
    }
  ])

  const onChangeFormData = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    setFormData(formData.map((data, i)=>{
        if( i == index){
            return {
                ...data,
                [e.target.name]:e.target.value
            }
        }else{
            return data
        }
    }))
  }

  const saveExperience = async () => {
    try {
        const experience = formData.filter(data => data.companyRole.length != 0)
        await axiosInstance.put("/user/addexperience", {
            experience
        })
    } catch (error) {
        console.log("Erro in save exp ", error);
        
    }finally{
        setIsAdding(false)
    }
  }

  const deleteExperience=async(id:string)=>{
    try {
        const response = await axiosInstance.put("/user/deleteexperience", {
          experienceId:id
        });
        console.log("Experience deleted successfully:", response.data);
      } catch (error) {
        console.error("Error deleting experience:", error);
      }
  }

  useEffect(()=>{
    if(user && formData.length == 1){
        setFormData([...user.experience, ...formData])
    }
  }, [user])
 
  return (
    <div className='bg-[#003044] w-[80%] mt-4 rounded-lg p-3 text-white '>
       {
        !isAdding &&  <div className='space-y-4'>
        {
            user && user.experience.length > 0 && user.experience.map((ed: any, index: number)=>(
                <div key={index} className=' flex justify-between border-b py-2 '>
                    <div className=''>
                        <h2 className='text-2xl font-semibold'>{ed.companyRole}</h2>
                        <p className='text-gray-400'>{ed.companyName}</p>
                    </div>
                    <div className='flex flex-col items-end'>
                        <div><span>{ed.expfrom}</span> - <span>{ed.expto}</span></div>
                        <div><button onClick={()=>{deleteExperience(ed._id)}} ><Trash className='w-4'/></button></div>
                    </div>
                </div>   
            ))
        }

        {
            user && user.experience.length <= 0 && <div className='text-center italic p-5 text-gray-500'>No Experience Provided</div>
        }

        <div className=''>
            <button onClick={()=> setIsAdding(true)} className=' w-full p-2 rounded-lg border-2 border-white'>
                Add Experience
            </button>
        </div>
        </div>
       }

        {
            isAdding && <div>
                {
                    formData.map((data, index)=>(
                        <div key={index} className='text-black mt-2 space-y-3 border-b py-3'>
                            <div>
                                <label className='text-white text-lg  mr-2' htmlFor="companyRole">Company Role :</label>
                                <input className='p-2 rounded' type='text' name='companyRole' value={data.companyRole} onChange={(e)=>{
                                        onChangeFormData(e, index)
                                }} />
                            </div>
                            <div>
                                <label className='text-white text-lg  mr-2' htmlFor="companyName">Company Name :</label>
                                <input className='p-2 rounded' type='text' name='companyName' value={data.companyName} onChange={(e)=>{
                                        onChangeFormData(e, index)
                                }} />
                            </div>
                            <div className='space-x-3'>
                                <label className='text-white text-lg  mr-2' htmlFor="expfrom">From :</label>
                                <input className='p-2 rounded' type='text' name='expfrom' value={data.expfrom} onChange={(e)=>{
                                        onChangeFormData(e, index)
                                }}  />
                                <label className='text-white text-lg  mr-2' htmlFor="expto">To :</label>
                                <input className='p-2 rounded' type='text'  name='expto' value={data.expto} onChange={(e)=>{
                                        onChangeFormData(e, index)
                                }} />
                            </div>
                        </div>
                    ))
                }

                <div className='p-2 grid grid-cols-2 gap-2'>
                    <button onClick={saveExperience} className='w-full p-2 border-2 border-white rounded-lg'>
                        Save
                    </button>

                    {/* //TODO: delete data when canceled */}
                    <button onClick={()=>{
                        setIsAdding(false)
                    }} className='w-full p-2 border-2 border-white rounded-lg'>
                        Cancel
                    </button>
                </div>
            </div>
        }
    </div>
  )
}

export default WorkExperience