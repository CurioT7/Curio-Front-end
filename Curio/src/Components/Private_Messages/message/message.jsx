/**
 * Message Component
 * 
 * A component for entering the message content of a private message.
 * 
 * @component
 * @param {Object} props - The props of the component.
 * @param {Function} props.setMessage - A function to set the message content.
 * @module MessageContent
 * @example
 * import React, { useState } from 'react';
 * import Message from './Message';
 * 
 * const MyComponent = () => {
 *   const [message, setMessage] = useState('');
 * 
 *   return (
 *     <Message setMessage={setMessage} />
 *   );
 * };
 * 
 * export default MyComponent;
 */

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