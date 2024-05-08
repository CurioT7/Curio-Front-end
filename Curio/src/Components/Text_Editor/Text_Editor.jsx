import React, { useState } from "react";
import "./Text_Editor.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"


function Text_Editor({ onContentChange }) { // Receive onContentChange as prop
  const [inputText, setInputText] = useState("");

  const toolbarOptions = [['bold', 'italic','link','strike',{ 'script': 'super' }],
  [ { 'header': [1, 2, 3, 4, 5, 6, false] },{ 'list': 'bullet' },{ 'list': 'ordered'},'blockquote','code-block']];

  const module = {
    toolbar: toolbarOptions,
  }

  const handleTextInputChange = (newContent) => { // Update the content state
    setInputText(newContent);
    onContentChange(newContent); // Call the function passed down from Post
  };

  return (
    <ReactQuill
    modules={module} 
    theme="snow" 
    value={inputText} 
    onChange={handleTextInputChange}
    placeholder="Text(optional)"/>

  );
}

export default Text_Editor;
