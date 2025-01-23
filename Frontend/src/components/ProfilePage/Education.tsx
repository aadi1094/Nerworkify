import React, { useEffect, useState } from 'react'
import useUser from '../../hooks/useUser'
import { axiosInstance } from '../../utils/axios'
import axios from 'axios'
import { Trash } from 'lucide-react'

const Education = () => {
  const {user} = useUser()
 
  const [isAdding, setIsAdding] = useState(false)

  const [formData, setFormData] = useState<any[]>([
    {
        instituteName: "",
        qualification: "",
        to: "",
        from: ""
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

  const saveEducation = async () => {
    try {
        const education = formData.filter(data => data.instituteName.length != 0)
        await axiosInstance.put("/user/addeducation", {
            education
        })
    } catch (error) {
        console.log("Erron in save edu ", error);
        
    }finally{
        setIsAdding(false)
    }
  }

  const deleteEducation=async(id:string)=>{
    try {
        const response = await axiosInstance.put("/user/deleteeducation", {
          educationId:id
        });
        console.log("Education deleted successfully:", response.data);
      } catch (error) {
        console.error("Error deleting education:", error);
      }
  }

  useEffect(()=>{
    if(user && formData.length == 1){
        setFormData([...user.education, ...formData])
    }
  }, [user])
 
  return (
    <div className='bg-[#003044] w-[80%] mt-4 rounded-lg p-3 text-white '>
       {
        !isAdding &&  <div className='space-y-4'>
        {
            user && user.education.length > 0 && user.education.map((ed: any, index: number)=>(
                <div key={index} className=' flex justify-between border-b py-2 '>
                    <div className=''>
                        <h2 className='text-2xl font-semibold'>{ed.instituteName}</h2>
                        <p className='text-gray-400'>{ed.qualification}</p>
                    </div>
                    <div className='flex flex-col items-end'>
                        <div><span>{ed.from}</span> - <span>{ed.to}</span></div>
                        <div><button onClick={()=>{deleteEducation(ed._id)}} ><Trash className='w-4'/></button></div>
                    </div>
                </div>   
            ))
        }

        {
            user && user.education.length <= 0 && <div className='text-center italic p-5 text-gray-500'>No Education Provided</div>
        }

        <div className=''>
            <button onClick={()=> setIsAdding(true)} className=' w-full p-2 rounded-lg border-2 border-white'>
                Add Education
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
                                <label className='text-white text-lg  mr-2' htmlFor="instituteName">Institute :</label>
                                <input className='p-2 rounded' type='text' name='instituteName' value={data.instituteName} onChange={(e)=>{
                                        onChangeFormData(e, index)
                                }} />
                            </div>
                            <div>
                                <label className='text-white text-lg  mr-2' htmlFor="qualification">Qualification :</label>
                                <input className='p-2 rounded' type='text' name='qualification' value={data.qualification} onChange={(e)=>{
                                        onChangeFormData(e, index)
                                }} />
                            </div>
                            <div className='space-x-3'>
                                <label className='text-white text-lg  mr-2' htmlFor="from">From :</label>
                                <input className='p-2 rounded' type='number' min={1500} name='from' value={data.from} onChange={(e)=>{
                                        onChangeFormData(e, index)
                                }}  />
                                <label className='text-white text-lg  mr-2' htmlFor="to">To :</label>
                                <input className='p-2 rounded' type='number' min={1500} name='to' value={data.to} onChange={(e)=>{
                                        onChangeFormData(e, index)
                                }} />
                            </div>
                        </div>
                    ))
                }

                <div className='p-2 grid grid-cols-2 gap-2'>
                    <button onClick={saveEducation} className='w-full p-2 border-2 border-white rounded-lg'>
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

export default Education