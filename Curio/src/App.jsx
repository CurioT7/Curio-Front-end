import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from "./Pages/Home/Home.jsx"
import Navbar from './Components/Navbar/Navbar.jsx'
import Error from './Components/Error/Error.jsx'
import Login from './Components/Login/Login.jsx'
import Profile_Setting from "./Components/Profile_Setting/Profile_Setting.jsx"



function App() {


  return (
    <div>
      <Navbar/>
      <Profile_Setting/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='*' element={<Error/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </div>
  )
}

export default App
