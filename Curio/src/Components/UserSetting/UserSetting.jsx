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
            <a href="#" className="setting-link navbar-brand" id="account-link">Account</a>
            <Link to={'/settings/profile'} className="setting-link navbar-brand" id="profile-link" >Profile</Link>
            <Link to={'/settings/privacy'} className="setting-link navbar-brand" id="safety-privacy-link">Safety & Privacy</Link>
            <a href="#" className="setting-link navbar-brand" id="feed-settings-link">Feed Settings</a>
            <Link to={'/settings/notifications'} className="setting-link navbar-brand" id="notifications-link">Notifications</Link>
            <a href="#" className="setting-link navbar-brand" id="emails-link">Emails</a>
            <a href="#" className="setting-link navbar-brand" id="chat-messaging-link">Chat & Messaging</a>
          </div>
        </div><hr/>
      </div>
    </div>
  )
}

export default UserSetting