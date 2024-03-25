import React from 'react';
import { Button, Flex } from '@chakra-ui/react';
import "./Post_Methods.css"

function Post_Methods() {
  return (
    <Flex className='post-methods'>
      <Flex className='button-group'>
        <Button colorScheme='blue' size='lg' variant='ghost' leftIcon={<i className="fa-solid fa-signs-post"/>}>
          Post
        </Button>
        <Button colorScheme='blue' size='lg' variant='ghost' leftIcon={<i className="fa-regular fa-image"/>}>
          Image & Video
        </Button>
        <Button colorScheme='blue' size='lg' variant='ghost' leftIcon={<i className="fa-solid fa-link"/>}>
          Link
        </Button>
        <Button colorScheme='blue' size='lg' variant='ghost' leftIcon={<i className="fa-solid fa-square-poll-horizontal"/>}>
          Poll
        </Button>
      </Flex>
    </Flex>
  );
}

export default Post_Methods;
