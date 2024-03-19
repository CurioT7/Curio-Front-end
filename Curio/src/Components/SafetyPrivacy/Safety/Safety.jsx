import React, { useState } from 'react';
import { Box, Text, Input, Button, Flex } from '@chakra-ui/react';
import "./Safety.css"

function Safety() {
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [mutedCommunities, setMutedCommunities] = useState([]);
  const [blockedUserInput, setBlockedUserInput] = useState('');
  const [mutedCommunityInput, setMutedCommunityInput] = useState('');

  const handleAddBlockedUser = () => {
    if (blockedUserInput.trim() !== '') {
      setBlockedUsers(prevBlockedUsers => [...prevBlockedUsers, blockedUserInput]);
      setBlockedUserInput('');
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
          <Input id="blockedUserInput" type="text" placeholder="Block new user" className="form-control mr-sm-2" value={blockedUserInput} onChange={(e) => setBlockedUserInput(e.target.value)} required />
          <Button className="btn btn-primary" data-testid="add-block-user" onClick={handleAddBlockedUser} disabled={blockedUserInput.trim() === ''}>ADD</Button>
        </Box>
        {blockedUsers.map((user, index) => (
          <Flex key={index} alignItems="center" justifyContent="space-between" mb="2">
            <Text>{user}</Text>
            <Button className="btn btn-primary" data-testid="remove-block-user" onClick={() => handleRemoveBlockedUser(index)} bg="transparent" border="none">Remove</Button>
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
