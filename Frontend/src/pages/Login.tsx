import React, { useState } from 'react'
import { Link, Links, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { login } from '../Api'
// import { SignIn } from '@clerk/clerk-react'

const Login = () => {
    const navigate=useNavigate()
    const[formdata,setFormdata]=useState({
        email:"",
        password:""
    })

    const onChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        setFormdata({
            ...formdata,
            [e.target.name]:e.target.value
        })
      }

    const handleSubmit=async()=>{
        const res=await login(formdata)
        if(res.error){
            alert("Something went wrong")
        
        }else{
            const token=res.token;
            localStorage.setItem("token",token)
            navigate("/home")
    
        }
        
      }
    

  return (
    <div className='min-h-screen flex justify-center items-center bg-[#003044]'>
        <Navbar/>
        <div className=' w-96  flex flex-col items-center'>
            <h1 className='text-3xl font-thin items-center text-white'>Login</h1>
            <div className='flex flex-col gap-4 mt-7 w-full text-white'>
                <input placeholder='Email'name="email" onChange={onChange} className='border-none rounded-xl px-3 py-2 w-full bg-[#1D4757] '/>
                <input placeholder='Password'name="password" onChange={onChange} className='border-none rounded-xl px-3 py-2 w-full bg-[#1D4757]'/>
            </div>
            <div className='flex justify-between w-full p-2 items-center my-5'>
                <div className='text-white flex gap-2'>
                    <input type="checkbox" />Remember Me
                </div>
                <Link className='text-[#06DF7D] text-sm' to='/'>Forgot Password?</Link>
            </div>

            <div className='w-full'>
                <button onClick={handleSubmit} className='bg-[#06DF7D] w-full rounded-lg p-2  '>Login</button>
            </div>

            <div className='text-white mt-4 '>
                Don't have an account? <Link className='text-[#06DF7D]' to='/signup'> SignUp</Link>
            </div>
        </div>
        {/* <SignIn forceRedirectUrl={"/home"} signUpForceRedirectUrl={"/home"} signUpUrl='/signup'/> */}
        
            
    </div>
  )
}

export default Login