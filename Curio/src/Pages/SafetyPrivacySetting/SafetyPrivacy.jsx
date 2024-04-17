import React from 'react';
import { useEffect } from 'react';
import "./SafetyPrivacy.css";
import UserSetting from "../../Components/UserSetting/UserSetting.jsx";
import { useNavigate } from 'react-router-dom';
import Block from "../../Components/SafetyPrivacy/Safety/Block/Block.jsx";
import Mute from "../../Components/SafetyPrivacy/Safety/Mute/Mute.jsx";



function SafetyPrivacy(props) {
  const navigate = useNavigate();

useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
    props.hideSidebar();
    return () => {
      props.showSidebar();
    }
  }, []);
  return (
    <div>
      <UserSetting />
      <div className="container">
        <div className="customize-privacy">
          <div className="customize-privacy-section">
          <h2 className='customize-privacy-heading'>Safety & Privacy</h2>
          <p className='customize-privacy-heading-description'>Manage how we use data to personalize your Reddit experience, and control how other
            redditors interact with you. To learn more, visit our &nbsp;
            <span>
                <a href="#">
                  Privacy & Security 
                  FAQs
                </a>
            </span>
          </p>
          <h3 className='headings-titles text-uppercase fw-bold mb-4'>Safety</h3>
          <Block/>
          <Mute/>
          </div>
        </div>
      </div> 
    </div>
  );
}

export default SafetyPrivacy;
