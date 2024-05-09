import React, { useState } from 'react';
import { Button, Flex } from '@chakra-ui/react';
import "./PostMethods.css"

// Function component for selecting different post methods
function Post_Methods({ onMethodSelect }) {
  // State to keep track of the selected tab
  const [selectedTab, setSelectedTab] = useState("post");

  // Function to handle button clicks
  const handleButtonClick = (buttonName) => {
    setSelectedTab(buttonName);
    onMethodSelect(buttonName);
  };

  return (
    <Flex className='post-methods'>
      {/* Button for posting */}
      <Button
        className='button-post-method'
        colorScheme={selectedTab === "post" ? "blue" : ""}
        size='lg'
        variant='ghost'
        leftIcon={<i className="fa-solid fa-signs-post" />}
        onClick={() => handleButtonClick("post")}
        style={{
          borderColor: '#edeff1',
          borderStyle: 'solid',
          borderRadius: '0',
          borderBottomColor: selectedTab === "post" ? "blue" : "#edeff1",
          borderWidth: selectedTab === "post" ? '0 0 2px 0' : '0 0 1px 0',
          color: selectedTab === "post" ? "#0079d3" : "#878a8c",
        }}
      >
        Post
      </Button>
      {/* Button for media */}
      <Button
        className='button-post-method'
        colorScheme={selectedTab === "media" ? "blue" : ""}
        size='lg'
        variant='ghost'
        leftIcon={<i className="fa-regular fa-image" />}
        onClick={() => handleButtonClick("media")}
        style={{
          borderColor: '#edeff1',
          borderWidth: '0 0 1px 1px',
          borderStyle: 'solid',
          borderRadius: '0',
          borderBottomColor: selectedTab === "media" ? "blue" : "#edeff1",
          borderWidth: selectedTab === "media" ? '0 0 2px 1px' : '0 0 1px 1px',
          color: selectedTab === "media" ? "#0079d3" : "#878a8c",
        }}
      >
        Image & Video
      </Button>
      {/* Button for link */}
      <Button
        className='button-post-method'
        colorScheme={selectedTab === "link" ? "blue" : ""}
        size='lg'
        variant='ghost'
        leftIcon={<i className="fa-solid fa-link" />}
        onClick={() => handleButtonClick("link")}
        style={{
          borderColor: '#edeff1',
          borderWidth: '0 0 1px 1px',
          borderStyle: 'solid',
          borderRadius: '0',
          borderBottomColor: selectedTab === "link" ? "blue" : "#edeff1",
          borderWidth: selectedTab === "link" ? '0 0 2px 1px' : '0 0 1px 1px',
          color: selectedTab === "link" ? "#0079d3" : "#878a8c",
        }}
      >
        Link
      </Button>
      {/* Button for polls */}
      <Button
        className='button-post-method'
        colorScheme={selectedTab === "poll" ? "blue" : ""}
        size='lg'
        variant='ghost'
        leftIcon={<i className="fa-regular fa-image" />}
        onClick={() => handleButtonClick("poll")}
        style={{
          borderColor: '#edeff1',
          borderWidth: '0 0 1px 1px',
          borderStyle: 'solid',
          borderRadius: '0',
          borderBottomColor: selectedTab === "poll" ? "blue" : "#edeff1",
          borderWidth: selectedTab === "poll" ? '0 0 2px 1px' : '0 0 1px 1px',
          color: selectedTab === "poll" ? "#0079d3" : "#878a8c",
        }}
      >
        Polls
      </Button>
    </Flex>
  );
}

export default Post_Methods;