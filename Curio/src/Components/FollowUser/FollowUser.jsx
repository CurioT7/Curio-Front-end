import React, { useState } from "react";
import { FaEllipsisH } from 'react-icons/fa'; 
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from 'react-icons/io';
import "./FollowUser.css";
import chatIcon from "./Icons/chat-icon.svg"
import shareIcon from './Icons/share-icon.svg'
import reportIcon from './Icons/report-icon.svg'
import messageIcon from './Icons/message-icon.svg'
import blockIcon from './Icons/block-icon.svg'

function FollowUser(){
  const [showDropdown, setShowDropdown] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const handleEllipsisClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  return(
    <div className="information-container"> 
      <div className="first-row-container">
        <div className="Username">
          <h5 className="Username-text">User name</h5>
        </div>
        <div className="ellipsis-container">
          <button className="ellipsis-button" onClick={handleEllipsisClick}>
            <FaEllipsisH className="ellipsis-img" />
          </button>
          <div className="dropdown-menu" style={{ 
            display: showDropdown ? 'flex' : 'none',
            flexDirection: 'column',
            alignItems: 'flex-start',
            position: 'absolute',
            top: '0',
            right: '0',
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            boxShadow: '2px 6px 10px rgba(0, 0, 0, 0.4)',
            marginTop: '30px',
            marginRight: '10px',
            padding: '10px',
            width: '188px',
            zIndex: '1' }}>
            <ul style={{ listStyleType: 'none', margin: '0', padding: '5px 10px 5px 10px' }}>
              <li style={{marginBottom: '25px', color: 'rgb(15, 26, 28)', fontSize: '14px'}}><img src={shareIcon} alt="share" style={{marginRight: '10px'}} />Share</li>
              <li style={{marginBottom: '25px', color: 'rgb(15, 26, 28)', fontSize: '14px'}}><img src={messageIcon} alt="message" style={{marginRight: '10px'}}/>Send a message</li>
              <li style={{marginBottom: '25px', color: 'rgb(15, 26, 28)', fontSize: '14px'}}><img src={blockIcon} alt="block" style={{marginRight: '10px'}}/>Block account</li>
              <li style={{color: 'rgb(15, 26, 28)', fontSize: '14px'}}><img src={reportIcon} alt="report" style={{marginRight: '10px'}}/>Report</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="second-row-container">
        <div className="follow-btn-container">
          <button className="follow-btn" onClick={handleFollowToggle} style={{ 
            backgroundColor: isFollowing ? '#FFFFFF' : '#0045AC', 
            color: isFollowing ? '#000000' : '#FFFFFF',
            border: isFollowing ? '1px solid rgba(0, 0, 0, 0.5)' : 'none' }}> 
            {isFollowing ? (
              <>
                <IoMdRemoveCircleOutline className="follow-icon" style={{ marginRight: '5px' }} /> 
                Unfollow
              </>
            ) : (
              <>
                <IoMdAddCircleOutline className="follow-icon" style={{ marginRight: '5px' }} />
                Follow
              </>
            )}
          </button>
        </div>
        <div>
          <button className="chat-btn">
            <img src={chatIcon} alt="Chat" className="chat-icon"/>
            Chat
          </button>
        </div>
      </div>
      <div className="third-row-container">
        <div className="left-section">
          <p className="stat-numbers">1</p>
          <p className="stat-names">Post Karma</p>
        </div>
        <div className="middle-section">
          <p className="stat-numbers">1</p>
          <p className="stat-names">Comment Karma</p>
        </div>
        <div className="right-section">
          <p className="stat-numbers">Feb 26, 2021</p>
          <p className="stat-names">Cake Day</p>
        </div>
      </div>
    </div>
  );
}

export default FollowUser;