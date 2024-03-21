import React, { useEffect } from 'react';
import "./ProfileSetting.css";
import UserSetting from "../../Components/UserSetting/UserSetting.jsx";
import ProfileInformation from "../../Components/profileSetting/ProfileInformation/ProfileInformation"
import SocialLinksComponent from "../../Components/profileSetting/SocialLinksSection/SocialLinksSection"
import ProfileImageUpload from "../../Components/profileSetting/ProfileImageUpload/ProfileImageUpload"
import ProfileCategory from "../../Components/profileSetting/ProfileCategory/ProfileCategory"
import Advanced from "../../Components/profileSetting/Advanced/Advanced"

function ProfileSetting(props) {

  useEffect(() => {
    props.hideSidebar();
    return () => {
      props.showSidebar();
    }
  }, []);

  return (
    <div>
      <UserSetting />
      <div className="container">
      <div className="customize-profile">
        <div className="customize-profile-section">
          <h2 className='customize-profile-heading'>Customize profile</h2>
          <h3 className='headings-titles text-uppercase fw-bold mb-4'>Profile Information</h3>
          <ProfileInformation/>
          <SocialLinksComponent/>
          <h3 className='headings-titles text-uppercase fw-bold mb-4'>Images</h3>
          <ProfileImageUpload/>
          <h3 className='headings-titles text-uppercase fw-bold mb-4'>Profile category</h3>
          <ProfileCategory/>
          <h3 className='headings-titles text-uppercase fw-bold mb-4'>Advanced</h3>
          <Advanced/>
          <h3 className='headings-titles text-uppercase fw-bold mb-4'>Profile moderation</h3>
          <div className="profile-moderation mb-4">
            For moderation tools please visit our <a href="#">Profile Moderation page</a>
          </div>
        </div>
      </div>
    </div> 
    </div>
  );
}

export default ProfileSetting;
