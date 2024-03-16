import React, { useState } from 'react';
import { Box, Heading, Text, Input, Button } from '@chakra-ui/react';

function Safety() {
  // State variables for blocked users and muted communities
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [mutedCommunities, setMutedCommunities] = useState([]);

  // Function to handle adding a new blocked user
  const handleAddBlockedUser = () => {
    // Get the input value for the blocked user
    const blockedUserInput = document.getElementById('blockedUserInput').value;

    // Update the blocked users list with the new user
    setBlockedUsers(prevBlockedUsers => [...prevBlockedUsers, blockedUserInput]);

    // Clear the input field
    document.getElementById('blockedUserInput').value = '';
  };

  // Function to handle adding a new muted community
  const handleAddMutedCommunity = () => {
    // Get the input value for the muted community
    const mutedCommunityInput = document.getElementById('mutedCommunityInput').value;

    // Update the muted communities list with the new community
    setMutedCommunities(prevMutedCommunities => [...prevMutedCommunities, mutedCommunityInput]);

    // Clear the input field
    document.getElementById('mutedCommunityInput').value = '';
  };

  return (
    <>
      <Box>
        <Heading as="h4" className="headings-settings" fontWeight="500" mb="1">People You’ve Blocked</Heading>
        <Text className="headings-description" fontWeight="normal" color="gray.500">Blocked people can’t send you chat requests or private messages.</Text>
        <Box className="input-group mb-3">
          <Input id="blockedUserInput" type="text" placeholder="Block new user" className="form-control mr-sm-2" required />
          <Button className="btn btn-primary" onClick={handleAddBlockedUser}>ADD</Button>
        </Box>
        {/* Display blocked users */}
        {blockedUsers.map((user, index) => (
          <Text key={index}>{user}</Text>
        ))}
      </Box>
      <Box>
        <Heading as="h4" className="headings-settings" fontWeight="500" mb="1">Communities You've Muted</Heading>
        <Text className="headings-description" fontWeight="normal" color="gray.500">Posts from muted communities won't show up in your feeds or recommendations.</Text>
        <Box className="input-group mb-3">
          <Input id="mutedCommunityInput" type="text" placeholder="Mute new community" className="form-control" required />
          <Button className="btn btn-primary" onClick={handleAddMutedCommunity}>ADD</Button>
        </Box>
        {/* Display muted communities */}
        {mutedCommunities.map((community, index) => (
          <Text key={index}>{community}</Text>
        ))}
      </Box>
    </>
  );
}

export default Safety;
