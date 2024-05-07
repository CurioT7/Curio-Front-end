import React from "react";
import avatar from "../../assets/avatar_default_6.png";
import "./Unmoderated.css";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useState } from "react";
import Upvotes from "../../styles/icons/Upvotes";
import Downvotes from "../../styles/icons/Downvotes";
import Close from "../../styles/icons/Close";
import { OverlayTrigger, Popover } from "react-bootstrap";
import Ellipsis from "../../styles/icons/Elippsis";
import { MdOutlineReport } from "react-icons/md";
import { GoLock } from "react-icons/go";
import ProfileImg from "../../styles/icons/ProfileImg";
import { set } from "mongoose";


function Unmoderated() {
  const [checked, setChecked] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isApproved, setisApproved] = useState(false);
  const [isRemoved, setisRemoved] = useState(false);
  const [didRespond, setDdidRespond] = useState(false);
  
  const myusername = localStorage.getItem("username");
const handleshowOptions = () => {
    setShowOptions(!showOptions);
};

  const handleClick = () => {
    setChecked(!checked);
  };

  const handleisApproved = () => {
    setisApproved(true);
    setisRemoved(false);
    setDdidRespond(true);
  };

  
  const handleisRemoved = () => {
    setisRemoved(true);
    setisApproved(false);
    setDdidRespond(true);
  };

  return (
    <div>
      <div className="">
        <div className="mt-3 mb-2">
          <select name="newOld" id="newOld" className="neworOldsort1">
            <option value="newest first" className="optionscss">
              Newest First
            </option>
            <option value="oldest first" className="optionscss">
              Oldest First
            </option>
          </select>
          <div className="chosenItemsDiv row">
            <div className="col-1 approveBox">
              <i
                className={`mt-1 ms-1 CheckBox ${checked ? "Checkedtrue" : ""}`}
                onClick={handleClick}
              >
                {checked && <FaCheck />}
              </i>
            </div>
            <div className="col-11 d-flex justify-content-end align-items-center">
              <span className="items-selected">
                Items 1-3 &#183; 0 selected{" "}
              </span>
            </div>
          </div>
        </div>
        <div className="container postsContainerDiv">
        <div className="row" style={{height: 'fit-content'}}>
          <div className="col">
            <div className="d-flex justify-content-center mb-2">
          <i
                className={`ms-1 CheckBox ${checked ? "Checkedtrue" : ""}`}
                onClick={handleClick}
              >
                {checked && <FaCheck />}
              </i>
              </div>
              <div className="d-flex justify-content-center">
                <Upvotes />
              </div>
              <div className="d-flex justify-content-center likesNomber mt-2 mb-2">
                1
              </div>
              <div className="d-flex justify-content-center">
                <Downvotes />
              </div>
          </div>
          <div className="col-11">
            <img src={avatar} className="avatarimg" alt="avatar" />
            <span className="me-1 ms-1 UserNameText">u/username</span>
            <span className="me-1">&#183;</span>
            <span className="me-2 postTime  ">Posted by u/username</span>
            <span className="postTime">25 min. ago</span>
            <div>
              <h6 className="mt-2 TitleText2">Title</h6>
            </div>
            <div>
              <p className="PostText">Content of the post</p>
            </div>
            <p className="commentCss">0 comments</p>
            {isApproved &&
             <div className="approvedDiv mb-2 d-flex ps-3 py-1">
              <div className="d-flex align-items-center">
                <img src={avatar} className="avatarimg" />
                </div>
                <div className="d-flex flex-column ms-2">
              <div style={{fontSize: '12px', fontWeight: '700'}}>
                Approved
                </div>
                <div style={{fontSize: '12px'}}>
                  u/{myusername} 2hours ago
                  </div>
                  </div>
              </div>
            }
            {isRemoved &&
              <div className="removedDiv mb-2 d-flex ps-3 py-1">
              <div className="d-flex align-items-center">
                <img src={avatar} className="avatarimg" />
                </div>
                <div className="d-flex flex-column ms-2">
              <div style={{fontSize: '12px', fontWeight: '700'}}>
                Removed
                </div>
                <div style={{fontSize: '12px'}}>
                  u/{myusername} 2hours ago
                  </div>
                  </div>
              </div>
            
            }
            <div className="d-flex align-items-center">
              {!didRespond && <>
              <button className="me-3 ApproveButton" onClick={handleisApproved}><FaCheck style={{display: 'inline-block', fontSize: '10px'}} /> Approve</button>
              <button className="RemoveButton" onClick={handleisRemoved}><Close />Remove</button>
              </>
              }
              {isApproved && !isRemoved ? (
              <button className="RemoveButton" onClick={handleisRemoved}><Close />Remove</button>
              ) : (
                <>
               <button className="me-3 ApproveButton1">Add Removal Reason</button>
              <button className="me-3 ApproveButton1" onClick={handleisApproved}><FaCheck style={{display: 'inline-block', fontSize: '10px'}} /> Approve</button>
              </>
              )}
              <OverlayTrigger
                trigger="click"
                placement="top"
                show={showOptions}
                overlay={
                  <Popover id="optionsToggle">
                    <div>
                      <div className="dropdownReport">
                        Moderation
                      </div>
                      <div className="dropdownComponents1">
                          <MdOutlineReport style={{display: 'inline-block'}} />Remove As Spam
                      </div>  
                      <div className="dropdownComponents">
                        <GoLock style={{display: 'inline-block'}}/>Lock Comments
                      </div>
                    </div>
                  </Popover>
                }
              >
                <button
                  className="ms-3 showCommsbtn"
                  onClick={handleshowOptions}
                >
                <Ellipsis />
                </button>
              </OverlayTrigger>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Unmoderated;
