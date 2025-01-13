import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Signup = () => {
  return (
    <div className='min-h-screen flex justify-center items-center bg-[#003044]'>
        <Navbar/>
        <div className=' w-96  flex flex-col items-center'>
            <h1 className='text-3xl font-thin items-center text-white'>SignUp</h1>
            <div className='flex flex-col gap-4 my-7 w-full text-white'>
                <input placeholder='Username' className='border-none rounded-xl px-3 py-2 w-full bg-[#1D4757]'/>
                <input placeholder='Email' className='border-none rounded-xl px-3 py-2 w-full bg-[#1D4757] '/>
                <input placeholder='Password' className='border-none rounded-xl px-3 py-2 w-full bg-[#1D4757]'/>
            </div>
            
            <div className='w-full'>
                <button className='bg-[#06DF7D] w-full rounded-lg p-2  '>SignUp</button>
            </div>

            <div className='text-white mt-4 '>
                Already have an account? <Link className='text-[#06DF7D]' to='/'> Login</Link>
            </div>

        </div>
        
            
    </div>
  )
}

export default Signup