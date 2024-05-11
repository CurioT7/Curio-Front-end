import React, { useState, useEffect } from 'react';
import FriendInformation from "../../Components/FriendInformation/ShowFriendInformation.jsx"
import './UserProfile.css'
// import Picture from "../../styles/icons/BlockPic.png"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { showFriendInformation } from '../../Components/FriendInformation/ShowFriendInformationEndpoints.js';


function UserPage( props ) {
  const { username } = useParams();
  const [isNextPage, setIsNextPage] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [friendInfo, setFriendInfo] = useState({});


  useEffect(() => {
    handleFriendInformation(username);
  }, [username]);

  async function handleFriendInformation(username) {
    const result = await showFriendInformation(username);
    if(result) {
      setFriendInfo(result.data);
    }
  }


  const handleBlockUser = () => {
    setIsBlocked(true);
  }

  const handleUnblock = () => {
    setIsBlocked(false);
  }

  const handleBlockPage = () => {
    setIsNextPage(true);
    props.hideSidebar();
  }
  const handleBlock = () => {
    setIsBlocked(true);
    setIsNextPage(false);
    props.showSidebar();
  }



  return (
      <div style={{marginTop: '6rem'}}>
          {isNextPage ? (
            <div className= 'h-screen absolute flex items-center top-0 w-100 text-center main-div'>
            <div className='w-100 h-100 flex items-center justify-content-center text-center'> 
              <div className='w-1/2 flex flex-col items-center text-center justify-content-center '>
                <div className='d-flex justify-content-center'>
                <img src={Picture} alt='reddit figure' className='block-page-fig'/>
                </div>
                <h1 className='header-title' dataTest>You've blocked {username} </h1>
                <p className='paragraph'>
                Continue to view their profile or visit your settings to <Link to='/settings/privacy' className='LinkToSettings'>manage who you have blocked.</Link>
                </p>
                </div>
                <div className='button-flex'>
                  <button onClick={handleBlock} className='continue-btn'>Yes, continue</button>
                  <Link to="/home">
                  <button className='go-back-btn' onClick={props.showSidebar}>No, go back</button>
                  </Link>
              </div>
            </div>
          </div>
          ) : (
              <FriendInformation isBlocked={isBlocked} handleBlockPage={handleBlockPage} handleUnblock={handleUnblock} isUserBlocked={handleBlockUser} username={username}
              friendInfo={friendInfo}  />
          )}
      </div>
  );
}

export default UserPage;