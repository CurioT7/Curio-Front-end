import React, { useEffect } from 'react';
import "./ProfileSetting.css";
import UserSetting from "../../Components/UserSetting/UserSetting.jsx";
import Profile from "../../Components/profileSetting/ProfileSetting.jsx"; 

function ProfileSetting(props) {

  useEffect(() => {
    props.hideSidebar();
  }, []);

  return (
    <div>
      <UserSetting />
      <Profile /> 
    </div>
  );
}

export default ProfileSetting;
