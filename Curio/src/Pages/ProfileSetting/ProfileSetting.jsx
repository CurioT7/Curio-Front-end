import React, { useEffect, useState} from 'react';
import "./ProfileSetting.css";
import UserSetting from "../../Components/UserSetting/UserSetting.jsx";
import ProfileInformation from "../../Components/profileSetting/ProfileInformation/ProfileInformation";
import SocialLinksComponent from "../../Components/profileSetting/SocialLinksSection/SocialLinksSection";
import ProfileImageUpload from "../../Components/profileSetting/ProfileImageUpload/ProfileImageUpload";
import ProfileCategory from "../../Components/profileSetting/ProfileCategory/ProfileCategory";
import Advanced from "../../Components/profileSetting/Advanced/Advanced";
import { useNavigate } from 'react-router-dom';
import { fetchUserDataFromBackend } from '../../Components/UserSetting/UserSettingsEndPoints.js';

function ProfileSetting(props) {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({ displayName: '', about: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
    props.hideSidebar();
    fetchAndSetData();
    return () => {
      props.showSidebar();
    }
  }, []);

    async function fetchAndSetData() {
        const data = await fetchUserDataFromBackend();
        if (data) {
          setProfileData({
            displayName: data.displayName,
            about: data.about
          });
        }
    }


  return (
    <div>
      <UserSetting />
      <div className="container">
      <div className="customize-profile">
        <div className="customize-profile-section">
          <h2 className='customize-profile-heading'>Customize profile</h2>
          <h3 className='headings-titles text-uppercase fw-bold mb-4'>Profile Information</h3>
          <ProfileInformation profileData={profileData} setProfileData={setProfileData}/>
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