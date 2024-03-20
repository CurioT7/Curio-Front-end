import React, { useState, useEffect } from 'react';
import { Box, Text, Input, Button, Flex } from '@chakra-ui/react';
import "./Safety.css"

function Safety() {
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [mutedCommunities, setMutedCommunities] = useState([]);
  const [blockedUserInput, setBlockedUserInput] = useState('');
  const [mutedCommunityInput, setMutedCommunityInput] = useState('');
  const [unblockedUsers, setUnblockedUsers] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateBlockedUsersTime();
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [blockedUsers]); // Run useEffect whenever blockedUsers changes

  const updateBlockedUsersTime = () => {
    const updatedBlockedUsers = blockedUsers.map(user => {
      const currentTime = new Date();
      const blockTime = user.blockedAt;
      const timeDifference = Math.floor((currentTime - blockTime) / 60000); // Calculate time difference in minutes
      return { ...user, timeAgo: `${timeDifference} minute${timeDifference !== 1 ? 's' : ''} ago` };
    });
    setBlockedUsers(updatedBlockedUsers);
  };

  const handleAddBlockedUser = () => {
    if (blockedUserInput.trim() !== '' && !unblockedUsers.includes(blockedUserInput)) { // Check if user is not in unblocked list
      const newUser = { name: blockedUserInput, blockedAt: new Date(), timeAgo: 'just now' };
      setBlockedUsers(prevBlockedUsers => [...prevBlockedUsers, newUser]);
      setBlockedUserInput('');
      handleBlockUser();
    } else {
      alert(`You can't block ${blockedUserInput} for 24 hours after unblocking them.`);
    }
  };

  const handleAddMutedCommunity = () => {
    if (mutedCommunityInput.trim() !== '') {
      setMutedCommunities(prevMutedCommunities => [...prevMutedCommunities, mutedCommunityInput]);
      setMutedCommunityInput('');
    }
  };

  const handleRemoveBlockedUser = index => {
    const updatedBlockedUsers = [...blockedUsers];
    const unblockedUser = updatedBlockedUsers.splice(index, 1)[0].name;
    setBlockedUsers(updatedBlockedUsers);
    setUnblockedUsers(prevUnblockedUsers => [...prevUnblockedUsers, unblockedUser]); // Add user to unblocked list
    setTimeout(() => {
      setUnblockedUsers(prevUnblockedUsers => prevUnblockedUsers.filter(user => user !== unblockedUser)); 
    }, 86400000); // 24 hours in milliseconds
  };

  const handleRemoveMutedCommunity = index => {
    const updatedMutedCommunities = [...mutedCommunities];
    updatedMutedCommunities.splice(index, 1);
    setMutedCommunities(updatedMutedCommunities);
  };

  const handleBlockUser = () => {
    const usernameToBlock = blockedUserInput.trim();
    fetch('http://localhost:3000/api/User/block', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ usernameToBlock })
    })
    .then(response => {
      if (response.status === 200) {
        // User successfully blocked
        alert('User successfully blocked');
        // Update state or perform any necessary actions
        setBlockedUserInput('');
      } else if (response.status === 403) {
        // User can't be blocked for 24 hours after unblocking
        alert('You can\'t block the user for 24 hours after unblocking them.');
      } else if (response.status === 404) {
        // User to block not found
        alert('User to block not found.');
      }
    })
    .catch(error => {
      console.error('Error blocking user:', error);
      alert('An unexpected error occurred. Please try again later.');
    });
  };

  const handleUnblockUser = () => {
    const usernameToUnblock = blockedUserInput.trim();
    fetch('http://localhost:3000/api/User/unblock', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ usernameToUnblock })
    })
    .then(response => {
      if (response.status === 200) {
        // User successfully unblocked
        alert('User successfully unblocked');
        // Update state or perform any necessary actions
        setBlockedUserInput('');
      } else if (response.status === 404) {
        // User to unblock not found
        alert('User to unblock not found.');
      } else if (response.status === 409) {
        // User not blocked
        alert('User not blocked.');
      }
    })
    .catch(error => {
      console.error('Error unblocking user:', error);
      alert('An unexpected error occurred. Please try again later.');
    });
  };
  

  return (
    <>
      <Box>
        <h4 className="headings-settings" fontWeight="500" mb="1">People You’ve Blocked</h4>
        <Text className="headings-description" fontWeight="normal" color="gray.500">Blocked people can’t send you chat requests or private messages.</Text>
        <Box className="input-group mb-3">
          <Input id="blockedUserInput" type="text" placeholder="Block new user" className="form-control mr-sm-2" value={blockedUserInput} onChange={(e) => setBlockedUserInput(e.target.value)} required />
          <Button className="btn btn-primary" data-testid="add-block-user" onClick={handleAddBlockedUser} disabled={blockedUserInput.trim() === ''}>ADD</Button>
        </Box>
        {blockedUsers.map((user, index) => (
          <Flex key={index} alignItems="center" justifyContent="space-between" mb="2">
            <Text>{user.name} - {user.timeAgo}</Text> {/* Display blocked user and time ago */}
            <Button className="btn btn-primary" onClick={() => {handleRemoveBlockedUser(index); handleUnblockUser();}} bg="transparent" border="none">Remove</Button>
          </Flex>
        ))}
      </Box>
      <Box>
        <h4 className="headings-settings" fontWeight="500" mb="1">Communities You've Muted</h4>
        <Text className="headings-description" fontWeight="normal" color="gray.500">Posts from muted communities won't show up in your feeds or recommendations.</Text>
        <Box className="input-group mb-3">
          <Input id="mutedCommunityInput" type="text" placeholder="Mute new community" className="form-control" value={mutedCommunityInput} onChange={(e) => setMutedCommunityInput(e.target.value)} required />
          <Button className="btn btn-primary" data-testid="add-mute-community" onClick={handleAddMutedCommunity} disabled={mutedCommunityInput.trim() === ''}>ADD</Button>
        </Box>
        {mutedCommunities.map((community, index) => (
          <Flex key={index} alignItems="center" justifyContent="space-between" mb="2">
            <Text>{community}</Text>
            <Button data-testid="remove-mute-community" onClick={() => handleRemoveMutedCommunity(index)} bg="transparent" border="none">Remove</Button>
          </Flex>
        ))}
      </Box>
    </>
  );
}

export default Safety;
