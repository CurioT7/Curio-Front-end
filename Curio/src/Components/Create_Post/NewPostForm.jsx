import React from 'react';
import "./NewPostForm.css";
import { Flex } from '@chakra-ui/react';
import CreatePostArea from "./Createpostarea"

function Posts() {
  return (
    <Flex direction="column" bg="white" borderRadius={4} mt={2}>
      <Flex width="100%">
        <div className="create-post-container">
          <CreatePostArea/>
        </div>
      </Flex>
    </Flex>
  );
}

export default Posts;
