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
import NotificationSetting from './Pages/NotificationSetting/NotificationSetting.jsx';
import Navbar from './Components/Navbar/Navbar.jsx';
import ErrorPage from './Components/Error/Error.jsx';
import AccSettings from './Pages/accountSettings/AccountSettings.jsx';
import FeedingSettings from './Pages/feedSettings/FeedingSettings.jsx';
import EmailSettings from './Pages/emailSettings/EmailSettings.jsx';
import ChatAndMessagingSettings from './Pages/ChatAndMassegingSettings/ChatAndMassegingSettings.jsx';
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <div>
      <ChakraProvider>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/settings/profile" element={<ProfSetting/>} /> 
        <Route path="/settings/privacy" element={<SecurityPrivacy/>} /> 
        <Route path='/settings/notifications' element={<NotificationSetting/>} />
        <Route path='/settings/account' element={<AccSettings/>} />
        <Route path='/settings/feeding' element={<FeedingSettings/>}/>
        <Route path='/settings/email' element={<EmailSettings/>}/>
        <Route path='/settings/chatandmasseging' element={<ChatAndMessagingSettings/>}/>
        <Route path='*' element={<ErrorPage/>} />
      </Routes>
      </ChakraProvider>
    </div>
  )
}

export default App;
