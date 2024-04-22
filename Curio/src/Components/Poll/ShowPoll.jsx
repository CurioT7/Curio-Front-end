import React from "react";
import { useState } from "react";
import "./ShowPoll.css";
import profilephoto from "../../assets/profilephoto.webp";
import Card from "react-bootstrap/Card";
import FilledUpvote from "../../styles/icons/FilledUpvote";
import Upvotes from "../../styles/icons/Upvotes";
import Downvotes from "../../styles/icons/Downvotes";
import { FaRegCommentAlt } from "react-icons/fa";
import { LuShare } from "react-icons/lu";
import Postsfooter from "../Post/Postsfooter";
import Check from "../../styles/icons/Check";



function ShowPoll() {
  const [votepick, setVotepick] = useState("");
  const [hasVoted, setVoted] = useState(false);

  const backendObject = {
    pollTitle: "What is your favourite food?",
    pollText: "What type of food do you like the most?",
    voteOptions: ["Fish", "Meat", "Chicken"],
    totalVotes: 500,
    voteLength: 3,
    voteNumbers: [123, 15, 3],
  }

  const maxVoteNumber = Math.max(...backendObject.voteNumbers);
  const normalizeNumbers = (numbers) => {
    let sum = 0;
    numbers.forEach((number) => {
      sum += number;
    });
    let avg = sum / numbers.length;
    
    let newArray = [];
    numbers.forEach((number) => {
      let newNumber = number / avg * 100;
      newArray.push(newNumber);
    });
    
    return newArray;
  };

  const newArray = normalizeNumbers(backendObject.voteNumbers);

  const handleVote = (event) => {
    setVotepick(event.target.value);
  };

  const handleVoted = () => {
    setVoted(true)
  }


  return (
    <div className=" d-flex p-3 posts-container flex-column">
      <div className="pollDiv p-2">
        <div>
          <div className="d-flex align-items-center">
            <img src={profilephoto} className="postPhoto" />
            <span className="profileName ms-1">u/OldPatience</span>
            <span className="ms-2 middleDot"> &#183;</span>
            <span className="ms-2 postTime"> 1 hr. ago</span>
          </div>
          <div className="pollTitle">{backendObject.pollTitle}</div>
          <div className="pollText">
            {backendObject.pollText}
          </div>
        </div>
        <Card className="mx-2 pollCard">
          <Card.Header className="d-flex cardheaderDiv align-items-center">
            <span className="openorClose">Open</span>
            <span className="ms-1 middleDot1"> &#183;</span>
            <span className="postTime ms-1"> {backendObject.totalVotes} total votes</span>
          </Card.Header>
          <Card.Body>
            {hasVoted? (<>
            {backendObject.voteOptions.map((option, index) => (
              <div style={{backgroundColor: backendObject.voteNumbers[index] === maxVoteNumber ? 'rgb(255, 190, 166)' : 'rgb(226, 231, 233)',
              width: `${newArray[index]}px`, borderRadius: '4px'}} className="d-flex mb-2">
                <div key={index} className="d-flex">
                  <span className="me-4 voteNumbers">{backendObject.voteNumbers[index]}</span>
                  <span className="voteText me-2">{option}</span>
                  {votepick === option ? <Check /> : null}
                </div>
              </div>
            ))}
            {/* <div className="d-flex">
              <span className="me-4 voteNumbers">123</span>
              <span className="voteText">Fish</span>
            </div>
            <div>
            <span className="me-4 voteNumbers">15</span>
              <span className="voteText">Meat</span>
            </div>
            <div>
            <span className="me-4 voteNumbers">3</span>
              <span className="voteText">Chicken</span>
            </div> */}
            </>) : (
              <>
            {backendObject.voteOptions.map((option, index) => (
              <div key={index}>
                <input
                  className="voteRadio"
                  type="radio"
                  name="vote"
                  value={option}
                  onClick={handleVote}
                />
                <span className="voteText">{option}</span>
              </div>
            ))}
            {/* <div>
              <input
                className="voteRadio"
                type="radio"
                name="vote"
                value="Fish"
                onClick={handleVote}
              />
              <span className="voteText">Fish</span>
            </div>
            <div>
              <input
                className="voteRadio"
                type="radio"
                name="vote"
                value="Meat"
                onClick={handleVote}
              />
              <span className="voteText">Meat</span>
            </div>
            <div>
              <input
                className="voteRadio"
                type="radio"
                name="vote"
                value="Chicken"
                onClick={handleVote}
              />
              <span className="voteText">Chicken</span>
            </div> */}
            <div className="d-flex adjust-items-center">
              <button
                className={`voteButton ${
                  votepick === "" ? "voteButton-disabled" : "voteButton-enabled"
                }`}
                id="voteButton"
                disabled={votepick === "" ? true : false}
                onClick={handleVoted}
              >
                Vote
              </button>
              <span className="ms-3 closesIn">Closes in {backendObject.voteLength} days</span>
            </div>
            </>)}
          </Card.Body> 
        </Card>
        <div className="d-flex mt-2 ms-3">
          <Postsfooter />
        </div>
      </div>
    </div>
  );
}

export default ShowPoll;