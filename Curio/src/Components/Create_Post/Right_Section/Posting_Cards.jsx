import React from 'react';
import "./Posting_Cards.css";
import Posting_rules from "./Posting_rules";
import Community_details from "./Community_details";

function Posting_Cards() {
  return (
    <div className='postingContainer'>
        <Community_details/>
        <Posting_rules/>
    </div>
  );
}

export default Posting_Cards;
