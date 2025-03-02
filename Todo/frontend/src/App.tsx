import React from 'react'
import {Routes , Route} from 'react-router-dom'
import Home from './Home'
import Login from './pages/login'
import Signup from './pages/signup'
function App() {

  return (
    <main>
      <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>

      </div>
    </main>
  )
}

export default App
