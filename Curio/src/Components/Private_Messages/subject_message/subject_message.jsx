import React from 'react';
import "./subject_message.css"
import { Input } from '@chakra-ui/react';

function subject_message({ setSubject }) {

  const handleSubjectChange = (event) => {
    const subject = event.target.value;
    setSubject(subject);
  };

  return (
    <div className='subject_message_container'>
      <label htmlFor="selectOption" style={{fontSize:'large'}}>subject</label>
      <Input size='sm' maxWidth='492px' onChange={handleSubjectChange}/>
    </div>
  );
}

export default subject_message;