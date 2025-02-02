import { Link } from 'react-router-dom';
import { Loader } from 'lucide-react';
import useUser  from '../../hooks/useUser';
import { useEffect } from 'react';


const Profile = () => {
  const {user, revalidate}=useUser()

  useEffect(()=>{
    revalidate()
  },[])

  
  
  return (
    <div className='col-span-3'>
       {
        user ?  <div className="hidden md:block bg-gradient-to-tr from-fuchsia-500 to-purple-900 p-4 shadow-md rounded-md w-72 max-h-fit">
        <div className="flex flex-col items-center">
            <Link to='/profile'><img src={user.image} alt="Profile" className="w-24 h-24 rounded-full border-2 border-white mb-4"/></Link>
            <Link to='/profile'><h2 className="text-xl font-bold text-white">{user.username}</h2></Link>
            <p className="text-white p-2">{user.about}</p>
            <p className="text-white text-sm p-2">{user.address}</p>
            <p className="text-white text-sm ">{user.connections.length} connections</p>
            
        </div>
    </div> : <div className='hidden md:block'><Loader></Loader></div>
       }
    </div>
  )
}

export default Profile