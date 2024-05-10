import React from "react";
import './header.css';

/**
 * Renders the header component for the moderation page.
 * @module ModerationHeader
 */
function Header() {
  return (
    <div className="contDivv" style={{marginTop: '4rem'}}>
      <div className="d-flex align-items-center headerDivv">
        <a className="subredditName" style={{marginLeft:'20px'}}>SUBREDDIT NAME</a>
        / MOD QUEUE
      </div>
      <hr className="fullWidthHr"/>
    </div>
  );
}

export default Header;