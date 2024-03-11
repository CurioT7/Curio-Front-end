/**
 * This file renders the React app and attaches it to the DOM.
 * @author @omar-adel1 
 * @global 
 */
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "./Pages/Home/Home.jsx";
import ProfSetting from './Pages/ProfileSetting/ProfileSetting.jsx';
import SecurityPrivacy from './Pages/SafetyPrivacySetting/SafetyPrivacy.jsx'; 
import Navbar from './Components/Navbar/Navbar.jsx';
import ErrorPage from './Components/Error/Error.jsx';

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/settings/profile" element={<ProfSetting/>} /> 
        <Route path="/settings/privacy" element={<SecurityPrivacy/>} /> 
        <Route path='*' element={<ErrorPage/>} />
      </Routes>
    </div>
  )
}

export default App;
