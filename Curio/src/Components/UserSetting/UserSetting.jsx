import React, { useState, useEffect } from 'react';
import "./UserSetting.css";
import { Link } from 'react-router-dom';

function UserSetting() {
  const [activeLink, setActiveLink] = useState('/settings/account');

  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, []);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className='container' style={{marginTop:'4rem'}}>
      <div className="user-settings">
        <div className="user-settings-header">
          <h3 id='user_settings'>User settings</h3>
          <div className="user-settings-links d-flex justify-content-between">
            <Link 
              to={'/settings/account'} 
              className={`setting-link navbar-brand ${activeLink === '/settings/account' ? 'active' : ''}`} 
              onClick={() => handleLinkClick('/settings/account')}
              id="account-link" 
            >Account</Link>
            <Link 
              to={'/settings/profile'} 
              className={`setting-link navbar-brand ${activeLink === '/settings/profile' ? 'active' : ''}`} 
              onClick={() => handleLinkClick('/settings/profile')}
              id="account-link" 
            >Profile</Link>
            <Link 
            to={'/settings/privacy'} 
            className={`setting-link navbar-brand ${activeLink === '/settings/privacy' ? 'active' : ''}`} 
            onClick={() => handleLinkClick('/settings/privacy')} 
            id="safety-privacy-link"
            >Safety & Privacy</Link>
            <Link 
            to={'/settings/feeding'} 
            className={`setting-link navbar-brand ${activeLink === '/settings/feeding' ? 'active' : ''}`} 
            onClick={() => handleLinkClick('/settings/feeding')} 
            id="feed-settings-link"
            >Feed Settings</Link>
            <Link 
            to={'/settings/notifications'} 
            className={`setting-link navbar-brand ${activeLink === '/settings/notifications' ? 'active' : ''}`} 
            onClick={() => handleLinkClick('/settings/notifications')} 
            id="notifications-link"
            >Notifications</Link>
            <Link 
            to={'/settings/email'} 
            className={`setting-link navbar-brand ${activeLink === '/settings/email' ? 'active' : ''}`} 
            onClick={() => handleLinkClick('/settings/email')} 
            id="emails-link"
            >Emails</Link>
            <Link 
            to={'/settings/chatandmasseging'} 
            className={`setting-link navbar-brand ${activeLink === '/settings/chatandmasseging' ? 'active' : ''}`} 
            onClick={() => handleLinkClick('/settings/chatandmasseging')} 
            id="chat-messaging-link"
            >Chat & Messaging</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSetting;
