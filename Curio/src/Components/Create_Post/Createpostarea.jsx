import React, { useState, useRef } from 'react';
import "./CreatePostArea.css";
import PostMethods from "./PostMethods";
import EditCreateArea from "./EditCreateArea";
import ImageVideo from "./Image_&_Video_Section/ImageVideo";
import Link from "./Link_Section/Link";
import Polls from "./Polls_Section/Polls";
import Post from "./Post_Section/Post";

function CreatePostArea({ community }) {
  const [inputTitle, setInputTitle] = useState('');
  const [selectedMethod, setSelectedMethod] = useState("post");
  const [content, setContent] = useState('');
  const [dayNumber, setDayNumber] = useState(3);
  const [imageFormData, setImageFormData] = useState(null);
  const [linkUrl, setLinkUrl] = useState('');
  const textareaRef = useRef(null);
  const [optionsText, setoptionsText] = useState([]);
  const [options, setOptions] = useState([]);
  const maxOptions = 4;

  // Function to add an option
  const handleAddOption = () => {
    if (options.length < maxOptions) {
      setOptions([...options, `Option ${options.length + 3}`]);
    }
  };

  // Function to remove an option
  const handleRemoveOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);

    const newOptionsText = [...optionsText];
    newOptionsText.splice(index + 2, 1);
    setoptionsText(newOptionsText);
  };

  // Function to handle day change
  const handleDayChange = (event) => {
    setDayNumber(parseInt(event.target.value));
  };

  // Function to handle option change
  const handleOptionChange = (index, event) => {
    const newOptionsText = [...optionsText];
    newOptionsText[index] = event.target.value;
    setoptionsText(newOptionsText);
  };

  // Function to handle title input change
  const handleTitleInputChange = (event) => {
    setInputTitle(event.target.value);
    adjustTextareaHeight();
  };

  // Function to adjust textarea height based on content
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  // Function to handle method selection
  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
  };

  // Function to handle content change
  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  // Function to handle image upload
  const handleImageUpload = (formData) => {
    setImageFormData(formData);
  };

  // Function to handle link change
  const handleLinkChange = (url) => {
    setLinkUrl(url);
  };

  // Function to render the selected method section
  const renderSelectedMethod = () => {
    switch (selectedMethod) {
      case "post":
        return <Post onContentChange={handleContentChange} />;
      case "media":
        return <ImageVideo onImageUpload={handleImageUpload} />;
      case "link":
        return <Link onLinkChange={handleLinkChange} />;
      case "poll":
        return <Polls handleDayChange={handleDayChange} handleOptionChange={handleOptionChange} handleAddOption={handleAddOption} handleRemoveOption={handleRemoveOption}
          options={options} onContentChange={handleContentChange} />;
    }
  };

  return (
    <div className='create-post-region'>
      <PostMethods onMethodSelect={handleMethodSelect} />
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
      <EditCreateArea
        title={inputTitle}
        content={content || linkUrl}
        community={community}
        days={dayNumber}
        options={optionsText}
        imageFormData={imageFormData}
        selectedMethod={selectedMethod}
      />
    </div>
  );
}

export default CreatePostArea;
