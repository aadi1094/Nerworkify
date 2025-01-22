import React from 'react'
import { useNavigate } from 'react-router-dom'
import Nav_Home from '../components/Home/Nav_Home'
import Profile from '../components/Profile'




const Home = () => {

  return (
    <div>
        <Nav_Home></Nav_Home>
        <div className="flex">
            <Profile/>
        </div>
       
    </div>
  )
}

export default Home

