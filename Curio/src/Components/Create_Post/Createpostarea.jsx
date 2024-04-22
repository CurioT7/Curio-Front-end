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
  const [content, setContent] = useState('');
  const [content, setContent] = useState('');
  const [dayNumber, setDayNumber] = useState(3);
  const [optionsText, setoptionsText] = useState([]);
  const [imageFormData, setImageFormData] = useState(null);
  const [linkUrl, setLinkUrl] = useState(''); 
  const textareaRef = useRef(null);

  const handleDayChange = (event) => {
    setDayNumber(parseInt(event.target.value));
  };

  const handleOptionChange = (index, event) => {
    const newOptionsText = [...optionsText];
    newOptionsText[index] = event.target.value;
    setoptionsText(newOptionsText);
  };

  const handleTitleInputChange = (event) => {
    setInputTitle(event.target.value);
    adjustTextareaHeight();
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const handleImageUpload = (formData) => {
    setImageFormData(formData);
  };

  const handleLinkChange = (url) => {
    setLinkUrl(url);
  };
  const renderSelectedMethod = () => {
    switch (selectedMethod) {
      case "Post":
        return <Post onContentChange={handleContentChange} />;
        return <Post onContentChange={handleContentChange} />;
      case "Image & Video":
        return <ImageVideo onImageUpload={handleImageUpload} />;
        return <ImageVideo onImageUpload={handleImageUpload} />;
      case "Link":
        return <Link onLinkChange={handleLinkChange} />;
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
      <EditCreatearea title={inputTitle} content={content || linkUrl} community={community} days={dayNumber} options={optionsText} imageFormData={imageFormData} />
    </div>
  );
}

export default Createpostarea;
