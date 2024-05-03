import React from "react";
import { useState, useEffect } from "react";
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
import axios from "axios";
import { Text } from '@chakra-ui/react'
import { pollVote } from "./ShowPollEndpoints";



function ShowPoll( props ) {
  // const [votepick, setVotepick] = useState("");
  // const [hasVoted, setVoted] = useState(false);
  const _id = props._id;

  const maxVoteNumber = Math.max(...props.votes);
  const normalizeNumbers = (numbers) => {
    const sum = numbers.reduce((acc, number) => acc + number, 0);
    
    if (sum === 0) {
      return numbers.slice();
    }
  
    const avg = sum / numbers.length;
    return numbers.map((number) => (number / avg) * 100);
  };

  const newArray = normalizeNumbers(props.votes);

  const totalVotesnum = props.votes.reduce((acc, number) => acc + number, 0);

  const [votepick, setVotepick] = useState("");
  const [hasVoted, setVoted] = useState(false);

    const handleVote = (event) => {
  setVotepick(event.target.value);
};

const handleVoted = () => {
  setVoted(true)
}


  async function handlepollVote(_id, votepick){
    const response = await pollVote(_id, votepick)
    if(response.sucess){
      setVoted(true);
    }
  }

  return (
    <>
    <div className="d-flex flex-column">
      <div className="pollDiv p-2">
        <div onClick={props.handleNavigation}>
      <div className="pollTitle">{props.pollTitle}</div>
          <div className="pollText">
          <Text dangerouslySetInnerHTML={{ __html: props.pollText}}>
          </Text>
          </div>
          </div>
        <Card className="mx-2 pollCard">
          <Card.Header className="d-flex cardheaderDiv align-items-center">
            <span className="openorClose">Open</span>
            <span className="ms-1 middleDot1"> &#183;</span>
            {hasVoted? (
            <span className="postTime ms-1"> {totalVotesnum + 1} total votes</span>
            ):
            (
            <span className="postTime ms-1"> {totalVotesnum} votes</span>
            )}
            
          </Card.Header>
          <Card.Body>
          {hasVoted ? (
  <>
    {props.optionNames.map((option, index) => {
      const voteCount = votepick === option ? props.votes[index] + 1 : props.votes[index];
      const backgroundColor = voteCount >= maxVoteNumber ? 'rgb(255, 190, 166)' : 'rgb(226, 231, 233)';

      return (
        <div
          style={{ backgroundColor, width: `${newArray[index]}px`, borderRadius: '4px' }}
          className="d-flex mb-2 ms-2"
          key={index}
        >
          <div className="d-flex">
            <span className="me-4 voteNumbers">{voteCount}</span>
            <span className="voteText me-2">{option}</span>
            {votepick === option ? <Check /> : null}
          </div>
        </div>
      );
    })}
  </>
) : (
              <>
            {props.optionNames.map((option, index) => (
              <div style={{backgroundColor: 'transparent'}} className="ms-3" key={index}>
                <input
                  className="voteRadio"
                  type="radio"
                  name="vote"
                  value={option}
                  onClick={handleVote}
                />
                <span style={{backgroundColor: 'transparent'}} className="voteText">{option}</span>
              </div>
            ))}
            <div className="d-flex adjust-items-center" style={{backgroundColor: 'transparent'}}>
              <button
                className={`voteButton mb-2 ms-2 ${
                  votepick === "" ? "voteButton-disabled" : "voteButton-enabled"
                }`}
                id="voteButton"
                disabled={votepick === "" ? true : false}
                onClick={() => {handleVoted(); handlepollVote(props._id, votepick)}}
              >
                Vote
              </button>
              <span className="ms-3 closesIn">Closes in {props.voteLength} days</span>
            </div>
            </>)}
          </Card.Body> 
        </Card>
      </div>
    </div>
    </>
  );
}

export default ShowPoll;