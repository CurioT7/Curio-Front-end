import React, { useState } from "react";
import "./Text_Editor.css";
import Icons from "./Icons";

function Text_Editor() {
  const [inputText, setInputText] = useState("");
  const [boldMode, setBoldMode] = useState(false);
  const [italicMode, setItalicMode] = useState(false);

  const handleTextInputChange = (event) => {
    setInputText(event.target.value);
  };

  const toggleBoldMode = () => {
    setBoldMode(!boldMode);
  };

  const toggleItalicMode = () => {
    setItalicMode(!italicMode);
  };

  const handleItalicIconClick = () => {
    toggleItalicMode();
  };

  const handleBoldIconClick = () => {
    toggleBoldMode();
  };

  return (
    <div className="container">
      <div className="inner-container">
        <div className="nested-container">
          <div className="nested-div">
            <div className="deeply-nested-div">
              <Icons
                label="Bold"
                icon="fa-solid fa-bold"
                onClick={handleBoldIconClick}
                isActive={boldMode}
              />
              <Icons
                label="Italic"
                icon="fa-solid fa-italic"
                onClick={handleItalicIconClick}
                isActive={italicMode}
              />
            </div>
          </div>
          <div>
            <textarea
              className="Text-optional-textarea"
              rows="1"
              maxLength="300"
              placeholder="Text (optional)"
              value={inputText}
              onChange={handleTextInputChange}
              style={{
                fontWeight: boldMode ? "bold" : "normal",
                fontStyle: italicMode ? "italic" : "normal",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Text_Editor;
