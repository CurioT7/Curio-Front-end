import React from "react";
import { useState } from "react";
import "./ShowPoll.css";
import profilephoto from '../../assets/profilephoto.webp';
import Card from 'react-bootstrap/Card';

function ShowPoll() {


    return(
      <div className='col-md-6 d-flex p-3 posts-container flex-column'>
        <div className="pollDiv p-2">
          <div>
              <div className="d-flex align-items-center">
            <img src={profilephoto} className='postPhoto' />
            <span className="profileName ms-1">u/OldPatience</span>
            <span className="ms-2 middleDot">  &#183;</span>
            <span className="ms-2 postTime"> 1 hr. ago</span>
            </div>
            <div className="pollTitle">What is your favourite food?</div>
            <div className="pollText">What type of food do you like the most?</div>
          </div>
          <Card className='mx-2 pollCard'>
          <Card.Header className="d-flex cardheaderDiv align-items-center">
          <span className="openorClose">Open</span>
            <span className="ms-1 middleDot1">  &#183;</span>
            <span className="postTime ms-1"> 500 total votes</span>
        </Card.Header>
        <Card.Body>
        <div>
          <input className="voteRadio"
              type="radio"
              name="vote"
              value="Fish"
          />
          <span className="voteText">Fish</span>
      </div>
      <div>
          <input className="voteRadio"
              type="radio"
              name="vote"
              value="Meat"
          />
          <span className="voteText">Meat</span>
      </div>
      <div>
          <input className="voteRadio"
              type="radio"
              name="vote"
              value="Chicken"
          />
          <span className="voteText">Chicken</span>
      </div>
      <div className="d-flex adjust-items-center">
        <button className="voteButton">Vote</button>
        <span className="ms-3 closesIn">Closes in 3 days</span>
      </div>
        </Card.Body>
        </Card>
        
        </div>
      </div>
    ); 
}

export default ShowPoll;
