
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
// import Signup from './pages/Signup'
import { SignIn, SignUp } from '@clerk/clerk-react'

function App() {
  

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/signup' element={<SignUp/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    
  )
}

export default App
