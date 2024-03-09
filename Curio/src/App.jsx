import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from "./Pages/Home/Home.jsx"
import Navbar from './Components/Navbar/Navbar.jsx'
import Error from './Components/Error/Error.jsx'
import { Link } from 'react-router-dom';
import SidebarComponent from './Components/Sidebar/SidebarComponent.jsx';
import Profile_Setting from "./Components/Profile_Setting/Profile_Setting.jsx"



function App() {
  return (
    <div>
      <div className='d-flex justify-content-between'>
        <SidebarComponent />
        <Navbar/>
        <Profile_Setting/>
      </div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='*' element={<Error/>} />
      </Routes>
    </div>
  )
}

export default App