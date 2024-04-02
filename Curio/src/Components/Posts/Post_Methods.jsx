import React, { useState } from 'react';
import { Button, Flex } from '@chakra-ui/react';
import "./Post_Methods.css"

function Post_Methods() {
  const [selectedTab, setSelectedTab] = useState(null); // Initialize state for tracking clicked button

  // Function to handle button click and update selectedTab state
  const handleButtonClick = (buttonName) => {
    setSelectedTab(buttonName);
  };

  return (
    <Flex className='post-methods'>
      <Button
        className='button-post-method'
        colorScheme={selectedTab === "Post" ? "blue" : ""} // Change color based on selectedTab state
        size='lg'
        variant='ghost'
        leftIcon={<i className="fa-solid fa-signs-post"/>}
        onClick={() => handleButtonClick("Post")} // Update selectedTab state on button click
      >
        Post
      </Button>
      <Button
        className='button-post-method'
        colorScheme={selectedTab === "Image & Video" ? "blue" : ""} // Change color based on selectedTab state
        size='lg'
        variant='ghost'
        leftIcon={<i className="fa-regular fa-image"/>}
        onClick={() => handleButtonClick("Image & Video")} // Update selectedTab state on button click
      >
        Image & Video
      </Button>
      <Button
        className='button-post-method'
        colorScheme={selectedTab === "Link" ? "blue" : ""} // Change color based on selectedTab state
        size='lg'
        variant='ghost'
        leftIcon={<i className="fa-solid fa-link"/>}
        onClick={() => handleButtonClick("Link")} // Update selectedTab state on button click
      >
        Link
      </Button>
    </Flex>
  );
}

export default Post_Methods;