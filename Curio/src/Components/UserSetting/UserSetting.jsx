import React from 'react'
import "./UserSetting.css"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'


function UserSetting() {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const handleTabChange = (index) => {
    setActiveIndex(index);
    switch(index) {
      case 0:
        navigate('/settings/account');
        break;
      case 1:
        navigate('/settings/profile');
        break;
      case 2:
        navigate('/settings/privacy');
        break;
      case 3:
        navigate('/settings/feeding');
        break;
      case 4:
        navigate('/settings/notifications');
        break;
      case 5:
        navigate('/settings/email');
        break;
      case 6:
        navigate('/settings/chatandmasseging');
        break;
      default:
        break;
    }
  }
  return (
    <div className='container'>
      <div className="user-settings">
        <div className="user-settings-header">
          <h3 id='user_settings'>User settings</h3>
          <div className="user-settings-links d-flex justify-content-between">
          <Tabs selectedIndex={activeIndex} onChange={handleTabChange}>
              <TabList>
                <Tab>Account</Tab>
                <Tab>Profile</Tab>
                <Tab>Safety & Privacy</Tab>
                <Tab>Feed Settings</Tab>
                <Tab>Notifications</Tab>
                <Tab>Emails</Tab>
                <Tab>Chat & Messaging</Tab>
              </TabList>
            </Tabs>
            {/* <Link to={'/settings/account'} className="setting-link navbar-brand" id="account-link" >Account</Link>
            <Link to={'/settings/profile'} className="setting-link navbar-brand" id="profile-link" >Profile</Link>
            <Link to={'/settings/privacy'} className="setting-link navbar-brand" id="safety-privacy-link">Safety & Privacy</Link>
            <Link to={'/settings/feeding'} className="setting-link navbar-brand" id="feed-settings-link">Feed Settings</Link>
            <Link to={'/settings/notifications'} className="setting-link navbar-brand" id="notifications-link">Notifications</Link>
            <Link to={'/settings/email'} className="setting-link navbar-brand" id="emails-link">Emails</Link>
            <Link to={'/settings/chatandmasseging'} className="setting-link navbar-brand" id="chat-messaging-link">Chat & Messaging</Link> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserSetting