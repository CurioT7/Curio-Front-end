import React, { useState } from 'react';
import { Box, Heading, Text, Button } from "@chakra-ui/react";

function Advanced() {
  const [followChecked, setFollowChecked] = useState(true);
  const [contentVisibilityChecked, setContentVisibilityChecked] = useState(true);
  const [communitiesVisibilityChecked, setCommunitiesVisibilityChecked] = useState(true);

  const handleFollowChange = () => {
    setFollowChecked(!followChecked); 
  };

  const handleContentVisibilityChange = () => {
    setContentVisibilityChecked(!contentVisibilityChecked); 
  };

  const handleCommunitiesVisibilityChange = () => {
    setCommunitiesVisibilityChecked(!communitiesVisibilityChecked); 
  };
  return (
    <>
      <Box className="advanced d-flex flex-wrap mb-3">
        <Box className="follow">
            <label htmlFor="follow-checkbox">
              <Heading as="h3" className="headings-settings" fontWeight="500" mb="1">
                Allow people to follow you
              </Heading>
            </label>
            <Text className="headings-description" fontWeight="normal" color="gray.500">
                Followers will be notified about posts you make to your profile and see them in their home feed.
            </Text>
        </Box>
        <Box className="follow-checkbox">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
                checked={followChecked}
                onClick={handleFollowChange}
              />
            </div>
        </Box>
      </Box>
      <Box className="content-visibility d-flex flex-wrap mb-3">
        <Box className="content-visibility-label">
          <label htmlFor="content-visibility-checkbox">
            <Heading as="h3" className="headings-settings" fontWeight="500" mb="1">
              Content visibility
            </Heading>
          </label>
          <Text className="headings-description" fontWeight="normal" color="gray.500">
            Posts to this profile can appear in <a href="#">r/all</a> and your profile can be discovered in <a href="#">/users</a>
          </Text>
        </Box>
        <Box className="content-visibility-switch">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              checked={contentVisibilityChecked}
              onClick={handleContentVisibilityChange}
            />
          </div>
        </Box>
      </Box>
      <Box className="communities-visibility d-flex flex-wrap mb-3">
        <Box className="communities-visibility-label">
          <label htmlFor="communities-visibility-checkbox">
            <Heading as="h3" className="headings-settings" fontWeight="500" mb="1">
              Active in communities visibility
            </Heading>
          </label>
          <Text className="headings-description" fontWeight="normal" color="gray.500">
            Show which communities I am active in on my profile.
          </Text>
        </Box>
        <Box className="communities-visibility-switch">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              checked={communitiesVisibilityChecked}
              onClick={handleCommunitiesVisibilityChange}
            />
          </div>
        </Box>
      </Box>
      <Box className="clear-history d-flex flex-wrap mb-3">
        <Box className="clear-history-label">
          <Heading as="h3" className="headings-settings" fontWeight="500" mb="1">
            Clear history
          </Heading>
          <Text className="headings-description" fontWeight="normal" color="gray.500">
            Delete your post views history.
          </Text>
        </Box>
        <Box className="clear-history-button">
          <Button role="button" tabIndex="0" className='btn btn-primary'>
            Clear history
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Advanced