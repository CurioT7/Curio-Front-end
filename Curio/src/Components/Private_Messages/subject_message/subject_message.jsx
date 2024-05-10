/**
 * SubjectMessage Component
 * 
 * A component for entering the subject of a private message.
 * 
 * @component
 * @param {Object} props - The props of the component.
 * @param {Function} props.setSubject - A function to set the subject of the message.
 * @module SubjectMessage
 * @example
 * import React, { useState } from 'react';
 * import SubjectMessage from './SubjectMessage';
 * 
 * const MyComponent = () => {
 *   const [subject, setSubject] = useState('');
 * 
 *   return (
 *     <SubjectMessage setSubject={setSubject} />
 *   );
 * };
 * 
 * export default MyComponent;
 */

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
      <label htmlFor="selectOption" style={{ fontSize: 'large' }}>subject</label>
      <Input
        size='sm'
        maxWidth='492px'
        onChange={handleSubjectChange}
        data-testid="subject-message-input"
      />
    </div>
  );
}

export default subject_message;