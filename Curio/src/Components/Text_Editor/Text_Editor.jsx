import React, { useState } from "react";
import "./Text_Editor.css";
import Icons from "./Icons";

function Text_Editor() {
  const [inputText, setInputText] = useState("");
  const [boldMode, setBoldMode] = useState(false);
  const [italicMode, setItalicMode] = useState(false);
  const [linkMode, setLinkMode] = useState(false);
  const [strikethroughMode, setStrikethroughMode] = useState(false);
  const [inlinecodeMode, setInlineCodeMode] = useState(false);
  const [superscriptMode, setSuperscriptMode] = useState(false);

  const handleTextInputChange = (event) => {
    setInputText(event.target.value);
  };

  const toggleBoldMode = () => {
    setBoldMode(!boldMode);
  };

  const toggleItalicMode = () => {
    setItalicMode(!italicMode);
  };

  const toggleStrikethroughMode = () => {
    setStrikethroughMode(!strikethroughMode);
  };

  const toggleInlineCodeMode = () => {
    setInlineCodeMode(!inlinecodeMode);
  };

  const toggleSuperscriptMode = () => {
    setSuperscriptMode(!superscriptMode);
  };

  const handleItalicIconClick = () => {
    toggleItalicMode();
  };

  const handleBoldIconClick = () => {
    toggleBoldMode();
  };

  const handleStrikethroughIconClick = () => {
    toggleStrikethroughMode();
  };

  const handleInlineCodeIconClick = () => {
    toggleInlineCodeMode();
  };

  const handleSuperscriptIconClick = () => {
    toggleSuperscriptMode();
  };

  return (
    <div>
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
              <Icons
                label="Link"
                icon="fa-solid fa-link"
                // onClick={handleItalicIconClick}
                isActive={linkMode}
              />
              <Icons
                label="Strikethrough"
                icon="fa-solid fa-strikethrough"
                onClick={handleStrikethroughIconClick}
                isActive={strikethroughMode}
              />
              <Icons
                label="Inline Code"
                icon="fa-solid fa-code"
                onClick={handleInlineCodeIconClick}
                isActive={inlinecodeMode}
              />
              <Icons
                label="Superscript"
                icon="fa-solid fa-superscript"
                onClick={handleSuperscriptIconClick}
                isActive={superscriptMode}
              />
            </div>
          </div>
          <div className="text-optional-container">
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
                textDecoration: strikethroughMode ? "line-through" : "none",
                fontFamily: inlinecodeMode ? "monospace" : "inherit",
                color: inlinecodeMode ? "#ff006d" : "black",
                verticalAlign: superscriptMode ? "super" : "baseline",
                marginTop: "1.5px"
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Text_Editor;
