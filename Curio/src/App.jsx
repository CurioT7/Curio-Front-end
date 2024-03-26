import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "./Pages/Home/Home.jsx";
import CreatePost from"./Pages/Create_Post/Createpost.jsx";
import ProfSetting from './Pages/ProfileSetting/ProfileSetting.jsx';
import SecurityPrivacy from './Pages/SafetyPrivacySetting/SafetyPrivacy.jsx'; 
import NotificationSetting from './Pages/NotificationSetting/NotificationSetting.jsx';
import ErrorPage from './Components/Error/Error.jsx';
import AccSettings from './Pages/accountSettings/AccountSettings.jsx';
import FeedingSettings from './Pages/feedSettings/FeedingSettings.jsx';
import EmailSettings from './Pages/emailSettings/EmailSettings.jsx';
import ChatAndMessagingSettings from './Pages/ChatAndMassegingSettings/ChatAndMassegingSettings.jsx';
import SidebarComponent from './Components/Sidebar/SidebarComponent.jsx';
import ShowFriendInformation from './Components/FriendInformation/ShowFriendInformation.jsx';
import NavbarComponent from './Components/Navbar/Navbar.jsx';
import Error from './Components/Error/Error.jsx';
import ForgotUser from './Components/ForgotUser/ForgotUser.jsx';
import LoginPage from './Components/Login/Loginpage.jsx';
import UserPage from './Pages/UserProfile/UserProfile.jsx'
import TestData from './Components/TestingAPI/test.jsx';
import ResetPass from './Components/ForgotPass/ResetPass.jsx';
import { ChakraProvider } from '@chakra-ui/react';



function App() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const handleHideSidebar = () => {
    setIsSidebarVisible(false);
  }

  const handleShowSidebar = () => {
    setIsSidebarVisible(true);
  }

  return (
    <div>
       <div className='d-flex'>
        <div style={{position: 'fixed', zIndex: '99'}}>
          <SidebarComponent sidebarVisibility={isSidebarVisible} />
        </div>
      </div>
      <ChakraProvider>
        <NavbarComponent/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/settings/profile" element={<ProfSetting hideSidebar={handleHideSidebar} showSidebar={handleShowSidebar}/>} /> 
          <Route path="/login" element={<LoginPage hideSidebar={handleHideSidebar} showSidebar={handleShowSidebar}/>} />
          <Route path="/resetpass" element={<ResetPass hideSidebar={handleHideSidebar} showSidebar={handleShowSidebar}/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/" element={<Home/>} />
          <Route path="/settings/privacy" element={<SecurityPrivacy hideSidebar={handleHideSidebar} showSidebar={handleShowSidebar}/>} /> 
          <Route path='/settings/notifications' element={<NotificationSetting hideSidebar={handleHideSidebar} showSidebar={handleShowSidebar}/>} />
          <Route path='/settings/account' element={<AccSettings hideSidebar={handleHideSidebar} showSidebar={handleShowSidebar}/>} />
          <Route path='/settings/feeding' element={<FeedingSettings hideSidebar={handleHideSidebar} showSidebar={handleShowSidebar}/>}/>
          <Route path='/settings/email' element={<EmailSettings hideSidebar={handleHideSidebar} showSidebar={handleShowSidebar}/>}/>
          <Route path='/settings/chatandmasseging' element={<ChatAndMessagingSettings hideSidebar={handleHideSidebar} showSidebar={handleShowSidebar}/>}/>
          <Route path='/user/:username' element={<ShowFriendInformation/>} />
          <Route path='/user/CreatePost' element={<CreatePost hideSidebar={handleHideSidebar} showSidebar={handleShowSidebar}/>} />
          <Route path='/user/:username' element={<UserPage/>} />
        </Routes>
      </ChakraProvider>
    </div>
  )
}

export default App;
