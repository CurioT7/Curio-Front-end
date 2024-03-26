import React from 'react';
import "./CreatePost.css";
import { Button } from '@chakra-ui/react';
import Community from "./Community";
import CreatePostArea from "./Createpostarea"

function CreatePost() {
  return (
    <div>
      <div className='cont-create-post'>
        <div className='create-post-title'>
          Create Post
        </div>
        <Button colorScheme='blue' variant='ghost'>
          Drafts<span className='draft-button-number'>0</span>
        </Button>
      </div>
      <Community/>
      <CreatePostArea/>
    </div>
  );
}

export default CreatePost;
