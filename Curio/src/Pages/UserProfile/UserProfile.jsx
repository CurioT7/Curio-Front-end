import React, { useState, useEffect } from 'react';
import StatsLayout from "../../Components/FollowUser/FollowUser.jsx"
import FriendInformation from "../../Components/FriendInformation/ShowFriendInformation.jsx"
import './UserProfile.css'

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
              <div>
                  <h1>User is Blocked</h1>
                  <button onClick={handleUnblockUser} className='unblock-btn'>Unblock User</button>
                  <img src='../../styles/icons/BlockPic.png' />
              </div>
          ) : (
              <FriendInformation onBlock={handleBlockUser} />
          )}
      </div>
  );
}

export default UserPage;
