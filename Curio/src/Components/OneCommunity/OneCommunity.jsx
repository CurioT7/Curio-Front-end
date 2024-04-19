import React, { useState, useRef } from 'react';
import '../UserPopover.css/UserPopover.jsx';
import "./OneCommunity.css";
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Community({ index, name, category, members, picture }) {

  const [show, setShow] = useState(false);
  const target = useRef(null);
  const [showPopover, setShowPopover] = useState(false);

  const navigate = useNavigate();

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
      <>
  <OverlayTrigger
    trigger={['hover', 'focus']}
    placement="bottom"
    show={showPopover}
    overlay={
      <Popover
        id="overlay-example"
        onMouseEnter={() => setShowPopover(true)}
        onMouseLeave={() => setShowPopover(false)}
      >
        <div className='d-flex align-items-center p-2 popOverHeader'>
          <img src={picture} alt="reddit figure" className="reddit-figure1" />
          r/{name}
        </div>
        <div className='container mt-2'>
          <div className='row row-cols-2 powerOverRow'>
            <div className='col popOverCol text-start'>
              <h6 className='numbersHeader'>{members}</h6>
              <p className='membersText'>Members</p>
            </div>
            <div className='col popOverCol text-start'>
              <h6 className='numbersHeader'>0</h6>
              <p className='membersText'>Online</p>
            </div>
          </div>
        </div>
        <h5 className='commuDescription text-start mt-2 mb-4 ms-2'>Reddit's largest humor depository</h5>
        <div className='d-flex w-100'>
          <button className='d-flex w-100 mx-auto text-center viewCommButton align-items-center' onClick={() => navigate(`/r/${name}`)}>View Community</button>
        </div>
      </Popover>
    }
  >
    <h6 className="commName" onMouseEnter={() => setShowPopover(true)} onMouseLeave={() => setShowPopover(false)}>
      r/{name}
    </h6>
  </OverlayTrigger>
</>
        <h6 className="commCategory">{category}</h6>
        <h6 className="commMembers">{members} members</h6>
      </div>
    </div>
  );
}

export default Community;