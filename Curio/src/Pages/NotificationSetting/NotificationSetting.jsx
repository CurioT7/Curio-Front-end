import React from 'react';
import "./NotificationSetting.css";
import UserSetting from "../../Components/UserSetting/UserSetting.jsx";
import NotificationsSetting from "../../Components/NotificationsSetting/NotificationsSetting.jsx"; 

function NotificationSetting() {
  return (
    <div>
      <UserSetting />
      <NotificationsSetting/>
    </div>
  );
}

export default NotificationSetting;
