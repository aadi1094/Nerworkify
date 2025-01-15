import React from 'react';
import logo from '../assets/Logo.png'; 
import { Bell, BriefcaseBusiness, BriefcaseConveyorBeltIcon, Globe, House, MessageSquareText, Rss, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Nav_Home = () => {

    const navigate=useNavigate()
    const logout=()=>{
        localStorage.removeItem("token")
        navigate("/")
    }

  return (
    <nav className="bg-indigo-100 text-[#003044] flex items-center p-4 justify-between">
        <div className="flex items-center px-5">
            <Rss />
            <h1 className="text-xl font-bold font-sans p-1">Networkify</h1>
        </div>

        <div className='flex bg-white/70  items-center '>
            <Search className='h-6 w-6 pl-2'/>
            <input className='w-60 h-8 bg-white/70 p-2 focus:outline-none focus:border-none'placeholder='Search'/>
        </div>

        <div className="flex gap-12 ">
            <a href="#" className="flex justify-center flex-col items-center"><House/><h3 className='text-xs'>Home</h3></a>
            <a href="#" className="flex justify-center flex-col items-center"><Globe/><h3 className='text-xs'>My Network</h3></a>
            <a href="#" className="flex justify-center flex-col items-center"><BriefcaseBusiness/><h3 className='text-xs'>Jobs</h3></a>
            <a href="#" className="flex justify-center flex-col items-center"><MessageSquareText/><h3 className='text-xs'>Messaging</h3></a>
            <a href="#" className="flex justify-center flex-col items-center"><Bell/><h3 className='text-xs'>Notifications</h3></a>
        </div>

        <div className="flex justify-center items-center px-5">
            <button onClick={logout} className="p-2 bg-indigo-400 rounded-md text-pretty">
            Logout
            </button>
        </div>
    </nav>

  );
};

export default Nav_Home;
