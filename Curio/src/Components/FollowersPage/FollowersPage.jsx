import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./FollowersPage.css";
import SearchIcon from "../../styles/icons/SearchIcon.jsx";

import {
  useToast
} from "@chakra-ui/react";
import {
  getUserAbout,
} from "../ProfilePage/ProfilePageEndpoints.js";
import { userFollow, userUnfollow } from "../FriendInformation/ShowFriendInformationEndpoints.js";
import { getFollowers } from "./FollowesPageEnpoints.js";
import "../ProfilePage/ProfileSideBar.jsx";
import ProfileSideBar from "../ProfilePage/ProfileSideBar.jsx";
import axios from "axios";

function FollowersPage(props) {
  const navigate = useNavigate();
  const { username } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);
  const [userAbout, setUserAbout] = useState({});
  const [friendAbout, setFriendAbout] = useState({});
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);


  const token = localStorage.getItem("token");
  const toastsuccess = useToast()
  function ToastSuccess(description) {
      toastsuccess({
          description: description ,
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'bottom',
      });
  }

  async function handleGetFollowers() {
    const response = await getFollowers('followers');
    if (response) {
      setFollowers(response.data.friendsArray);
    }
  }

  useEffect(() => {
    handleGetFollowers();

  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    props.hideSidebar();
    return () => {
      props.showSidebar();
    };
  }, []);

  useEffect(() => {
    const StoredUsername = localStorage.getItem("username");
    if (!token) {
      navigate("/login");
    }

    if (StoredUsername) {
      getUserAbout(StoredUsername).then((data) => setUserAbout(data));
    }
  }, []);


  function handleFollowToggle(friendUsername) {
    if (!token) {
     navigate('/login');
    }
    else{
    if (isFollowing) {
        userUnfollow(friendUsername);
        ToastSuccess('User unfollowed successfully!');
    } else {
        userFollow(friendUsername);
        ToastSuccess('User followed successfully!');
    }
    setIsFollowing(!isFollowing);
}
}

function handleFriendInformation(username) {
   getUserAbout(username).then((data) => setFriendAbout(data));
}

  return (
    <div className="d-flex followersPageCont">
      <div className="d-flex p-3 mx-auto flex-column followersPageDiv">
        <div className="d-flex flex-column followersSearchDiv p-2">
          <span className="Followers">Followers</span>
          <div className="d-flex flex-row">
            <p className="Followersparag">
              This list is only visible to you. The most recent follows are
              shown first.
            </p>
            <input
              type="text"
              placeholder="Search for a user"
              className="followersSearchBox"
              style={{
                border: "1px solid rgb(135, 138, 140)",
                borderTopRightRadius: "0px",
                borderBottomRightRadius: "0px",
                width: "400px",
              }}
            ></input>
            <button className="searchBtn me-2">
              <SearchIcon />
            </button>
          </div>
        </div>
        <div className="d-flex flex-row p-2 align-items-center">
          <img src={avatar2} alt="avatar" className="FollowersAvatar" />
          <span className="ms-2 FollowerUsername">Ok_software</span>
          <button className="FollowBtn ms-auto">Following</button>
        </div>
        <div className="d-flex flex-row p-2 align-items-center">
          <img src={avatar2} alt="avatar" className="FollowersAvatar" />
          <span className="ms-2 FollowerUsername">Ok_software</span>
          <button
            className={`FollowBtn ms-auto ${
              isFollowing ? "FollwersFollow" : "FollowersUnfollow"
            }`}
            onClick={() => handleFollowToggle(username)}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
        </div>
      </div>
      <ProfileSideBar userAbout={userAbout} username={username} />
    </div>
  );
}

export default FollowersPage;
