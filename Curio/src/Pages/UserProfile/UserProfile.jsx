import React, { useState, useEffect } from 'react';
import StatsLayout from "../../Components/FollowUser/FollowUser.jsx"
import FriendInformation from "../../Components/FriendInformation/ShowFriendInformation.jsx"
import './UserProfile.css'
import Picture from "../../styles/icons/BlockPic.png"

function UserPage( ) {
  const [isUserBlocked, setIsUserBlocked] = useState(false);


  const handleBlockUser = () => {
      setIsUserBlocked(true);
  };

  const handleUnblockUser = () => {
    setIsUserBlocked(false);
};

  return (
      <div>
          {isUserBlocked ? (
            <div className= 'h-screen absolute flex items-center top-0 w-100 text-center main-div'>
            <div className='w-100 h-100 flex items-center justify-center text-center'> 
              <div className='w-1/2 flex flex-col items-center text-center '>
                <img src={Picture} alt='reddit figure' className='reddit-figure'/>
                <h1 className='header-title'>u/Yehia is blocked</h1>
                <p className='paragraph'>
                  Are u sure you want to continue to their profile?
                </p>
                </div>
                <div className='button-flex'>
                  <button onClick={handleUnblockUser} className='continue-btn'>Yes, continue</button>
                  <button className='go-back-btn'>No, go back</button>
              </div>
            </div>
          </div>
          ) : (
              <FriendInformation onBlock={handleBlockUser} />
          )}
      </div>
  );
}

export default UserPage;
