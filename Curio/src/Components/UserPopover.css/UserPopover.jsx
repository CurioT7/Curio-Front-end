import { useState, useRef } from "react";
import './UserPopover.css';
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Minus from "../../styles/icons/Minus.jsx";
import PlusIcon from "../../styles/icons/PlusIcon.jsx";
import Chat from "../../styles/icons/Chat.jsx";
import { userFollow, userUnfollow, getFollower } from '../FriendInformation/ShowFriendInformationEndpoints.js';
import { Flex,Avatar,Box,Heading,IconButton,Text,Image } from '@chakra-ui/react'
import Cake from "../../styles/icons/Cake.jsx";


function UserPopover( { user, friendInfo, isFollowing, handleFollowToggle, handleGetFollower, showFriendInformation, classname } ) {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [showPopover, setShowPopover] = useState(false);
  const ref = useRef(null);

  return (
    <OverlayTrigger
      trigger={["hover", "focus"]}
      placement="bottom"
      show={showPopover}
      overlay={
        <Popover
          id="overlay2"
          onMouseEnter={() => setShowPopover(true)}
          onMouseLeave={() => setShowPopover(false)}
        >
          <div className="d-flex align-items-center p-2 popOverHeader">
            <Avatar
              size="md"
              name="Segun Adebayo"
              src="https://bit.ly/sage-adebayo"
              className="popoverAvatar"
            />
            <div className="d-flex flex-column ms-2">
              <a
                href={`/user/${user}`}
                className="popOverUsername"
                taget="_blank"
              >
                {user}
              </a>
              <span className="popOverCake">u/{user}</span>
              <div className="d-flex">
                <Cake />
              <span className="popOverCake ms-2">{friendInfo.cakeDay}</span>
              </div>
            </div>
          </div>
          <div className="container mt-4">
            <div className="row row-cols-2 powerOverRow">
              <div className="col-5 popOverCol text-start">
                <h6 className="numbersHeader">{friendInfo.postKarma}</h6>
                <p className="membersText">Post Karma</p>
              </div>
              <div className="col-7 popOverCol text-start">
                <h6 className="numbersHeader">{friendInfo.commentKarma}</h6>
                <p className="membersText">Comment Karma</p>
              </div>
            </div>
          </div>
          <a
            className="karmaText text-start mt-2 mb-4 ms-2"
            href="https://support.reddithelp.com/hc/en-us/articles/204511829-What-is-karma"
          >
            What is Karma?
          </a>
          <div className="d-flex mt-2 ">
            <button
              className={`d-flex align-items-center popoverFollow p-2 ${
                isFollowing ? "following" : "not-following"
              }`}
              onClick={() => {
                handleFollowToggle(user);
              }}
            >
              <span>{isFollowing ? <Minus /> : <PlusIcon />}</span>
              <span className="ms-2 ">
                {isFollowing ? "Unfollow" : "Follow"}
              </span>
            </button>
            <button className="d-flex align-items-center popoverChat p-2 ms-2">
              <span>
                <Chat />
              </span>
              <span className="ms-2 ">Chat</span>
            </button>
          </div>
        </Popover>
      }
    >
      <a
        href={`/user/${user}`}
        className={`${classname}`}
        onMouseEnter={() => {
          setShowPopover(true);
          handleGetFollower(user);
          showFriendInformation(user);
        }}
        onMouseLeave={() => setShowPopover(false)}
      >
        {user}
      </a>
    </OverlayTrigger>
  );
}

export default UserPopover;
