/**
 * Component for creating a poll.
 * @component
 * @param {Object} props - The props object containing the component's properties.
 * @param {Function} props.handleDayChange - Function to handle the change in voting length.
 * @param {Function} props.handleOptionChange - Function to handle the change in poll options.
 * @param {Function} props.handleAddOption - Function to add a new option to the poll.
 * @param {Function} props.handleRemoveOption - Function to remove an option from the poll.
 * @param {Array} props.options - Array containing poll options.
 * @param {Function} props.onContentChange - Function to handle the change in poll content.
 * @module Polls
 */
import React from "react";
import { useState } from "react";
import "./Polls.css";
import Text_Editor from "../../Text_Editor/Text_Editor";
import InfoIcon from "../../../styles/icons/InfoIcon";
import SixDots from "../../../styles/icons/SixDots";
import Remove from "../../../styles/icons/Remove";

function Polls( {handleDayChange, handleOptionChange, handleAddOption, handleRemoveOption, options, onContentChange }) {


  return (
    <div className="flex-wrap pollPage">
      <Text_Editor onContentChange={onContentChange} />
      <div className="container flex-wrap cont-div">
        <div className="row row-cols-2" style={{height: 'fit-content'}}>
          <div className="col-8">
          <div className="d-flex align-items-center mt-2">
            <SixDots />
            <input
              type="text"
              className="pollOption"
              placeholder='Option 1'
              onChange={(event) => handleOptionChange(0,event)}
            />
          </div>
          <div className="d-flex align-items-center mt-2">
            <SixDots />
            <input
              type="text"
              className="pollOption"
              placeholder='Option 2'
              onChange={(event) => handleOptionChange(1, event)}
            />
          </div>
          {options.map((option, index) => (
              <div className="d-flex align-items-center mt-2" key={index + 2}>
                <SixDots />
                <div className="d-flex w-100 inputText">
                <input
                  type="text"
                  className="pollOption"
                  placeholder={option} 
                  onChange={(event) => handleOptionChange(index + 2, event)}
                />
                <button onClick={() => handleRemoveOption(index)}>
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
                  <select name="voteLength" id="voteLength" className="daysDropDown" defaultValue="3" onChange={handleDayChange}>
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