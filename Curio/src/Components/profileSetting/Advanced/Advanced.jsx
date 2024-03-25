import React, { useState } from 'react';
import { Box, Heading, Text, Button, Flex, Switch, Spacer } from "@chakra-ui/react";
import "./Advanced.css";
import Titles from "../../feedSettings/childs/Titles";

function Advanced() {
  const [followChecked, setFollowChecked] = useState(true);
  const [contentVisibilityChecked, setContentVisibilityChecked] = useState(true);
  const [communitiesVisibilityChecked, setCommunitiesVisibilityChecked] = useState(true);
  const [clearHistorychecked, setclearHistorychecked] = useState(false)

  const handleFollowChange = () => {
    setFollowChecked(!followChecked); 
    updateUserPreferences();
  };

  const handleContentVisibilityChange = () => {
    setContentVisibilityChecked(!contentVisibilityChecked); 
    updateUserPreferences();
  };

  const handleCommunitiesVisibilityChange = () => {
    setCommunitiesVisibilityChecked(!communitiesVisibilityChecked); 
    updateUserPreferences();
  };

  const handleClearHistoryChange = () => {
    setclearHistorychecked(!clearHistorychecked); 
    updateUserPreferences();
  };

  // Define a function to update user preferences via API
  const updateUserPreferences = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/settings/v1/me/prefs', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          displayName: '',
          allowFollow: followChecked,
          contentVisibility: contentVisibilityChecked,
          activeInCommunityVisibility: communitiesVisibilityChecked,
          clearHistory: clearHistorychecked
        })
      });
      const data = await response.json();
      console.log("User preferences updated successfully:", data);
    } catch (error) {
      console.error("Error updating user preferences:", error);
    }
  };
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