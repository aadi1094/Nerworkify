import { Bell, BriefcaseBusiness, Globe, House, Menu, MessageSquareText, Rss, Search } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav_Home = () => {
    const [showMenu, setShowMenu] = useState(false)

    const navigate=useNavigate()
    const logout=()=>{
        localStorage.removeItem("token")
        navigate("/")
    }

  return (
    <nav className="bg-indigo-100 text-[#003044] flex items-center p-1 md:p-4 justify-between">
        <Link to='/home'><div className="flex items-center px-5">
            <Rss />
            <h1 className="text-xl font-bold font-sans p-1 hidden md:block">Networkify</h1>
        </div></Link>

        <div className='flex bg-white/70  items-center '>
            <Search className='h-4 w-4 mx-1'/>
            <input className='w-[80%] md:w-full h-8 bg-white/70 p-2 focus:outline-none focus:border-none'placeholder='Search'/>
        </div>

        <div className=" gap-12 hidden md:flex">
            <a href="#" className="flex justify-center flex-col items-center"><House/><h3 className='text-xs'>Home</h3></a>
            <a href="#" className="flex justify-center flex-col items-center"><Globe/><h3 className='text-xs'>My Network</h3></a>
            <a href="#" className="flex justify-center flex-col items-center"><BriefcaseBusiness/><h3 className='text-xs'>Jobs</h3></a>
            <a href="#" className="flex justify-center flex-col items-center"><MessageSquareText/><h3 className='text-xs'>Messaging</h3></a>
            <a href="#" className="flex justify-center flex-col items-center"><Bell/><h3 className='text-xs'>Notifications</h3></a>
        </div>

        <div className="hidden md:flex justify-center items-center px-5">
            <button onClick={logout} className="text-xs md:text-sm p-2 bg-indigo-400 rounded-md text-pretty">
            Logout
            </button>
        </div>

        <button onClick={()=>{
            setShowMenu(!showMenu)
        }} className='block md:hidden'>
            <Menu />
        </button>

        {
            showMenu && <aside className='fixed right-0 top-12 border-l h-full p-4 space-y-2'>
            <a href="#" className="flex gap-2 items-center"><House/><h3 className='text-xs'>Home</h3></a>
            <a href="#" className="flex gap-2 items-center"><Globe/><h3 className='text-xs'>My Network</h3></a>
            <a href="#" className="flex gap-2 items-center"><BriefcaseBusiness/><h3 className='text-xs'>Jobs</h3></a>
            <a href="#" className="flex gap-2 items-center"><MessageSquareText/><h3 className='text-xs'>Messaging</h3></a>
            <a href="#" className="flex gap-2 items-center"><Bell/><h3 className='text-xs'>Notifications</h3></a>
            </aside>
        }
    </nav>

  );
};

export default Nav_Home;
