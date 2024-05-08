import React from 'react';
import "./NewPostForm.css";
import { Flex } from '@chakra-ui/react';
import CreatePostArea from "./CreatePostArea"

// Function component for rendering posts
function Posts(community) {
  return (
    // Container for posts
    <Flex direction="column" bg="white" borderRadius={4} mt={2}>
      <Flex width="100%">
        {/* Container for creating a new post */}
        <div className="create-post-container">
          <CreatePostArea community={community}/>
        </div>
      </Flex>
    </Flex>
  );
}

export default Posts;
