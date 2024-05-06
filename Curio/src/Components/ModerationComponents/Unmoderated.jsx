import React from "react";
import avatar from "../../assets/avatar_default_6.png";
import "./Unmoderated.css";

function Unmoderated() {
  return (
    <div>
      <div className="container mainContainer">
        <img src={avatar} className="avatarimg" alt="avatar" />
        <span className="me-2 ms-1 UserNameText">u/username</span>
        <span className="me-2">&#183;</span>
        <span className="postTime">25 min. ago</span>
        <div>
          <h6 className="mt-2 TitleText2">Title</h6>
        </div>
        <div>
          <p className="PostText">
            Content of the post
          </p>
        </div>
      </div>
    </div>
  );
}

export default Unmoderated;