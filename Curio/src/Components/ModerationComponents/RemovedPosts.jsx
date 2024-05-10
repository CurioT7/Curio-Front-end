import React from "react";
import avatar from "../../assets/avatar_default_6.png";
import "./Unmoderated.css";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import Upvotes from "../../styles/icons/Upvotes";
import Downvotes from "../../styles/icons/Downvotes";
import Close from "../../styles/icons/Close";
import { OverlayTrigger, Popover } from "react-bootstrap";
import Ellipsis from "../../styles/icons/Elippsis";
import { MdOutlineReport } from "react-icons/md";
import { GoLock } from "react-icons/go";
import ProfileImg from "../../styles/icons/ProfileImg";
import { getTimeDifference } from "../../Components/getTimeDifference/getTimeDifference.js";
import { Text } from '@chakra-ui/react'
import ShareIcon from "../../styles/icons/ShareIcon.jsx";
import Rep from "../../styles/icons/Rep.jsx";
import HideIcon from "../../styles/icons/HideIcon.jsx";
import { PiTrafficCone } from "react-icons/pi";
import eighteenPlus from "../../assets/icons8-18-plus-50.png";
import OC from "../../assets/icons8-oc-50.png";
import { SendLockedPost, SendUnlockedPost } from "../Post/PostEndPoints.js";
import { markasNSFW, unmarkasNSFW, approveRemovedPosts, removePost } from "./UnmoderatedEndpoints.js";



/**
 * Represents a component for displaying removed posts.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props._id - The ID of the post.
 * @param {string} props.authorName - The name of the post author.
 * @param {string} props.createdAt - The creation date of the post.
 * @param {string} props.title - The title of the post.
 * @param {string} props.content - The content of the post.
 * @param {number} props.upvotes - The number of upvotes for the post.
 * @param {number} props.downvotes - The number of downvotes for the post.
 * @param {Array} props.comments - The comments on the post.
 * @param {string} props.myusername - The username of the current user.
 * @param {boolean} props.isLocked - Indicates if the post is locked.
 * @param {boolean} props.isNSFW - Indicates if the post is marked as NSFW (Not Safe for Work).
 * @module ModerationRemovedPosts
 */
function RemovedPosts( props ) {
  const [checked, setChecked] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isApproved, setisApproved] = useState(false);
  const [isRemoved, setisRemoved] = useState(false);
  const [didRespond, setDdidRespond] = useState(false);
  const [isLocked, setisLocked] = useState(false);
  const [isNSFW, setisNSFW] = useState(false);
  const _id = props._id;
  
  const handleshowOptions = () => {
    setShowOptions(!showOptions);
};


  const handleClick = () => {
    setChecked(!checked);
  };



  const handleApprovePost =  async (id, post, commName) => {
    const response = await approveRemovedPosts(id, post, commName);
    if(response){
      setisApproved(true);
      setisRemoved(false);
      setDdidRespond(true);
    }
  }

  
  const handleRemovePost =  async (id, post, commName, reason) => {
    const response = await removePost(id, post, commName);
    if(response){
      setisApproved(false);
      setisRemoved(true);
      setDdidRespond(true);
      setRemovalReason(reason);
    }
  }

  const handleLockedPost = async (id) => {
    const response = await SendLockedPost(id);
    if(response){
      setisLocked(true);
    }
  }

  const handleUnlockedPost = async (id) => {
    const response = await SendUnlockedPost(id);
    if(response){
      setisLocked(false);
    }
  }

  const handleSetNSFW = async (id) => {
    const response = await markasNSFW(id);
    if(response){
      setisNSFW(true);
    }
  }

  const handleDisableNSFW = async (id) => {
    const response = await unmarkasNSFW(id);
    if(response){
      setisNSFW(false);
    }
  }

  useEffect(() => {
    if(props.isLocked){
      setisLocked(true);
    }
    if(props.isNSFW){
      setisNSFW(true);
    }
  } ,[]);

  useEffect(() => {
    setisRemoved(true);
  }, []);

  return(
      <div className="container postsContainerDiv mt-2">
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
              {props.upvotes-props.downvotes}
            </div>
            <div className="d-flex justify-content-center">
            </div>
        </div>
        <div className="col-11">
          <img src={avatar} className="avatarimg" alt="avatar" />
          <span className="me-1 ms-1 UserNameText">u/{props.authorName}</span>
          <span className="me-1">&#183;</span>
          <span className="me-2 postTime  ">Posed by u/{props.authorName}</span>
          <span className="postTime me-3">{getTimeDifference(props.createdAt)} ago</span>
          {isLocked ? <GoLock style={{display: 'inline-block'}} /> : null}
          {isNSFW ? <span className="ms-2 notSafefor">nsfw</span> : null}
          <div>
            <h6 className="mt-2 TitleText2">{props.title}</h6>
          </div>
          <div>
          <Text className='PostText' dangerouslySetInnerHTML={{ __html: props.content}}></Text> 
          </div>
          <p className="commentCss">{props.comments.length} comments</p>
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
                u/{props.myusername} 2hours ago
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
                u/{props.myusername} 2hours ago
                </div>
                </div>
            </div>
          }
          <div className="d-flex align-items-center">
            {!isApproved && isRemoved ? (
                <>
                    <button className="me-3 ApproveButton1">Add Removal Reason</button>
                    <button className="me-3 ApproveButton1" onClick={() => {handleApprovePost(props._id, 'post', props.community)}}><FaCheck style={{display: 'inline-block', fontSize: '10px'}} /> Approve</button>
                </>
            ) : null}
            <OverlayTrigger
            
              trigger="click"
              placement="top"
              show={showOptions}
              rootClose={true}
              overlay={
                <Popover id="optionsToggle">
                  <div>
                    <div className="dropdownReport ms-2">
                      Moderation
                    </div> 
                    {!isLocked ? (
                    <div className="dropdownComponents1" onClick={() => {handleLockedPost(props._id)}}>
                      <GoLock style={{display: 'inline-block'}}/>Lock Comments
                    </div>
                    ) : (
                      <div className="dropdownComponents1" onClick={() => {handleUnlockedPost(props._id)}}>
                      <GoLock style={{display: 'inline-block' }} />Unlock Comments
                    </div>
                    )
                  }
                  
                    <div className="dropdownComponents1">
                      <img src={OC} style={{display: 'inline-block',  height:'20px'}}/>Mark as OC
                    </div>
                    {!isNSFW ? (
                    <div className="dropdownComponents1" onClick={() => {handleSetNSFW(props._id)}}>
                      <img src={eighteenPlus} style={{display: 'inline-block', height:'20px'}}/>Mark as NSFW
                    </div>
                    ) :  (
                      <div className="dropdownComponents1" onClick={() => {handleDisableNSFW(props._id)}}>
                      <img src={eighteenPlus} style={{display: 'inline-block', height:'20px'}}/>Unmark as NSFW
                    </div>
                    )
                    }
                    <div className="dropdownComponents">
                      <PiTrafficCone style={{display: 'inline-block'}}/>Adjust Crowd Control
                    </div>
                    <div className="dropdownReport ms-2">
                      Other
                    </div>
                    <div className="dropdownComponents2">
                        <ShareIcon />Share
                    </div> 
                    <div className="dropdownComponents1">
                      <Rep style={{display: 'inline-block'}}/>Report
                    </div>
                    <div className="dropdownComponents">
                      <HideIcon style={{display: 'inline-block'}}/>Hide
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
  );
}

export default RemovedPosts;


