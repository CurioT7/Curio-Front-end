import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "./Pages/Home/Home.jsx";
import ProfSetting from './Pages/ProfileSetting/ProfileSetting.jsx';
import SecurityPrivacy from './Pages/SafetyPrivacySetting/SafetyPrivacy.jsx'; 
import NotificationSetting from './Pages/NotificationSetting/NotificationSetting.jsx';
import Navbar from './Components/Navbar/Navbar.jsx';
import ErrorPage from './Components/Error/Error.jsx';
import Navbar from './Components/Navbar/Navbar.jsx'
import Error from './Components/Error/Error.jsx'
import Login from './Components/Login/Login.jsx'
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
        <Route path="/" element={<Home/>} />
        <Route path="/settings/profile" element={<ProfSetting/>} /> 
        <Route path="/settings/privacy" element={<SecurityPrivacy/>} /> 
        <Route path='/settings/notifications' element={<NotificationSetting/>} />
        <Route path='*' element={<ErrorPage/>} />
        {/* <Navbar/> */}
      </Routes>
    </div>
  )
}

export default App;
