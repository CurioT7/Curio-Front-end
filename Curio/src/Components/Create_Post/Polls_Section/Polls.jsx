import React from "react";
import { useState } from "react";
import "./Polls.css";
import Text_Editor from "../../Text_Editor/Text_Editor";
import InfoIcon from "../../../styles/icons/InfoIcon";
import SixDots from "../../../styles/icons/SixDots";
import Remove from "../../../styles/icons/Remove";

function Polls() {
  const [options, setOptions] = useState([]);
  const [dayNumber, setDayNumber] = useState(null);
  const [optionsText, setoptionsText] = useState(['', '']);
  const maxOptions = 4;


  const handleDayChange = (event) => {
    setDayNumber(event.target.value);
  };

  const handleAddOption = () => {
    if (options.length < maxOptions) {
      setOptions([...options, `Option ${options.length + 3}`]);
    }
  };

  const handleRemoveOption = () => {
      setOptions(options.slice(0, options.length - 1));
  };

  const handleFirstOptionChange = (event) => {
    setoptionsText([event.target.value, optionsText[1]]);
  };

  const handleSecondOptionChange = (event) => {
    setoptionsText([optionsText[0], event.target.value]);
  };

  return (
    <div className="flex-wrap pollPage">
      <Text_Editor />
      <div className="container flex-wrap cont-div">
        <div className="row row-cols-2" style={{height: 'fit-content'}}>
          <div className="col-8">
          <div className="d-flex align-items-center mt-2">
            <SixDots />
            <input
              type="text"
              className="pollOption"
              placeholder='Option 1'
              value={optionsText[0]}
              onChange={handleFirstOptionChange}
            />
          </div>
          <div className="d-flex align-items-center mt-2">
            <SixDots />
            <input
              type="text"
              className="pollOption"
              placeholder='Option 2'
              value={optionsText[1]}
              onChange={handleSecondOptionChange}
            />
          </div>
          {options.map((option, index) => (
              <div className="d-flex align-items-center mt-2" key={index}>
                <SixDots />
                <div className="d-flex w-100 inputText">
                <input
                  type="text"
                  className="pollOption"
                  placeholder={option}
                />
                <button onClick={handleRemoveOption}>
                  <Remove className='removeIcon' />
                </button>
                </div>
              </div>
            ))}
            <div className="container btn-time-container">
              <div className="row row-cols-md-2" style={{height: 'fit-content'}}>
                <div className='col mt-2'>
              <button className="addOptionBtn" onClick={handleAddOption}>Add Option</button>
              </div>
              <div className="col">
              <div className="d-flex align-items-center mt-1 votingLengthContainer">
                <div className="votingLength">Voting Length:</div>
                <div>
                  <select name="cars" id="cars" className="daysDropDown" onChange={handleDayChange}>
                    <option value="1">1 Day</option>
                    <option value="2">2 Days</option>
                    <option value="3">3 Days</option>
                    <option value="4">4 Days</option>
                    <option value="5">5 Days</option>
                    <option value="6">6 Days</option>
                    <option value="7">7 Days</option>
                  </select>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 tipsDiv">
            <div className="d-flex mt-3 p-0 mb-0">
              <InfoIcon />
              <p className="pollTips ms-1">Tips on Better Polls</p>
            </div>
            <ol className="d-flex flex-column orderedTips">
              <li>Suggest short clear options</li>
              <li>The more options, the better</li>
              <li>Choose the poll duration</li>
              <li className="lastTip">Options can't be edited after post creation</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Polls;