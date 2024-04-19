import React, { useState, useRef } from 'react';
import "./Createpostarea.css";
import Post_Methods from "./Post_Methods";
import EditCreatearea from "./EditCreatearea";
import ImageVideo from "./Image_&_Video_Section/ImageVideo";
import Link from "./Link_Section/Link";
import Polls from "./Polls_Section/Polls";
import Post from "./Post_Section/Post";

function Createpostarea({ community }) {
  const [inputTitle, setInputTitle] = useState('');
  const [selectedMethod, setSelectedMethod] = useState("Post");
  const [content, setContent] = useState(''); // State to hold content from Text_Editor
  const [dayNumber, setDayNumber] = useState(3);
  const [optionsText, setoptionsText] = useState([]);
  const textareaRef = useRef(null);

  const handleDayChange = (event) => {
    console.log("Selected day:", event.target.value);
    setDayNumber(parseInt(event.target.value));
    console.log("Day number state:", dayNumber);
  };

  const handleOptionChange = (index, event) => {
    const newOptionsText = [...optionsText];
    newOptionsText[index] = event.target.value;
    setoptionsText(newOptionsText);
    console.log("Options text:", optionsText);
  };

  const handleSecondOptionChange = (event) => {
    setoptionsText([optionsText[0], event.target.value]);
  };


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

  const handleMethodSelect = (method) => {
    // Set the selected method
    setSelectedMethod(method);
  };

  // Pass this function down to Post
  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  // Render the selected component based on the selected method
  const renderSelectedMethod = () => {
    switch (selectedMethod) {
      case "Post":
        return <Post onContentChange={handleContentChange} />; 
      case "Image & Video":
        return <ImageVideo />;
      case "Link":
        return <Link />;
      case "Polls":
        return <Polls handleDayChange={handleDayChange} handleOptionChange={handleOptionChange} />;
    }
  };

  return (
    <div className='create-post-region'>
      <Post_Methods onMethodSelect={handleMethodSelect} />
      <div className="container my-3">
        <div className="textarea-container">
          <textarea
            className="custom-textarea"
            ref={textareaRef}
            rows="1"
            maxLength="300"
            placeholder="Title"
            value={inputTitle}
            onChange={handleTitleInputChange}
             />
          <div className="counter-title">
            {inputTitle.length}/300
          </div>
        </div>
        {renderSelectedMethod()}
      </div>
      <EditCreatearea title={inputTitle} content={content} community={community} days={dayNumber} options={optionsText}/> 
    </div>
  );
}

export default Createpostarea;
