import { Bell, BriefcaseBusiness, Globe, House, Menu, MessageSquareText, Rss, Search, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../utils/axios';
import { useNotifications } from '@/hooks/useNotifications';
import { NotificationButton } from '../Notifications/NotificationButton';

const Nav_Home = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [showResults, setShowResults] = useState(false);
    
    const navigate = useNavigate();
    const { unreadCount } = useNotifications();
    
    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    // Function to fetch users based on search term
    const searchUsers = async (term:any) => {
        try {
            
            const response = await axiosInstance.get(`/user/search?name=${term}`)
            const data =  response.data.user;
            setSearchResults(data);
        } catch (error) {
            console.error('Error searching users:', error);
            setSearchResults([]);
        }
    };

    // Debounce search to avoid too many API calls
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchTerm.length >= 2) {
                searchUsers(searchTerm);
            } else {
                setSearchResults([]);
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    return (
        <nav className="bg-white/80 text-[#4B0082] flex items-center p-1 md:p-4 justify-between relative border-b">
            <Link to='/home'>
                <div className="flex items-center px-5">
                    <Rss />
                    <h1 className="text-xl font-bold font-sans p-1 hidden md:block">Networkify</h1>
                </div>
            </Link>

            <div className='relative flex-1 max-w-md mx-4'>
                <div className='flex bg-white/70 items-center rounded-md'>
                    <Search className='h-4 w-4 mx-1 text-[#4B0082]'/>
                    <input 
                        className='w-full h-8 bg-white/70 p-2 focus:outline-none focus:border-none rounded-md'
                        placeholder='Search users'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setShowResults(true)}
                    />
                </div>

                {/* Search Results Dropdown */}
                {showResults && searchResults.length > 0 && (
                    <div className="absolute w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
                        {searchResults.map((user) => (
                            <Link 
                                key={user._id} 
                                to={`/user/${user._id}`}
                                className="block px-4 py-2 hover:bg-indigo-50 cursor-pointer"
                                onClick={() => {
                                    setShowResults(false);
                                    setSearchTerm('');
                                }}
                            >
                                <div className="flex items-center gap-2">
                                    {user.image && (
                                        <img 
                                            src={user.image} 
                                            alt={user.username} 
                                            className="w-8 h-8 rounded-full"
                                        />
                                    )}
                                    <div>
                                        <p className="font-medium">{user.username}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <div className="gap-12 hidden md:flex">
                <Link to="/home" className="flex justify-center flex-col items-center text-[#4B0082]"><House/><h3 className='text-xs'>Home</h3></Link>
                <Link to="/network" className="flex justify-center flex-col items-center text-[#4B0082]"><Globe/><h3 className='text-xs'>My Network</h3></Link>
                <Link to="/jobs" className="flex justify-center flex-col items-center text-[#4B0082]"><BriefcaseBusiness/><h3 className='text-xs'>Jobs</h3></Link>
                <Link to="/addConnection" className="flex justify-center flex-col items-center text-[#4B0082]"><Users/><h3 className='text-xs'>Add connection</h3></Link>
                <Link to="/notifications" className="text-[#4B0082]"><NotificationButton unreadCount={unreadCount} /></Link>
            </div>

            <div className="hidden md:flex justify-center items-center px-5">
                <button onClick={logout} className="text-xs md:text-sm p-2 bg-[#4B0082] rounded-md text-white">
                    Logout
                </button>
            </div>

            <button onClick={() => setShowMenu(!showMenu)} className='block md:hidden'>
                <Menu />
            </button>

            {showMenu && (
                <aside className='fixed right-0 top-12 border-l h-full p-4 space-y-2 bg-white z-50'>
                    <a href="/home" className="flex gap-2 items-center text-[#4B0082]"><House/><h3 className='text-xs'>Home</h3></a>
                    <a href="/network" className="flex gap-2 items-center text-[#4B0082]"><Globe/><h3 className='text-xs'>My Network</h3></a>
                    <a href="/jobs" className="flex gap-2 items-center text-[#4B0082]"><BriefcaseBusiness/><h3 className='text-xs'>Jobs</h3></a>
                    <a href="/addConnection" className="flex gap-2 items-center text-[#4B0082]"><Users/><h3 className='text-xs'>Messaging</h3></a>
                    <a href="/notifications" className="flex gap-2 items-center text-[#4B0082]"><Bell/><h3 className='text-xs'>Notifications</h3></a>
                </aside>
            )}
        </nav>
    );
};

export default Nav_Home;