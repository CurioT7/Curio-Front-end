import React, { useState, useEffect } from 'react';
import { Box, Text, Button, Flex, Switch, Spacer, useToast } from "@chakra-ui/react";
import "./Advanced.css";
import Titles from "../../feedSettings/childs/Titles";
import { sendUserDataToBackend } from '../../UserSetting/UserSettingsEndPoints';

function Advanced({ userData }) {
  const [allowFollow, setFollowChecked] = useState(true);
  const [contentVisibility, setContentVisibilityChecked] = useState(true);
  const [activeInCommunityVisibility, setCommunitiesVisibilityChecked] = useState(true);
  const [clearHistory, setclearHistorychecked] = useState(false);
  const toast = useToast();

  useEffect(() => {
    setFollowChecked(userData.allowFollow);
    setContentVisibilityChecked(userData.contentVisibility);
    setCommunitiesVisibilityChecked(userData.activeInCommunityVisibility);
    setclearHistorychecked(userData.clearHistory);
  }, [userData]);

  const handleFollowChange = () => {
    setFollowChecked(!allowFollow); 
    sendUserDataToBackend({allowFollow: !allowFollow});
    Toast();
  };

  const handleContentVisibilityChange = () => {
    setContentVisibilityChecked(!contentVisibility); 
    sendUserDataToBackend({contentVisibility: !contentVisibility});
    Toast();
  };

  const handleCommunitiesVisibilityChange = () => {
    setCommunitiesVisibilityChecked(!activeInCommunityVisibility); 
    sendUserDataToBackend({activeInCommunityVisibility: !activeInCommunityVisibility});
    Toast();
  };

  const handleClearHistoryChange = () => {
    setclearHistorychecked(!clearHistory); 
    sendUserDataToBackend({clearHistory: !clearHistory});
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

  return (
    <>
      <Flex mb={5} alignItems='center'>
        <Titles title='Allow people to follow you'
        description="Followers will be notified about posts you make to your profile and see them in their home feed."/>
        <Spacer/>
        <Switch size='lg' isChecked={allowFollow} onChange={handleFollowChange}/>
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
        <Switch size='lg' isChecked={contentVisibility} onChange={handleContentVisibilityChange}/>
      </Flex>
      <Flex mb={5} alignItems='center'>
        <Titles title='Active in communities visibility'
        description="Show which communities I am active in on my profile."/>
        <Spacer/>
        <Switch size='lg' isChecked={activeInCommunityVisibility} onChange={handleCommunitiesVisibilityChange}/>
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
          checked={clearHistory}
          onClick={handleClearHistoryChange}>
            Clear history
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Advanced