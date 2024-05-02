import React from 'react';
import "./message.css"
import { Textarea } from '@chakra-ui/react';

function message({ setMessage }) {

  const handleMessageChange = (event) => {
    const message = event.target.value;
    setMessage(message);
  };

  return (
    <div className='message_container'>
      <label htmlFor="selectOption" style={{fontSize:'large'}}>message</label>
      <Textarea className="message_private_textarea" size='sm' onChange={handleMessageChange}/>
    </div>
  );
}

export default message;