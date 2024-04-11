import React from 'react';
import "./NewPostForm.css";
import { Flex } from '@chakra-ui/react';
import Community from "./Community";
import CreatePostArea from "./Createpostarea"
import Post_Method from "./Post_Methods";
import EditCreatearea from "./EditCreatearea";

function Posts() {
  return (
    <Flex direction="column" bg="white" borderRadius={4} mt={2}>
      <Community/>
      <Flex width="100%">
        <div className="create-post-container">
          <Post_Method/>
          <CreatePostArea/>
          <EditCreatearea/>
        </div>
      </Flex>
    </Flex>
  );
}

export default Posts;
