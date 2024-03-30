import React, { useState, useEffect } from 'react';
import "./Text_Editor.css";
import Icons from "./Icons";

function Text_Editor() {
  const [inputText, setInputText] = useState('');

  const handleTextInputChange = (event) => {
    setInputText(event.target.value);
  };

  return (
    <div className="container">
      <div className='inner-container'>
        <div className='nested-container'>
          <div className='nested-div'>
            <div className='deeply-nested-div'>
              <Icons label="Bold" icon="fa-solid fa-bold" />
              <Icons label="Italics" icon="fa-solid fa-italic" />
              {/* Add other style icons here */}
            </div>
          </div>
          <div>
            <textarea
              className='Text-optional-textarea'
              rows="1" 
              maxLength="300" 
              placeholder="Text (optional)"
              value={inputText}
              onChange={handleTextInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Text_Editor;
