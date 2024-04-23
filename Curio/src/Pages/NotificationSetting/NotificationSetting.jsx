import React from 'react';
import { useEffect, useState } from 'react';
import "./NotificationSetting.css";
import UserSetting from "../../Components/UserSetting/UserSetting.jsx";
import Activity from "../../Components/NotificationsSetting/Activity/Activity";
import { useNavigate } from 'react-router-dom';
import { fetchUserDataFromBackend } from '../../Components/UserSetting/UserSettingsEndPoints.js';

function NotificationSetting(props) {
  const [userActivity, setUserActivity] = useState(false);
  const navigate = useNavigate();
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
      setUserActivity({
        mentions: data.mentions,
        comments: data.comments,
        upvotesPosts: data.upvotesPosts,
        upvotesComments: data.upvotesComments,
        replies: data.replies,
        newFollowers: data.newFollowers,
        postsYouFollow: data.postsYouFollow
      })        
    }
}

  return (
    <div>
      <UserSetting />
      <div className='container'>
        <div className="notification-settings">
            <div className="notification-settings-section">
            <h2 className='notification-settings-heading'>Notification settings</h2>
            <div className='activity-section'>
                <h3 className='headings-titles text-uppercase fw-bold mb-4'>Activity</h3>    
                    <Activity userActivity= {userActivity}/> 
            </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationSetting;
