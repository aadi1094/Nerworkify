
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import ProfilePage from './pages/ProfilePage'
import UserProfilePage from './pages/UserProfilePage'
import Network from './pages/Network'
import NotificationsPage from './pages/Notification'
import AddConnection from './pages/AddConnection'
import Jobs from './pages/Jobs'


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
          <Route path="/notifications" element={<NotificationsPage/>} />
          <Route path="/addConnection" element={<AddConnection/>} />
          <Route path="/jobs" element={<Jobs/>} />

        </Routes>
      </BrowserRouter>
    </div>
    
  )
}

export default App
