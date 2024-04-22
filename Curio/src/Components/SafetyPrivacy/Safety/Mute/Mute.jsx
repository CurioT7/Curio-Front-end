
import React, { useState, useEffect } from 'react';
import { Box, Text, Input, Button, Flex, useToast } from '@chakra-ui/react';
import axios from 'axios';

function Mute() {
  const serverHost = import.meta.env.VITE_SERVER_HOST;
  const [mutedCommunities, setMutedCommunities] = useState([]);
  const [mutedCommunityInput, setMutedCommunityInput] = useState('');
  const toast = useToast();

  function Toast(message){
    toast({
        description: message,
        status: 'info',
        duration: 3000,
        isClosable: true,
      })
  }

  useEffect(() => {
    async function fetchMuteCommuunities() {
        try {
            const response = await axios.get(`${serverHost}/api/settings/v1/me/prefs`,
            {
              headers: {
                  authorization: `Bearer ${localStorage.getItem('token')}` 
              }
            });
            // setMutedCommunities(response.data.mute); 
            setBlockedUsers(response.data.viewMutedCommunities || []);
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
    fetchMuteCommuunities();
  }, []);

  
  ////////////////////////////  Mute Communities /////////////////////////////////
  const patchMuteCommunity = (name) => {
    axios.patch(`${serverHost}/api/settings/v1/me/prefs`, {
      viewMutedCommunities: [...mutedCommunities, { username: name}]
    },{
      headers: {
          authorization: `Bearer ${localStorage.getItem('token')}` 
      }
    }).then(response => {
    })
    .catch(error => {
    });
  };

  const postMuteCommunity = (communityname) => {
    axios.post(`${serverHost}/api/settings/mute`, {
        communityToMute: communityname
    },{
      headers: {
          authorization: `Bearer ${localStorage.getItem('token')}` 
      }
    }).then(response => {
      if (response.status === 200) {
        Toast(`Muted ${communityname}`); 
      }
    })
    .catch(error => {
      if (error.response) {
        switch (error.response.status) {
          case 404:
            Toast(`${communityname} Not found`);
            break;
          case 409:
            Toast(`${communityname} already muted`);
            break;
          default:
            break;
        }
      }
    });
  };

  const handleAddMutedCommunity = () => {
    if (mutedCommunityInput.trim() !== '') {
        postMuteCommunity(mutedCommunityInput);
        patchMuteCommunity(mutedCommunityInput);
        const newUser = { username: mutedCommunityInput};
        setMutedCommunities(prevMutedCommunities => [...prevMutedCommunities, newUser]);
        // Call postMuteCommunity to send the request to mute the community
        setMutedCommunityInput(''); // Reset the input field
    }
  };

  ////////////////////////////// Unmute Communities ///////////////////////

  const postunMuteCommunity = (communityname) => {
    axios.post(`${serverHost}/api/settings/mute`, {
        communityToUnmute: communityname
    },{
      headers: {
          authorization: `Bearer ${localStorage.getItem('token')}` 
      }
    }).then(response => {
      if (response.status === 200) {
        Toast(`Unmuted ${communityname}`); 
      }
    })
    .catch(error => {
      if (error.response) {
        switch (error.response.status) {
          case 404:
            Toast(`${communityname} Not found`);
            break;
          case 409:
            Toast(`${communityname} not muted`);
            break;
          default:
            break;
        }
      }
    });
  };
  

  const handleRemoveMutedCommunity = index => {
    const removedCommunity = mutedCommunities[index].username; // Access the username property
    const updatedMutedCommunities = [...mutedCommunities];
    updatedMutedCommunities.splice(index, 1);
    setMutedCommunities(updatedMutedCommunities);
    postunMuteCommunity(removedCommunity); // Call postunMuteCommunity with the removed community's username
  };
  

  return (
      <Box>
        <h4 className="headings-settings" fontWeight="500" mb="1">Communities You've Muted</h4>
        <Text className="headings-description" fontWeight="normal" color="gray.500">Posts from muted communities won't show up in your feeds or recommendations.</Text>
        <Box className="input-group mb-3">
          <Input id="mutedCommunityInput" type="text" placeholder="Mute new community" className="form-control" value={mutedCommunityInput} onChange={(e) => setMutedCommunityInput(e.target.value)} required />
          <Button className="btn btn-primary" data-testid="add-mute-community" onClick={handleAddMutedCommunity} disabled={mutedCommunityInput.trim() === ''}>ADD</Button>
        </Box>
        {mutedCommunities.map((community, index) => (
          <Flex key={index} alignItems="center" justifyContent="space-between" mb="2">
            <Text>{community.username}</Text>
            <Button data-testid="remove-mute-community" onClick={() => handleRemoveMutedCommunity(index)} bg="transparent" border="none">Remove</Button>
          </Flex>
        ))}
      </Box>
  );
}

export default Mute;
