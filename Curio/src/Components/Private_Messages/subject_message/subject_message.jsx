import React from 'react';
import "./subject_message.css"
import { Input } from '@chakra-ui/react';

function subject_message() {
  const username = localStorage.getItem('username');

  return (
    <div className='subject_message_container'>
      <label htmlFor="selectOption" style={{fontSize:'large'}}>subject</label>
      <Input size='sm' maxWidth='492px' />
    </div>
  );
}

export default subject_message;