import React, { useState } from 'react';
import { Box, Heading, Text, Input, Button } from '@chakra-ui/react';
import "./Safety.css"

function Safety() {
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [mutedCommunities, setMutedCommunities] = useState([]);

  const handleAddBlockedUser = () => {
    const blockedUserInput = document.getElementById('blockedUserInput').value;
    setBlockedUsers(prevBlockedUsers => [...prevBlockedUsers, blockedUserInput]);
    document.getElementById('blockedUserInput').value = '';
  };

  const handleAddMutedCommunity = () => {
    const mutedCommunityInput = document.getElementById('mutedCommunityInput').value;
    setMutedCommunities(prevMutedCommunities => [...prevMutedCommunities, mutedCommunityInput]);
    document.getElementById('mutedCommunityInput').value = '';
  };

  const handleRemoveBlockedUser = index => {
    const updatedBlockedUsers = [...blockedUsers];
    updatedBlockedUsers.splice(index, 1);
    setBlockedUsers(updatedBlockedUsers);
  };

  const handleRemoveMutedCommunity = index => {
    const updatedMutedCommunities = [...mutedCommunities];
    updatedMutedCommunities.splice(index, 1);
    setMutedCommunities(updatedMutedCommunities);
  };

  return (
    <>
      <Box>
        <h4 className="headings-settings" fontWeight="500" mb="1">People You’ve Blocked</h4>
        <Text className="headings-description" fontWeight="normal" color="gray.500">Blocked people can’t send you chat requests or private messages.</Text>
        <Box className="input-group mb-3">
          <Input id="blockedUserInput" type="text" placeholder="Block new user" className="form-control mr-sm-2" required />
          <Button className="btn btn-primary" onClick={handleAddBlockedUser}>ADD</Button>
        </Box>
        {blockedUsers.map((user, index) => (
          <Box key={index}>
            <Text>{user}</Text>
            <Button className="btn btn-primary" onClick={() => handleRemoveBlockedUser(index)}>Remove</Button>
          </Box>
        ))}
      </Box>
      <Box>
        <h4 className="headings-settings" fontWeight="500" mb="1">Communities You've Muted</h4>
        <Text className="headings-description" fontWeight="normal" color="gray.500">Posts from muted communities won't show up in your feeds or recommendations.</Text>
        <Box className="input-group mb-3">
          <Input id="mutedCommunityInput" type="text" placeholder="Mute new community" className="form-control" required />
          <Button className="btn btn-primary" onClick={handleAddMutedCommunity}>ADD</Button>
        </Box>
        {mutedCommunities.map((community, index) => (
          <Box key={index}>
            <Text>{community}</Text>
            <Button onClick={() => handleRemoveMutedCommunity(index)}>Remove</Button>
          </Box>
        ))}
      </Box>
    </>
  );
}

export default Safety;
