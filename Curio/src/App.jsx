import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from "./Pages/Home/Home.jsx"
import Navbar from './Components/Navbar/Navbar.jsx'
import Error from './Components/Error/Error.jsx'
import Login from './Components/Login/Login.jsx'
import Profile_Setting from "./Components/Profile_Setting/Profile_Setting.jsx"
import ForgotUser from './Components/ForgotUser/ForgotUser.jsx'
import ForgotPass from './Components/ForgotPass/ForgotPass.jsx'
import LoginPage from './Components/Login/Loginpage.jsx'  



function App() {


  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='*' element={<Error/>} />
        <Route path="/login" element={<LoginPage/>} />
      < Route path="/forgotuser" element={<ForgotUser/>} />
      </Routes>
    </div>
  )
}

export default App
