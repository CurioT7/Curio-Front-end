import React, { useState, useRef } from 'react';
import "./Createpostarea.css";
import Text_Editor from "../../Components/Text_Editor/Text_Editor";
import Post_Methods from "./Post_Methods";
import EditCreatearea from "./EditCreatearea";
import ImageVideo from "./Image_&_Video_Section/ImageVideo";
import Link from "./Link_Section/Link";
import Polls from "./Polls_Section/Polls";

function Createpostarea() {
  const [inputTitle, setInputTitle] = useState('');
  const [selectedMethod, setSelectedMethod] = useState("Post");
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

  const handleMethodSelect = (method) => {
    // Set the selected method
    setSelectedMethod(method);
  };

  // Render the selected component based on the selected method
  const renderSelectedMethod = () => {
    switch (selectedMethod) {
      case "Post":
        return <Text_Editor />;
      case "Image & Video":
        return <ImageVideo />;
      case "Link":
        return <Link />;
      case "Polls":
        return <Polls />;
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
            onChange={handleTitleInputChange} />
          <div className="counter-title">
            {inputTitle.length}/300
          </div>
        </div>
        {renderSelectedMethod()}
      </div>
      <EditCreatearea />
    </div>
  );
}

export default Createpostarea;
