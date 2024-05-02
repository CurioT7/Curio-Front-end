import React from 'react';
import "./message.css"
import { Textarea } from '@chakra-ui/react';

function message() {

  return (
    <div className='message_container'>
      <label htmlFor="selectOption" style={{fontSize:'large'}}>message</label>
      <Textarea className="message_private_textarea" size='sm' />
    </div>
  );
}

export default message;