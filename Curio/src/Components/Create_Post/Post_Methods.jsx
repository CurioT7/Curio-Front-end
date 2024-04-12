import React, { useState } from 'react';
import { Button, Flex } from '@chakra-ui/react';
import "./Post_Methods.css"

function Post_Methods({ onMethodSelect }) {
  const [selectedTab, setSelectedTab] = useState("Post"); // Initialize state for tracking clicked button

  // Function to handle button click and update selectedTab state
  const handleButtonClick = (buttonName) => {
    setSelectedTab(buttonName);
    onMethodSelect(buttonName);
  };

  return (
    <Flex className='post-methods'>
      <Button
        className='button-post-method'
        colorScheme={selectedTab === "Post" ? "blue" : ""} // Change color based on selectedTab state
        size='lg'
        variant='ghost'
        leftIcon={<i className="fa-solid fa-signs-post"/>}
        onClick={() => handleButtonClick("Post")}
        style={{ 
          borderColor: '#edeff1',
          borderStyle: 'solid', 
          borderRadius: '0',
          borderBottomColor: selectedTab === "Post" ? "blue" : "#edeff1",
          borderWidth: selectedTab === "Post" ? '0 0 2px 0' : '0 0 1px 0',
          color: selectedTab === "Post" ? "#0079d3" : "#878a8c",
        }}
      >
        Post
      </Button>
      <Button
        className='button-post-method'
        colorScheme={selectedTab === "Image & Video" ? "blue" : ""} // Change color based on selectedTab state
        size='lg'
        variant='ghost'
        leftIcon={<i className="fa-regular fa-image"/>}
        onClick={() => handleButtonClick("Image & Video")}
        style={{ 
          borderColor: '#edeff1',
          borderWidth: '0 0 1px 1px', 
          borderStyle: 'solid', 
          borderRadius: '0',
          borderBottomColor: selectedTab === "Image & Video" ? "blue" : "#edeff1",
          borderWidth: selectedTab === "Image & Video" ? '0 0 2px 1px' : '0 0 1px 1px',
          color: selectedTab === "Image & Video" ? "#0079d3" : "#878a8c",
        }}
      >
        Image & Video
      </Button>
      <Button
        className='button-post-method'
        colorScheme={selectedTab === "Link" ? "blue" : ""} // Change color based on selectedTab state
        size='lg'
        variant='ghost'
        leftIcon={<i className="fa-solid fa-link"/>}
        onClick={() => handleButtonClick("Link")}
        style={{ 
          borderColor: '#edeff1',
          borderWidth: '0 0 1px 1px', 
          borderStyle: 'solid', 
          borderRadius: '0',
          borderBottomColor: selectedTab === "Link" ? "blue" : "#edeff1",
          borderWidth: selectedTab === "Link" ? '0 0 2px 1px' : '0 0 1px 1px',
          color: selectedTab === "Link" ? "#0079d3" : "#878a8c",
        }}
      >
        Link
      </Button>
      <Button
        className='button-post-method'
        colorScheme={selectedTab === "Polls" ? "blue" : ""} // Change color based on selectedTab state
        size='lg'
        variant='ghost'
        leftIcon={<i className="fa-regular fa-image"/>}
        onClick={() => handleButtonClick("Polls")} 
        style={{ 
          borderColor: '#edeff1',
          borderWidth: '0 0 1px 1px', 
          borderStyle: 'solid', 
          borderRadius: '0',
          borderBottomColor: selectedTab === "Polls" ? "blue" : "#edeff1",
          borderWidth: selectedTab === "Polls" ? '0 0 2px 1px' : '0 0 1px 1px',
          color: selectedTab === "Polls" ? "#0079d3" : "#878a8c",
        }}
      >
        Polls
      </Button>
    </Flex>
  );
}

export default Post_Methods;