// Advanced.jsx
import React from 'react';
import { Box, Text, Button, Flex, Switch, Spacer, useToast } from "@chakra-ui/react";
import "./Advanced.css";
import Titles from "../../feedSettings/childs/Titles";
import axios from 'axios';

function Advanced(props) {
  const toast = useToast();

  const handleFollowChange = () => {
    props.setAllowFollow(!props.allowFollow); 
    props.sendDataToBackend({ allowFollow: !props.allowFollow });
    Toast();
  };

  const handleContentVisibilityChange = () => {
    props.setContentVisibility(!props.contentVisibility); 
    props.sendDataToBackend({ contentVisibility: !props.contentVisibility });
    Toast();
  };

  const handleCommunitiesVisibilityChange = () => {
    props.setActiveInCommunityVisibility(!props.activeInCommunityVisibility); 
    props.sendDataToBackend({ activeInCommunityVisibility: !props.activeInCommunityVisibility });
    Toast();
  };

  const handleClearHistoryChange = () => {
    props.setClearHistory(!props.clearHistory); 
    props.sendDataToBackend({ clearHistory: !props.clearHistory });
    Toast();
  };

  function Toast() {
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
          description="Followers will be notified about posts you make to your profile and see them in their home feed."
        />
        <Spacer/>
        <Switch size='lg' isChecked={props.allowFollow} onChange={handleFollowChange}/>
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
        <Switch size='lg' isChecked={props.contentVisibility} onChange={handleContentVisibilityChange}/>
      </Flex>
      <Flex mb={5} alignItems='center'>
        <Titles title='Active in communities visibility'
          description="Show which communities I am active in on my profile."
        />
        <Spacer/>
        <Switch size='lg' isChecked={props.activeInCommunityVisibility} onChange={handleCommunitiesVisibilityChange}/>
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
            checked={props.clearHistory}
            onClick={handleClearHistoryChange}>
            Clear history
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Advanced;
