
import React, { useState, useEffect } from 'react';
import { Box, Text, Input, Button, Flex, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { sendUserDataToBackend,fetchUserDataFromBackend } from '../../../UserSetting/UserSettingsEndPoints';


function Safety() {
  const serverHost = import.meta.env.VITE_SERVER_HOST;
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [blockedUserInput, setBlockedUserInput] = useState('');
  const toast = useToast();
 
  function Toast(message){
    toast({
        description: message,
        status: 'info',
        duration: 3000,
        isClosable: true,
      })
  }
  /////////////////////////////////// Fetch //////////////////////////////
  async function fetchBlockedUsers() {
    try {
        const response = await axios.get(`${serverHost}/api/settings/v1/me/prefs`,
        {
          headers: {
              authorization: `Bearer ${localStorage.getItem('token')}` 
          }
        });
        setBlockedUsers(response.data.viewBlockedPeople || []);
        
    } catch (error) {
        if (error.response){
            switch (error.response.status) {
                case 404:
                    Toast('User preferences not found');
                    break;    
                case 500:
                    Toast('An unexpected error occurred on the server. Please try again later.');
                    break;
                default:
                    break;
                }
        }
    }
}
  useEffect(() => {
    fetchBlockedUsers();
  }, []);
  
  const postBlockUser = async (username) => {
    try {
      const response = await axios.post(`${serverHost}/api/User/block`, {
        usernameToBlock: username
      }, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 200) {
        Toast(`${username} is now blocked.`);
        return true;
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 403:
            Toast(`${username} can't be blocked after 24 hours of unblocking`);
            break;
          case 404:
            Toast(`${username} to block not found`);
            break;
          case 409:
            Toast(`${username} already blocked`);
            break;
          case 500:
            Toast(`An unexpected error occurred on the server. Please try again later.`);
            break;
          default:
            break;
        }
      }
      return false;
    }
  };
  
  const handleAddBlockedUser = async () => {
    if (blockedUserInput.trim() !== '') {
        const blockResult = await postBlockUser(blockedUserInput);
        if (blockResult === true) {
            const data = {
                viewBlockedPeople: [...blockedUsers, { username: blockedUserInput }]
            };
            setBlockedUserInput('');
            fetchBlockedUsers();
        }
    }
};


  const postunBlockUser = (username) => {
        axios.post(`${serverHost}/api/User/unblock`, {
            usernameToUnblock: username
        },{
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}` 
        }
        }).then(response => {
        if (response.status === 200) {
            Toast(`${username} is now inblocked`); 
        }
        })
        .catch(error => {
        if (error.response) {
            switch (error.response.status) {
            case 404:
                Toast(`${username} to unblock not found`);
                break;
            case 409:
                Toast(`${username} not blocked`);
                break;
            default:
                break;
            }
        }
        });
    };


    const handleRemoveBlockedUser = index => {
        const updatedBlockedUsers = [...blockedUsers];
        const unblockedUser = updatedBlockedUsers.splice(index, 1)[0].blockedUsername;
        setBlockedUsers(updatedBlockedUsers);
        postunBlockUser(unblockedUser);
    };

  return (
    <Box>
    <h4 className="headings-settings" fontWeight="500" mb="1">People You’ve Blocked</h4>
    <Text className="headings-description" fontWeight="normal" color="gray.500">Blocked people can’t send you chat requests or private messages.</Text>
    <Box className="input-group mb-3">
        <Input id="blockedUserInput" type="text" placeholder="Block new user" className="form-control mr-sm-2" value={blockedUserInput} onChange={(e) => setBlockedUserInput(e.target.value)} required />
        <Button className="btn btn-primary" data-testid="add-block-user" onClick={handleAddBlockedUser} disabled={blockedUserInput.trim() === ''}>ADD</Button>
    </Box>
    {blockedUsers.length > 0 && blockedUsers.map((user, index) => (
        <Flex key={index} alignItems="center" justifyContent="space-between" mb="2">
          <Text>{user.blockedUsername}</Text> 
          <Button className="btn btn-primary" onClick={() => {handleRemoveBlockedUser(index); handleUnblockUser();}} bg="transparent" border="none">Remove</Button>
        </Flex>
    ))}
    </Box>
  );
}

export default Safety;
