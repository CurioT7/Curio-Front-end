import React from 'react';
import "./from_message.css"
import { Select } from '@chakra-ui/react';

function from_message({ userCommunities }) {
  const username = localStorage.getItem('username');

  return (
    <div className='from_message_container'>
      <label htmlFor="selectOption" style={{ fontSize: 'large' }}>from</label>
      <Select placeholder={`/u/${username}`} size='sm' maxWidth='492px'>
        {userCommunities.map((community, index) => (
          <option key={index} value={`r/${community}`} >
            r/{community}
          </option>
        ))}
        <option value={`/u/${username}`} >u/{username}</option>
      </Select>
    </div>
  );
}

export default from_message;