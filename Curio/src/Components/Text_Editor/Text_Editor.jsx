import React, { useState } from "react";
import "./Text_Editor.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"


function Text_Editor() {
  const [inputText, setInputText] = useState("");

  const toolbarOptions = [['bold', 'italic','link','strike',{ 'script': 'super' }],
   [ { 'header': [1, 2, 3, 4, 5, 6, false] },{ 'list': 'bullet' },{ 'list': 'ordered'},'blockquote','code-block']];

  const module = {
    toolbar: toolbarOptions,
  }

  const handleTextInputChange = (event) => {
    setInputText(event.target.value);
  };

  return (
    <ReactQuill modules={module} theme="snow" value={inputText} onChange={handleTextInputChange}/>
  );
}

export default Text_Editor;
