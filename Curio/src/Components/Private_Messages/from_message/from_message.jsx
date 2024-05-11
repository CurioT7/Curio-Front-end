/**
 * FromMessage Component
 * 
 * A component for selecting the sender of a private message.
 * 
 * @component
 * @param {Object} props - The props of the component.
 * @param {Array} props.userCommunities - The communities the user is a member of.
 * @param {Function} props.setSubreddit - A function to set the selected subreddit.
 * @module FromMessage
 * @example
 * import React from 'react';
 * import FromMessage from './FromMessage';
 * 
 * const MyComponent = () => {
 *   const userCommunities = ['community1', 'community2'];
 *   const setSubreddit = (subreddit) => {
 *     // Logic to set the selected subreddit
 *   };
 * 
 *   return (
 *     <FromMessage userCommunities={userCommunities} setSubreddit={setSubreddit} />
 *   );
 * };
 * 
 * export default MyComponent;
 */

import React, { useState } from 'react';
import "./from_message.css"
import { Select } from '@chakra-ui/react';

function FromMessage({ userCommunities, setSubreddit }) {
  const username = localStorage.getItem('username');
  const [selectedOption, setSelectedOption] = useState(`u/${username}`);

  const handleOptionChange = (e) => {
    const value = e.target.value.startsWith('r/') ? e.target.value.substring(2) : e.target.value.substring(2); 
    setSelectedOption(e.target.value);
    setSubreddit(value); 
  };

  return (
    <div className='from_message_container'>
      <label htmlFor="selectOption" style={{ fontSize: 'large' }}>from</label>
      <Select id="selectOption" value={selectedOption} onChange={handleOptionChange} size='sm' maxWidth='492px'>
        {userCommunities.map((community, index) => (
          <option key={index} value={`r/${community}`} >
            r/{community}
          </option>
        ))}
        <option value={`u/${username}`} >u/{username}</option>
      </Select>
    </div>
  );
}

export default FromMessage;
