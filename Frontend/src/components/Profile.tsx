import React from 'react'
import zoro_profile from '../assets/zoro_profile.png'; 
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <div>
        <div className="bg-indigo-50 p-4 shadow-md rounded-md w-72 m-7 h-full">
            <div className="flex flex-col items-center">
                <Link to='/profile'><img src={zoro_profile} alt="Profile" className="w-24 h-24 rounded-full border-2 border-white mb-4"/></Link>
                <Link to='/profile'><h2 className="text-xl font-bold text-[#1D4757]">Aditya Chawale</h2></Link>
                <p className="text-gray-700 p-2">Web Developer | Data Scientist | DSA & Full-Stack Development | React | Python | Building project & learning every day! 💻</p>
                <p className="text-gray-500 text-sm p-2">Latur, Maharashtra,India</p>
                <p className="text-gray-950 text-sm ">169 connections</p>
                
            </div>
        </div>
    </div>
  )
}

export default Profile