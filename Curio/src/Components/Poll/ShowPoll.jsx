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



function ShowPoll() {
  const [votepick, setVotepick] = useState("");

  const handleVote = (event) => {
    setVotepick(event.target.value);
  };

  return (
    <div className="col-md-6 d-flex p-3 posts-container flex-column">
      <div className="pollDiv p-2">
        <div>
          <div className="d-flex align-items-center">
            <img src={profilephoto} className="postPhoto" />
            <span className="profileName ms-1">u/OldPatience</span>
            <span className="ms-2 middleDot"> &#183;</span>
            <span className="ms-2 postTime"> 1 hr. ago</span>
          </div>
          <div className="pollTitle">What is your favourite food?</div>
          <div className="pollText">
            What type of food do you like the most?
          </div>
        </div>
        <Card className="mx-2 pollCard">
          <Card.Header className="d-flex cardheaderDiv align-items-center">
            <span className="openorClose">Open</span>
            <span className="ms-1 middleDot1"> &#183;</span>
            <span className="postTime ms-1"> 500 total votes</span>
          </Card.Header>
          <Card.Body>
            <div>
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
            </div>
            <div className="d-flex adjust-items-center">
              <button
                className={`voteButton ${
                  votepick === "" ? "voteButton-disabled" : "voteButton-enabled"
                }`}
                id="voteButton"
                disabled={votepick === "" ? true : false}
              >
                Vote
              </button>
              <span className="ms-3 closesIn">Closes in 3 days</span>
            </div>
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
