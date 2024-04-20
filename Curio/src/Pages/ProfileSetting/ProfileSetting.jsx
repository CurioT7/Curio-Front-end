// ProfileSetting.jsx
import React, { useEffect, useState } from 'react';
import "./ProfileSetting.css";
import UserSetting from "../../Components/UserSetting/UserSetting.jsx";
import ProfileInformation from "../../Components/profileSetting/ProfileInformation/ProfileInformation";
import SocialLinksComponent from "../../Components/profileSetting/SocialLinksSection/SocialLinksSection";
import ProfileImageUpload from "../../Components/profileSetting/ProfileImageUpload/ProfileImageUpload";
import ProfileCategory from "../../Components/profileSetting/ProfileCategory/ProfileCategory";
import Advanced from "../../Components/profileSetting/Advanced/Advanced";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

function ProfileSetting(props) {
  const navigate = useNavigate();
  const serverHost = import.meta.env.VITE_SERVER_HOST;
  const [displayName, setDisplayName] = useState('');
  const [about, setAbout] = useState('');
  const [allowFollow, setAllowFollow] = useState(true);
  const [contentVisibility, setContentVisibility] = useState(true);
  const [activeInCommunityVisibility, setActiveInCommunityVisibility] = useState(true);
  const [clearHistory, setClearHistory] = useState(false);
  const [NSFW, setIsChecked] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
    props.hideSidebar();
    fetchDataFromBackend(); // Fetch data on mount
    return () => {
      props.showSidebar();
    }
  }, []);

  const fetchDataFromBackend = async () => {
    try {
      const response = await axios.get(`${serverHost}/api/settings/v1/me/prefs`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      switch (response.status) {
        case 200:
          setDisplayName(response.data.displayName);
          setAbout(response.data.about);
          setAllowFollow(response.data.allowFollow);
          setContentVisibility(response.data.contentVisibility);
          setActiveInCommunityVisibility(response.data.activeInCommunityVisibility);
          setClearHistory(response.data.clearHistory);
          setIsChecked(response.data.NSFW);
          break;
        case 404:
          console.log("User preferences not found");
          break;
        default:
          console.log("Unexpected response status:", response.status);
          break;
      }
      return response.data;
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 500) {
          console.log("500 Internal Server Error: An unexpected error occurred on the server. Please try again later.");
        } else {
          console.error("Error fetching data from backend:", error.response.data);
        }
      } else {
        console.error('Error fetching data from backend:', error.message);
      }
    }
  }

  const sendDataToBackend = async (data) => {
    try {
      const response = await axios.patch(
        `${serverHost}/api/settings/v1/me/prefs`,
        data,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      // Handle different response status codes
      switch (response.status) {
        case 200:
          console.log("User preferences updated successfully");
          break;
        case 404:
          console.log("User preferences not found");
          break;
        default:
          console.log("Unexpected response status:", response.status);
          break;
      }
      return response;
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 500) {
          console.log("500 Internal Server Error: An unexpected error occurred on the server. Please try again later.");
        } else {
          console.error("Error sending data to backend:", error.response.data);
        }
      } else {
        console.error('Error sending data to backend:', error.message);
      }
    }
  }

  const handleSwitchChange = () => {
    if (NSFW) { 
      setIsModalOpen(true);
    } else {
      confirmChange();
    }
  };

  const confirmChange = () => {
    setIsChecked(!NSFW);
    sendDataToBackend({ NSFW: !NSFW });
    setIsModalOpen(false);
    Toast();
  };  

  function Toast() {
    toast({   
      description: "Changes Saved",
      status: 'info',
      duration: 3000,
      isClosable: true,
    })
  }

  return (
    <div>
      <UserSetting />
      <div className="container">
        <div className="customize-profile">
          <div className="customize-profile-section">
            <h2 className='customize-profile-heading'>Customize profile</h2>
            <h3 className='headings-titles text-uppercase fw-bold mb-4'>Profile Information</h3>
            <ProfileInformation
              displayName={displayName}
              about={about}
              setDisplayName={setDisplayName}
              setAbout={setAbout}
              sendDataToBackend={sendDataToBackend}
            />
            <SocialLinksComponent/>
            <h3 className='headings-titles text-uppercase fw-bold mb-4'>Images</h3>
            <ProfileImageUpload/>
            <h3 className='headings-titles text-uppercase fw-bold mb-4'>Profile category</h3>
            <ProfileCategory
              NSFW={NSFW}
              handleSwitchChange={handleSwitchChange}
              sendDataToBackend={sendDataToBackend}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              confirmChange={confirmChange}
            />
            <h3 className='headings-titles text-uppercase fw-bold mb-4'>Advanced</h3>
            <Advanced
              allowFollow={allowFollow}
              contentVisibility={contentVisibility}
              activeInCommunityVisibility={activeInCommunityVisibility}
              clearHistory={clearHistory}
              setAllowFollow={setAllowFollow}
              setContentVisibility={setContentVisibility}
              setActiveInCommunityVisibility={setActiveInCommunityVisibility}
              setClearHistory={setClearHistory}
              sendDataToBackend={sendDataToBackend}
            />
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
