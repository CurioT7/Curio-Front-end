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
import { CiSquareRemove } from "react-icons/ci";
import { AiOutlineStop } from "react-icons/ai";
import { CiCircleCheck } from "react-icons/ci";
import { GoLock } from "react-icons/go";
import ProfileImg from "../../styles/icons/ProfileImg";
import { fetchUnmoderatedPostsFromBackend } from "./UnmoderatedEndpoints.js";
import { getTimeDifference } from "../../Components/getTimeDifference/getTimeDifference.js";
import { Text } from '@chakra-ui/react'
import ModerationPosts from "./ModerationPosts.jsx";
import CleanQueue from "./CleanQueue.jsx";


/**
 * Renders the Unmoderated component.
 * 
 * @param {Object} props - The component props.
 * @module ModerationUnmoderatedPage
 */
function Unmoderated( props ) {
  const [checked, setChecked] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [UnmoderatedPosts, setUnmoderatedPosts] = useState([]);
  
  const myusername = localStorage.getItem("username");
    const handleshowOptions = () => {
    setShowOptions(!showOptions);
};

  const handleClick = () => {
    setChecked(!checked);
  };

  async function getUnmoderatedPosts() {
    const response = await fetchUnmoderatedPostsFromBackend(props.community);
    if(response){
    setUnmoderatedPosts(response);
    }
  }

  useEffect(() => {
    getUnmoderatedPosts();
  }, []);

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
            {checked ? (
            <div className="col-8 d-flex align-items-center">
                <button className="me-2 items-selected1"><CiCircleCheck style={{display: 'inline-block', height: '20px', width: '20px', marginRight: '3px'}} />Approve</button>
                <button className="me-2 items-selected1"><AiOutlineStop style={{display: 'inline-block', height: '20px', width: '20px' , marginRight: '3px'}} />Remove</button>
                <button className="me-2 items-selected1"><CiSquareRemove style={{display: 'inline-block', height: '20px', width: '20px', marginRIght: '3px' }} /> Spam</button>
            </div>
            ): <div className="col-8">
              </div> }
            <div className="col-3 d-flex justify-content-end align-items-center">
              <span className="items-selected">
                Items 1-{UnmoderatedPosts.unmoderatedPosts?.length} &#183; 0 selected{" "}
              </span>
            </div>
          </div>
        </div>
        {UnmoderatedPosts.unmoderatedPosts && UnmoderatedPosts.unmoderatedPosts.length > 0?(
          UnmoderatedPosts.unmoderatedPosts.map((post, index) => (
            <ModerationPosts
            key={index}
            _id={post._id}
            handleClick={handleClick}
            upvotes={post.upvotes}
            downvotes={post.downvotes}
            authorName={post.authorName}
            createdAt={post.createdAt}
            title={post.title}
            content={post.content}
            comments={post.comments}
            myusername={myusername}
            checked={checked}
            isLocked={post.isLocked}
            isNSFW={post.isNSFW}
            community={props.community}
          />
          ))) : <CleanQueue />
        }
      </div>
    </div>
  );
}

export default Unmoderated;
