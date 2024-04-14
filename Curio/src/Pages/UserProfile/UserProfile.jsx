import React, { useState, useEffect } from 'react';
import StatsLayout from "../../Components/FollowUser/FollowUser.jsx"
import FriendInformation from "../../Components/FriendInformation/ShowFriendInformation.jsx"
import './UserProfile.css'
import Picture from "../../styles/icons/BlockPic.png"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const hostUrl = import.meta.env.VITE_SERVER_HOST;

function UserPage( props ) {
  const { username } = useParams();
  const [isNextPage, setIsNextPage] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [friendInfo, setFriendInfo] = useState({});
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    showFriendInformation(username);
  }, [username]);

  async function showFriendInformation(username) {
    try {
        const response = await axios.get(`${hostUrl}/user/${username}/about`);
        setFriendInfo(response.data);
    } catch (error) {
        console.error('Error:', error);
    }
}


  const handleBlockUser = () => {
    setIsBlocked(true);
  }

  const handleUnblock = () => {
    setIsBlocked(false);
  }

  const handleBlockPage = () => {
    setIsNextPage(!isNextPage);
    props.hideSidebar();
  }
  const handleBlock = () => {
    setIsBlocked(!isBlocked);
    setIsNextPage(!isNextPage);
    props.showSidebar();
  }



  return (
      <div>
          {isNextPage ? (
            <div className= 'h-screen absolute flex items-center top-0 w-100 text-center main-div'>
            <div className='w-100 h-100 flex items-center justify-content-center text-center'> 
              <div className='w-1/2 flex flex-col items-center text-center justify-content-center '>
                <div className='d-flex justify-content-center'>
                <img src={Picture} alt='reddit figure' className='block-page-fig'/>
                </div>
                <h1 className='header-title'>u/{username} is blocked</h1>
                <p className='paragraph'>
                  Are u sure you want to continue to their profile?
                </p>
                </div>
                <div className='button-flex'>
                  <button onClick={handleBlock} className='continue-btn'>Yes, continue</button>
                  <Link to="/home">
                  <button className='go-back-btn'>No, go back</button>
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