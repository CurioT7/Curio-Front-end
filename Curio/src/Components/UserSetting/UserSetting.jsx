import React from 'react'
import "./UserSetting.css"
import { Link } from 'react-router-dom'


function UserSetting() {
  return (
    <div className='container'>
      <div className="user-settings">
        <div className="user-settings-header">
          <h3 id='user_settings'>User settings</h3>
          <div className="user-settings-links d-flex justify-content-between">
            <Link to={'/settings/account'} className="setting-link navbar-brand" id="account-link" >Account</Link>
            <Link to={'/settings/profile'} className="setting-link navbar-brand" id="profile-link" >Profile</Link>
            <Link to={'/settings/privacy'} className="setting-link navbar-brand" id="safety-privacy-link">Safety & Privacy</Link>
            <Link to={'/settings/feeding'} className="setting-link navbar-brand" id="feed-settings-link">Feed Settings</Link>
            <Link to={'/settings/notifications'} className="setting-link navbar-brand" id="notifications-link">Notifications</Link>
            <Link to={'/settings/email'} className="setting-link navbar-brand" id="emails-link">Emails</Link>
            <Link to={'/settings/chatandmasseging'} className="setting-link navbar-brand" id="chat-messaging-link">Chat & Messaging</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserSetting