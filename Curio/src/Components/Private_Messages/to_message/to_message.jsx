import React from 'react';
import "./to_message.css"
import { Input  } from '@chakra-ui/react';

function to_message() {

  return (
    <div className='to_message_container'>
      <label htmlFor="selectOption"><span style={{fontSize:'large'}}>to</span> <span style={{fontSize:'smaller', color:'#878a8c'}}> (username, or /r/name for that subreddit's moderators)</span></label>
      <Input size='sm' width='492px' />
    </div>
  );
}

export default to_message;