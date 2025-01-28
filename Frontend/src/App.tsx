
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
// import Signup from './pages/Signup'
// import { SignIn, SignUp } from '@clerk/clerk-react'
import Signup from './pages/Signup'
import Home from './pages/Home'
import ProfilePage from './pages/ProfilePage'
import UserProfilePage from './pages/UserProfilePage'
import Network from './pages/Network'


function App() {
  

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
          <Route path='/user/:id'element={<UserProfilePage/>}/>
          <Route path='/network'element={<Network/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    
  )
}

export default App
