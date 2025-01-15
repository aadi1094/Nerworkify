
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
// import Signup from './pages/Signup'
// import { SignIn, SignUp } from '@clerk/clerk-react'
import Signup from './pages/Signup'
import Home from './pages/Home'


function App() {
  

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/home' element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    
  )
}

export default App
