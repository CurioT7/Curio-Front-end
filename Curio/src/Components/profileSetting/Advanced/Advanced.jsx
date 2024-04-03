import React, { useState, useEffect } from 'react';
import { Box, Text, Button, Flex, Switch, Spacer, useToast } from "@chakra-ui/react";
import "./Advanced.css";
import Titles from "../../feedSettings/childs/Titles";
import axios from 'axios';

function Advanced() {
  const serverHost = import.meta.env.VITE_SERVER_HOST;
  const [followChecked, setFollowChecked] = useState(true);
  const [contentVisibilityChecked, setContentVisibilityChecked] = useState(true);
  const [communitiesVisibilityChecked, setCommunitiesVisibilityChecked] = useState(true);
  const [clearHistorychecked, setclearHistorychecked] = useState(false);
  const toast = useToast();

  const handleFollowChange = () => {
    setFollowChecked(!followChecked); 
    sendDataToBackend({allowFollow: !followChecked});
    Toast();
  };

  const handleContentVisibilityChange = () => {
    setContentVisibilityChecked(!contentVisibilityChecked); 
    sendDataToBackend({contentVisibility: !contentVisibilityChecked});
    Toast();
  };

  const handleCommunitiesVisibilityChange = () => {
    setCommunitiesVisibilityChecked(!communitiesVisibilityChecked); 
    sendDataToBackend({activeInCommunityVisibility: !communitiesVisibilityChecked});
    Toast();
  };

  const handleClearHistoryChange = () => {
    setclearHistorychecked(!clearHistorychecked); 
    sendDataToBackend({clearHistory: !clearHistorychecked});
    Toast();
  };

  function Toast(){
    toast({   
        description: "Changes Saved",
        status: 'info',
        duration: 3000,
        isClosable: true,
      })
  }

  async function sendDataToBackend(data) {
    // Validate data
    if (!data || typeof data !== 'object') {
        console.error('Invalid data:', data);
        return;
    }
    try {
        
        const response = await axios.patch(`${serverHost}/api/settings/v1/me/prefs`, data, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log(response)
        return response;
    } catch (error) {
        console.error('Error sending data to backend:', error);
    }
  }

  async function fetchDataFromBackend() {
      try {
          
          const response = await axios.get(`${serverHost}/api/settings/v1/me/prefs`, {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
              }
          });
          return response.data;
      } catch (error) {
          console.error('Error fetching data from backend:', error);
      }
  }
  useEffect(() => {
    async function fetchAndSetData() {
        const data = await fetchDataFromBackend();
        if (data) {
          setFollowChecked(data.followChecked);
          setContentVisibilityChecked(data.contentVisibilityChecked);
          setCommunitiesVisibilityChecked(data.communitiesVisibilityChecked);
          setclearHistorychecked(data.clearHistorychecked)
        }
    }
    fetchAndSetData();
    }, []);

  return (
    <>
      <Flex mb={5} alignItems='center'>
        <Titles title='Allow people to follow you'
        description="Followers will be notified about posts you make to your profile and see them in their home feed."/>
        <Spacer/>
        <Switch size='lg' isChecked={followChecked} onChange={handleFollowChange}/>
      </Flex>
      <Flex mb={5} alignItems='center'>
        <Titles title='Content visibility'
        description={
          <>
            Posts to this profile can appear in <a href="#">r/all</a> and your profile can be discovered in <a href="#">/users</a>.
          </>
        }
        />
        <Spacer/>
        <Switch size='lg' isChecked={contentVisibilityChecked} onChange={handleContentVisibilityChange}/>
      </Flex>
      <Flex mb={5} alignItems='center'>
        <Titles title='Active in communities visibility'
        description="Show which communities I am active in on my profile."/>
        <Spacer/>
        <Switch size='lg' isChecked={communitiesVisibilityChecked} onChange={handleCommunitiesVisibilityChange}/>
      </Flex>
      <Box className="clear-history d-flex flex-wrap mb-3">
        <Box className="clear-history-label">
          <h3 className="headings-settings" fontWeight="500" mb="1">
            Clear history
          </h3>
          <Text className="headings-description" fontWeight="normal" color="gray.500">
            Delete your post views history.
          </Text>
        </Box>
        <Box className="clear-history-button">
          <Button role="button" 
          tabIndex="0" 
          className='btn btn-primary'
          checked={clearHistorychecked}
          onClick={handleClearHistoryChange}>
            Clear history
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Advanced