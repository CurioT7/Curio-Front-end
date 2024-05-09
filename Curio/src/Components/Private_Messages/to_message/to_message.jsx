import React from 'react';
import "./to_message.css"
import { Input  } from '@chakra-ui/react';

function to_message({setRecipient}) {

  const handletoMessageChange = (event) => {
    const tomessage = event.target.value;
    setRecipient(tomessage);
  };
  
  return (
    <div className='to_message_container'>
      <label htmlFor="selectOption"><span style={{fontSize:'large'}}>to</span> <span style={{fontSize:'smaller', color:'#878a8c'}}> (username, or /r/name for that subreddit's moderators)</span></label>
      <Input size='sm' maxWidth='492px' onChange={handletoMessageChange}/>
    </div>
  );
}

export default to_message;