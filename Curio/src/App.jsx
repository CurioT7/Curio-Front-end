import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "./Pages/Home/Home.jsx";
import ProfSetting from './Pages/ProfileSetting/ProfileSetting.jsx';
import SecurityPrivacy from './Pages/SafetyPrivacySetting/SafetyPrivacy.jsx'; 
import NotificationSetting from './Pages/NotificationSetting/NotificationSetting.jsx';
import ErrorPage from './Components/Error/Error.jsx';
import AccSettings from './Pages/accountSettings/AccountSettings.jsx';
import FeedingSettings from './Pages/feedSettings/FeedingSettings.jsx';
import EmailSettings from './Pages/emailSettings/EmailSettings.jsx';
import ChatAndMessagingSettings from './Pages/ChatAndMassegingSettings/ChatAndMassegingSettings.jsx';
import { ChakraProvider } from '@chakra-ui/react'
import SidebarComponent from './Components/Sidebar/SidebarComponent.jsx';
import ShowFriendInformation from './Components/FriendInformation/ShowFriendInformation.jsx';
import Navbar from './Components/Navbar/Navbar.jsx';
import Error from './Components/Error/Error.jsx';
import ForgotUser from './Components/ForgotUser/ForgotUser.jsx';
import LoginPage from './Components/Login/LoginPage.jsx';
import UserPage from './Pages/UserProfile/UserProfile.jsx'



function App() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const handleHideSidebar = () => {
    setIsSidebarVisible(false);
  }

  return (
    <div>
       <div className='d-flex'>
        <div style={{position: 'fixed', zIndex: '99'}}>
          <SidebarComponent sidebarVisibility={isSidebarVisible} />
        </div>
      </div>
      <ChakraProvider>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/settings/profile" element={<ProfSetting hideSidebar={handleHideSidebar}/>} /> 
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/forgotuser" element={<ForgotUser/>} />
          <Route path="/" element={<Home/>} />
          <Route path="/settings/privacy" element={<SecurityPrivacy hideSidebar={handleHideSidebar}/>} /> 
          <Route path='/settings/notifications' element={<NotificationSetting hideSidebar={handleHideSidebar}/>} />
          <Route path='/settings/account' element={<AccSettings hideSidebar={handleHideSidebar}/>} />
          <Route path='/settings/feeding' element={<FeedingSettings hideSidebar={handleHideSidebar}/>}/>
          <Route path='/settings/email' element={<EmailSettings hideSidebar={handleHideSidebar}/>}/>
          <Route path='/settings/chatandmasseging' element={<ChatAndMessagingSettings hideSidebar={handleHideSidebar}/>}/>
          <Route path='/user/:username' element={<ShowFriendInformation/>} />
        </Routes>
      </ChakraProvider>
    </div>
  )
}

export default App;
