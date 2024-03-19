import React from 'react';
import { useEffect } from 'react';
import "./NotificationSetting.css";
import UserSetting from "../../Components/UserSetting/UserSetting.jsx";
import Activity from "../../Components/NotificationsSetting/Activity/Activity"; 

function NotificationSetting(props) {

  useEffect(() => {
    props.hideSidebar();
  }, []);

  return (
    <div>
      <UserSetting />
      <div className='container'>
        <div className="notification-settings">
            <div className="notification-settings-section">
            <h2 className='notification-settings-heading'>Notification settings</h2>
            <div className='activity-section'>
                <h3 className='headings-titles text-uppercase fw-bold mb-4'>Activity</h3>    
                    <Activity/> 
            </div>
            </div>
        </div>
    </div>
    </div>
  );
}

export default NotificationSetting;
