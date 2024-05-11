/**
 * ToMessage Component
 * 
 * A component for entering the recipient of a private message.
 * 
 * @component
 * @param {Object} props - The props of the component.
 * @param {Function} props.setRecipient - A function to set the recipient of the message.
 * @module ToMessage
 * @example
 * import React, { useState } from 'react';
 * import ToMessage from './ToMessage';
 * 
 * const MyComponent = () => {
 *   const [recipient, setRecipient] = useState('');
 * 
 *   return (
 *     <ToMessage setRecipient={setRecipient} />
 *   );
 * };
 * 
 * export default MyComponent;
 */

import React from 'react';
import "./to_message.css"
import { Input } from '@chakra-ui/react';

function to_message({ setRecipient }) {

  const handletoMessageChange = (event) => {
    const tomessage = event.target.value;
    setRecipient(tomessage);
  };

  return (
    <div className='to_message_container'>
      <label htmlFor="selectOption"><span style={{ fontSize: 'large' }}>to</span> <span style={{ fontSize: 'smaller', color: '#878a8c' }}> (username, or /r/name for that subreddit's moderators)</span></label>
      <Input
        size='sm'
        maxWidth='492px'
        onChange={handletoMessageChange}
        data-testid="to-message-input"
      />
    </div>
  );
}

export default to_message;