import React, { useEffect, useState } from 'react';
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
  const [userData, setUserData] = useState(false);
  const [userCategory, setUserCategory] = useState(false);
  const [SocialLinks, setSocialLinks] = useState([]);
  const [profileImage_Page, setProfileImage] = useState(null);
  const [bannerImage_Page, setBannerImage] = useState(null);

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
      setUserData({
        allowFollow: data.allowFollow,
        contentVisibility: data.contentVisibility,
        activeInCommunityVisibility: data.activeInCommunityVisibility,
        clearHistory: data.clearHistory
      })
      setUserCategory({
        NSFW: data.NSFW
      })
      setSocialLinks(data.socialLinks ?
        data.socialLinks.map(link => ({
          url: link.url,
          displayName: link.displayName,
          platform: `fa-brands fa-${link.platform.toLowerCase()}`,
        })) : []);

      setBannerImage(data.banner);
      localStorage.setItem('bannerImage', data.banner);
      setProfileImage(data.profilePicture);
      localStorage.setItem('profileImage', data.profilePicture);
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
            <ProfileInformation profileData={profileData} />
            <SocialLinksComponent SocialLinks={SocialLinks} />
            <h3 className='headings-titles text-uppercase fw-bold mb-4'>Images</h3>
            <ProfileImageUpload profileImage_Page={profileImage_Page} bannerImage_Page={bannerImage_Page}/>
            <h3 className='headings-titles text-uppercase fw-bold mb-4'>Profile category</h3>
            <ProfileCategory userCategory={userCategory} />
            <h3 className='headings-titles text-uppercase fw-bold mb-4'>Advanced</h3>
            <Advanced userData={userData} />
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