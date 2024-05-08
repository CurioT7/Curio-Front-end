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
import { fetchUnmoderatedPostsFromBackend } from "./UnmoderatedEndpoints.js";
import { getTimeDifference } from "../../Components/getTimeDifference/getTimeDifference.js";
import { Text } from '@chakra-ui/react'
import RemovedPosts from "./RemovedPosts.jsx";

function Removed( props ) {
  const [checked, setChecked] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isApproved, setisApproved] = useState(false);
  const [isRemoved, setisRemoved] = useState(false);
  const [didRespond, setDdidRespond] = useState(false);
  const [UnmoderatedPosts, setUnmoderatedPosts] = useState([]);
  const [isRemovedComponent, setRemovedComponent] = useState(false);
  
  const myusername = localStorage.getItem("username");
    const handleshowOptions = () => {
    setShowOptions(!showOptions);
};

  const handleClick = () => {
    setChecked(!checked);
  };

//   const handleisApproved = () => {
//     setisApproved(true);
//     setisRemoved(false);
//     setDdidRespond(true);
//   };

  
//   const handleisRemoved = () => {
//     setisRemoved(true);
//     setisApproved(false);
//     setDdidRespond(true);
//   };

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
            <div className="col-11 d-flex justify-content-end align-items-center">
              <span className="items-selected">
                Items 1-3 &#183; 0 selected{" "}
              </span>
            </div>
          </div>
        </div>
        {UnmoderatedPosts.unmoderatedPosts?(
          UnmoderatedPosts.unmoderatedPosts.map((post, index) => (
            <RemovedPosts
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
          />
          ))) : null
        }
      </div>
    </div>
  );
}

export default Removed;
