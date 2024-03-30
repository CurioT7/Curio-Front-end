import React, { useState, useRef  }  from 'react';
import "./Createpostarea.css";
import Text_Editor from "./Text_Editor";


function Createpostarea() {
  const [inputTitle, setInputTitle] = useState('');
  const textareaRef = useRef(null);

  const handleTitleInputChange = (event) => {
    setInputTitle(event.target.value);
    adjustTextareaHeight(); // Adjust textarea height when text changes
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height to auto to calculate new height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set height to match scroll height
    }
  };

  return (
    <div>
      <div className="container">
        <div className="textarea-container">
          <textarea 
          className="custom-textarea" 
          ref={textareaRef}
          rows="1" 
          maxLength="300" 
          placeholder="Title"
          value={inputTitle}
          onChange={handleTitleInputChange}/>
          <div className="counter-title">
          {inputTitle.length}/300
          </div>
        </div>
      </div>
      <Text_Editor/>
    </div>
  );
}

export default Createpostarea;
