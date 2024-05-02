import React, { useState } from 'react';
import "./from_message.css"
import { Select } from '@chakra-ui/react';

function FromMessage({ userCommunities, setSubreddit }) {
  const username = localStorage.getItem('username');
  const [selectedOption, setSelectedOption] = useState(`u/${username}`);

  const handleOptionChange = (e) => {
    const value = e.target.value.startsWith('r/') ? e.target.value.substring(2) : e.target.value.substring(2); // Remove 'r/' or 'u/' from the selected option
    setSelectedOption(e.target.value);
    setSubreddit(value); // Pass the formatted recipient to the parent component
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
