import React, { useState } from 'react';
import "./UserSetting.css";
import { Link } from 'react-router-dom';


function UserSetting() {
  const [selectedTabsetting, setSelectedTabSetting] = useState("Account");

  const handleButtonClickSetting = (buttonName) => {
    // e.preventDefault();
    setSelectedTabSetting(buttonName);
  };

  return (
    <div className='container'>
      <div className="user-settings">
        <div className="user-settings-header">
          <h3 id='user_settings'>User settings</h3>
          <div className="user-settings-links d-flex justify-content-between">
            <Link 
            to={'/settings/account'} 
            className="setting-link navbar-brand" 
            id="account-link" 
            onClick={() => handleButtonClickSetting("Account")}
            style={{
              color: selectedTabsetting === "Account" ? "black" : "",
              borderBottomColor: selectedTabsetting === "Account" ? "#0079d3" : "",
              borderWidth: selectedTabsetting === "Account" ? '0 0 2px 0' : '0',
            }}
            >Account</Link>
            <Link 
            to={'/settings/profile'} 
            className="setting-link navbar-brand" 
            id="profile-link" 
            onClick={() => handleButtonClickSetting("Profile")}
            style={{
              color: selectedTabsetting === "Profile" ? "black" : "",
              borderBottomColor: selectedTabsetting === "Profile" ? "#0079d3" : "",
              borderWidth: selectedTabsetting === "Profile" ? '0 0 2px 0' : '0',
            }}
            >Profile</Link>
            <Link 
            to={'/settings/privacy'} 
            className="setting-link navbar-brand" 
            id="safety-privacy-link"
            onClick={() => handleButtonClickSetting("Safety & Privacy")}
            style={{
              color: selectedTabsetting === "Safety & Privacy" ? "black" : "",
              borderBottomColor: selectedTabsetting === "Safety & Privacy" ? "#0079d3" : "",
              borderWidth: selectedTabsetting === "Safety & Privacy" ? '0 0 2px 0' : '0',
            }}
            >Safety & Privacy</Link>
            <Link 
            to={'/settings/feeding'} 
            className="setting-link navbar-brand" 
            id="feed-settings-link"
            onClick={() => handleButtonClickSetting("Feed Settings")}
            style={{
              color: selectedTabsetting === "Feed Settings" ? "black" : "",
              borderBottomColor: selectedTabsetting === "Feed Settings" ? "#0079d3" : "",
              borderWidth: selectedTabsetting === "Feed Settings" ? '0 0 2px 0' : '0',
            }}
            >Feed Settings</Link>
            <Link 
            to={'/settings/notifications'} 
            className="setting-link navbar-brand" 
            id="notifications-link"
            onClick={() => handleButtonClickSetting("Notifications")}
            style={{
              color: selectedTabsetting === "Notifications" ? "black" : "",
              borderBottomColor: selectedTabsetting === "Notifications" ? "#0079d3" : "",
              borderWidth: selectedTabsetting === "Notifications" ? '0 0 2px 0' : '0',
            }}
            >Notifications</Link>
            <Link 
            to={'/settings/email'} 
            className="setting-link navbar-brand" 
            id="emails-link"
            onClick={() => handleButtonClickSetting("Emails")}
            style={{
              color: selectedTabsetting === "Emails" ? "black" : "",
              borderBottomColor: selectedTabsetting === "Emails" ? "#0079d3" : "",
              borderWidth: selectedTabsetting === "Emails" ? '0 0 2px 0' : '0',
            }}
            >Emails</Link>
            <Link 
            to={'/settings/chatandmasseging'} 
            className="setting-link navbar-brand" 
            id="chat-messaging-link"
            onClick={() => handleButtonClickSetting("Chat & Messaging")}
            style={{
              color: selectedTabsetting === "Chat & Messaging" ? "black" : "",
              borderBottomColor: selectedTabsetting === "Chat & Messaging" ? "#0079d3" : "",
              borderWidth: selectedTabsetting === "Chat & Messaging" ? '0 0 2px 0' : '0',
            }}
            >Chat & Messaging</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserSetting