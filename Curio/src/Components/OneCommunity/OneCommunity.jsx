import React, { useState, useRef } from 'react';
import '../CommunityPopup/CommunityPopup.jsx';
import "./OneCommunity.css";
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import { Link } from 'react-router-dom';


function Community({ index, name, category, members, picture }) {

  const [show, setShow] = useState(false);
  const target = useRef(null);


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
        <h6 className="commName" ref={target} onClick={() => setShow(!show)}>{name}</h6>
        <div>
        <Overlay className='popo44' target={target.current} show={show} placement="bottom">
        {(props) => (
          <Tooltip className='popOverEdit' id="overlay-example" {...props}>
            <div className='d-flex align-items-center p-2 popOverHeader'>
            <img src={picture} alt="reddit figure" className="reddit-figure1" />
              r/{name}
            </div>
            <div className='container'>
              <div className='row row-cols-2 powerOverRow'>
                <div className='col popOverCol '>
                <h6>{members}</h6>
                <p className='membersText'>Members</p>
                </div>
                <div className='col popOverCol'>
                  7amada
                </div>
              </div>

            </div>
            <div classname='d-flex w-100'>
            <Link to={`/r/${name}`}>
             <button className='d-flex w-100 mx-auto text-center viewCommButton'>View Community </button> 
            </Link>
            </div>
          </Tooltip>
        )}
      </Overlay>
      </div>
    </>
        <h6 className="commCategory">{category}</h6>
        <h6 className="commMembers">{members} members</h6>
      </div>
    </div>
  );
}

export default Community;