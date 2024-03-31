import React from 'react';
import "./OneCommunity.css";


function Community({ index, name, category, members, picture }) {
  const backgroundColor = Math.floor(index / 4) % 2 === 0 ? 'columnBack' : 'columnBack1';

  return (
    <div className={`col d-flex justify-content-start align-items-center ${backgroundColor}`}>
      <div className="d-flex p-2 me-3 align-items-center number">
        {index + 1}
      </div>
      <div className="d-flex p-2 align-items-center">
        <img src={picture} alt="reddit figure" className="reddit-figure" />
      </div>
      <div className="d-flex flex-column">
        <h6 className="commName">{name}</h6>
        <h6 className="commCategory">{category}</h6>
        <h6 className="commMembers">{members} members</h6>
      </div>
    </div>
  );
}

export default Community;