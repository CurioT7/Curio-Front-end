import React from "react";
import { useState, useEffect } from "react";
import "./ShowPoll.css";
import profilephoto from "../../assets/profilephoto.webp";
import Card from "react-bootstrap/Card";
import Check from "../../styles/icons/Check";
import { Text } from '@chakra-ui/react'
import { pollVote, getPollInfo } from "./ShowPollEndpoints";
import { get } from "mongoose";
import { useNavigate } from "react-router-dom";
import { getPollTimeDifference, getDaysCountdown } from "../getTimeDifference/getTimeDifference";



function ShowPoll( props ) {
  const [votepick, setVotepick] = useState("");
  const [hasVoted, setVoted] = useState(false);
  const [votes, setVotes] = useState([]);
  const navigate = useNavigate();

  const countdown = getDaysCountdown(props.voteLength);
  countdown.start();

  const handleVote = (event) => {
    setVotepick(event.target.value);
  };
  
  const handleVoted = () => {
    setVoted(true)
  }
  
  
    async function handlepollVote(_id, votepick){
      if(!localStorage.getItem('token')){
        navigate('/login');
      }
      else{
      const response = await pollVote(_id, votepick)
      if(response.success){
        const newVotes = await getPollInfo(_id);
        if(newVotes.success){
          setVotes(newVotes.item.options.map((option) => option.votes));
          handleVoted();
        }
      }
    }
  }

  const _id = props._id;

  const maxVoteNumber = Math.max(...props.votes);
  const normalizeNumbers = (numbers) => {
    const sum = numbers.reduce((acc, number) => acc + number, 0);
    
    if (sum === 0) {
      return numbers.slice();
    }
  
    const avg = sum / numbers.length;
    return numbers.map((number) => (number / avg) * 200);
  };

  const voteArray = normalizeNumbers(votes);

  const displayArray = normalizeNumbers(props.votes);

  const newtotalVotesnum = votes.reduce((acc, number) => acc + number, 0);

  const totalVotesnum = props.votes.reduce((acc, number) => acc + number, 0);



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
            
            <span className="openorClose">{props.pollEnded? 'Closed' : 'Open'}</span>
            <span className="ms-1 middleDot1"> &#183;</span>
            {hasVoted? (
            <span className="postTime ms-1"> {newtotalVotesnum} total votes</span>
            ):
            (
            <span className="postTime ms-1"> {totalVotesnum} votes</span>
            )}
            
          </Card.Header>
          <Card.Body>
          {hasVoted || props.didVote || props.pollEnded ? (
  <>
    {props.optionNames.map((option, index) => {
      const voteCount = votepick === option ? props.votes[index] + 1 : props.votes[index];
      const backgroundColor = voteCount >= maxVoteNumber ? 'rgb(255, 190, 166)' : 'rgb(226, 231, 233)';
      return (
        <div
        style={{ backgroundColor, width: `${hasVoted ? voteArray[index] : displayArray[index]}px`, borderRadius: '4px' }}          
        className="d-flex mb-2 ms-2"
          key={index}
        >
          <div className="d-flex">
            <span className="me-4 voteNumbers">{voteCount}</span>
            <span className="voteText me-2">{option}</span>
            {votepick === option || props.optionSelected === option ? <Check /> : null}
          </div>
        </div>
      );
    })}
      {props.pollEnded &&
    <div className="mt-4 postTime">
      Voting closed {getPollTimeDifference(props.createdAt, props.voteLength)} ago
    </div>
}
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
                onClick={() => {handlepollVote(props._id, votepick)}}
              >
                Vote
              </button>
              <span className="ms-3 closesIn">Closes in {countdown.getRemainingTime()}</span>
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