import React from 'react';
import "./Link.css"

function Link() {
  // Your component logic here
  return (
    <div className='url-input'>
      <textarea placeholder="Url" rows="1" className='url-input__input'/>
    </div>
  );
}

export default Link;
