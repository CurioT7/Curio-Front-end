import React from 'react';
import "./Posting_Cards.css";
import Posting_rules from "./Posting_rules";
import Community_details from "./Community_details";

function Posting_Cards(community) {
  return (
    <div className='postingContainer'>
        <Community_details community={community}/>
        <Posting_rules/>
    </div>
  );
}

export default Posting_Cards;
