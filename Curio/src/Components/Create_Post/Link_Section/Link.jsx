/**
 * Component for entering and displaying a link URL.
 * @component
 * @param {Object} props - The props object containing the component's properties.
 * @param {function} props.onLinkChange - Function to handle URL change.
 * @module Link
 */
import React, { useState } from 'react';
import "./Link.css";

function Link({ onLinkChange }) {
  const [url, setUrl] = useState('');

  const handleUrlChange = (event) => {
    const newUrl = event.target.value;
    setUrl(newUrl);
    onLinkChange(newUrl); 
  };

  return (
    <div className='url-input'>
      <textarea 
        placeholder="Url" 
        rows="1" 
        className='url-input__input' 
        value={url} 
        onChange={handleUrlChange} 
      />
    </div>
  );
}

export default Link;
