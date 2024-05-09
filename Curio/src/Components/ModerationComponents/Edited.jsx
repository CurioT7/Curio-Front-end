import React from "react";
import "./Unmoderated.css";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import { fetchEditedPostsfromBackend } from "./UnmoderatedEndpoints.js";
import EditedPosts from "./RemovedPosts.jsx";
import CleanQueue from "./CleanQueue.jsx";

function Removed( props ) {
  const [checked, setChecked] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [editedPosts, setEditedPosts] = useState([]);

  
  const myusername = localStorage.getItem("username");


  const handleClick = () => {
    setChecked(!checked);
  };


  async function getEditedPosts(community, type, sort) {
    const response = await fetchEditedPostsfromBackend(community, type, sort);
    if(response){
    setEditedPosts(response);
    }
  }

  useEffect(() => {
    getEditedPosts(props.community, 'all', 'new');
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
        {editedPosts.posts && editedPosts.posts.length > 0?(
          editedPosts.posts.map((post, index) => (
            <EditedPosts
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
            community={props.community}
          />
          ))) : <CleanQueue />
        }
      </div>
    </div>
  );
}

export default Removed;
