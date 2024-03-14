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
import SidebarComponent from './Components/Sidebar/SidebarComponent.jsx';
import ShowFriendInformation from './Components/FriendInformation/ShowFriendInformation.jsx';

function App() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const handleHideSidebar = () => {
    setIsSidebarVisible(false);
  }

  return (
    <div>
      <div className='d-flex'>
        <div style={{position: 'fixed'}}>
          <SidebarComponent sidebarVisibility={isSidebarVisible} />
        </div>
      </div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/settings/profile" element={<ProfSetting hideSidebar={handleHideSidebar}/>} /> 
        <Route path="/settings/privacy" element={<SecurityPrivacy hideSidebar={handleHideSidebar}/>} /> 
        <Route path='/settings/notifications' element={<NotificationSetting hideSidebar={handleHideSidebar}/>} />
        <Route path='/user' element={<ShowFriendInformation/>} />
        <Route path='*' element={<ErrorPage/>} />
      </Routes>
    </div>
  )
}

export default App;
