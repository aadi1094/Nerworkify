
import Nav_Home from '../components/Home/Nav_Home'
import Postform from '../components/Home/Postform'
import { Posts } from '../components/Home/Posts'
import Profile from '../components/Profile'




const Home = () => {

  return (
    <div>
        <Nav_Home></Nav_Home>
        <div className="grid grid-cols-12 p-7 gap-2">
            <Profile/>
           <div className='col-span-12 md:col-span-5  max-w-1/2 space-y-5'>
            <Postform/>
            <Posts/>
           </div>
        </div>

       
    </div>
  )
}

export default Home

