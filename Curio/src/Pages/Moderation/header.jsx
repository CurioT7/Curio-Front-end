import React from "react";
import './header.css';

function Header() {
  return (
    <div className="contDivv">
      <div className="d-flex align-items-center headerDivv">
        <a className="subredditName" style={{marginLeft:'20px', marginTop: ''}}>SUBREDDIT NAME</a>
        / MOD QUEUE
      </div>
      <hr style={{width: '100%', marginBottom: '7px'}}/>
    </div>
  );
}

export default Header;