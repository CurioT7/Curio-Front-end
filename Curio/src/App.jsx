/**
 * This file renders the React app and attaches it to the DOM.
 * @author @omar-adel1 
 * @global 
 */
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "./Pages/Home/Home.jsx";
import Navbar from './Components/Navbar/Navbar.jsx';
import ErrorPage from './Components/Error/Error.jsx';
import FollowUser from './Components/FollowUser/FollowUser.jsx'

function App() {


  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='*' element={<ErrorPage/>} />
        <Route path="/user" element={<FollowUser/>} /> 
      </Routes>
    </div>
  )
}

export default App
