import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SearchIcon from "../../styles/icons/SearchIcon.jsx";
import avatar1 from "../../assets/avatar_default_6.png";
import avatar2 from "../../assets/avatar_default_2.png";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import './ProfilePage.css'
import Logo from "../../assets/Curio_logo.png";


/**
 * Renders the profile sidebar component.
 *
 * @param {Object} props - The component props.
 * @module The profile sidebar component.
 */
function ProfileSideBar( props ){

  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  return(
    <div className="rightSideBar">
          <div className="gradient">
            <button>
              <svg
                rpl=""
                aria-hidden="true"
                fill="currentColor"
                height="16"
                icon-name="add-media-outline"
                viewBox="0 0 20 20"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.376 3.032h-2.355L13.8 1.446A1.155 1.155 0 0 0 12.892 1h-5.74a1.17 1.17 0 0 0-.923.454L5.014 3.031H2.625A2.629 2.629 0 0 0 0 5.656v9.719A2.63 2.63 0 0 0 2.625 18h14.75A2.63 2.63 0 0 0 20 15.375V5.657a2.627 2.627 0 0 0-2.624-2.625Zm1.374 12.343a1.377 1.377 0 0 1-1.375 1.375H2.625a1.377 1.377 0 0 1-1.375-1.375V5.656a1.377 1.377 0 0 1 1.375-1.375h3L7.152 2.25l5.657-.041 1.6 2.072h2.971a1.375 1.375 0 0 1 1.37 1.376v9.718Zm-8.125-6H14v1.25h-3.375V14h-1.25v-3.375H6v-1.25h3.375V6h1.25v3.375Z"></path>
              </svg>
            </button>
          </div>
          <br />
          <h2 className="UsernameTitle">{props.username}</h2>
          <button className="shareButton">
            <svg
              rpl=""
              fill="currentColor"
              height="16"
              icon-name="share-outline"
              viewBox="0 0 20 20"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18.942 7.058 12.8.912l-.883.883 5.079 5.08h-2.871A13.189 13.189 0 0 0 1.067 18h1.267a11.94 11.94 0 0 1 11.791-9.875h2.866l-5.079 5.08.883.883 6.147-6.146a.624.624 0 0 0 0-.884Z"></path>
            </svg>
            Share
          </button>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gridTemplateRows: "repeat(2, 1fr)",
              rowGap: "0.3rem",
              columnGap: "1rem",
            }}
          >
            <div className="profilevalue">{props.userAbout.postKarma || "1"}</div>
            <div className="profilevalue">{props.userAbout.commentKarma || "0"}</div>
            <div className="profileItem">Post Karma</div>
            <div className="profileItem">Comment Karma</div>
          </div>
          <br />

          {props.userAbout.followersCount > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gridTemplateRows: "repeat(2, 0.5fr)",
                rowGap: "0.3rem",
                columnGap: "1rem",
              }}
            >
              <div className="profilevalue">{props.userAbout.followersCount}</div>
              <div className="profilevalue">
                {props.userAbout.cakeDay || "Mar 3, 2023"}{" "}
              </div>
              <Link to={`/user/${username}/followers`} > 
              <div className="profileItem">Followers</div>
              </Link>
              <div className="profileItem">Cake day</div>
              <div className="profilevalue mt-3">
                {props.userAbout.goldRecieved || "0"}
              </div>
              <div className="profilevalue mt-3"></div>
              <div className="profileItem">Gold Received</div>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gridTemplateRows: "repeat(2, 0.5fr)",
                rowGap: "0.3rem",
                columnGap: "1rem",
              }}
            >
              <div className="profilevalue">
                {props.userAbout.cakeDay || "Mar 3, 2023"}{" "}
              </div>
              <div className="profilevalue">
                {props.userAbout.goldRecieved || "0"}
              </div>
              <div className="profileItem">Cake day</div>
              <div className="profileItem">Gold Received</div>
            </div>
          )}

          <Divider orientation="horizontal" />

          <p>Settings</p>
          <div className="profileSettings">
            <img src={Logo} alt="profile" />
            <div className="textContainer">
              <h5>Profile</h5>
              <h6>Customise your profile</h6>
            </div>
            <button onClick={() => navigate("/settings/profile")}>
              {" "}
              Edit Profile
            </button>
          </div>

          <div className="profileSettings">
            <svg
              rpl=""
              fill="currentColor"
              height="20"
              icon-name="avatar-style-outline"
              viewBox="0 0 20 20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m19.683 5.252-3.87-3.92a1.128 1.128 0 0 0-.8-.332h-1.55a1.093 1.093 0 0 0-1.1.91 1.9 1.9 0 0 1-3.744 0A1.094 1.094 0 0 0 7.533 1h-1.55c-.3 0-.588.12-.8.332L1.317 5.253a1.1 1.1 0 0 0 .014 1.557l1.87 1.829a1.121 1.121 0 0 0 1.48.076l.32-.24v1.936c.344-.31.786-.49 1.25-.511V5.977L3.993 7.668l-1.68-1.646L6.036 2.25H7.42a3.156 3.156 0 0 0 6.16 0h1.383l3.723 3.772-1.7 1.668-2.236-1.749v8.138c.501.337.927.774 1.25 1.284V8.509l.338.264a1.117 1.117 0 0 0 1.436-.109l1.894-1.853a1.101 1.101 0 0 0 .015-1.559ZM13.691 20H1.31A1.325 1.325 0 0 1 0 18.663v-4.916a1.03 1.03 0 0 1 .5-.884.988.988 0 0 1 .98-.014 3 3 0 0 0 3.3-.266c.334-.342.649-.702.944-1.078a.624.624 0 0 1 .775-.163l6.75 3.5A2.945 2.945 0 0 1 15 17.584v1.079A1.325 1.325 0 0 1 13.691 20Zm-12.44-5.873v4.536c0 .054.033.087.058.087h12.382c.025 0 .06-.033.06-.087v-1.079a1.72 1.72 0 0 0-1.035-1.609l-6.349-3.29a9.24 9.24 0 0 1-.76.831 4.235 4.235 0 0 1-4.357.611Zm4.022 4.042-.9-.862 3.138-3.3.9.862-3.138 3.3Zm3.04 0-.913-.857 2.09-2.219.91.857-2.088 2.219Z"></path>
            </svg>
            <div className="textContainer">
              <h5>Avatar</h5>
              <h6>Customise and style</h6>
            </div>
            <button
              onClick={() =>
                (window.location.href = "https://www.reddit.com/avatar")
              }
            >
              {" "}
              Style Avatar
            </button>
          </div>

          <div className="profileSettings">
            <svg
              rpl=""
              fill="currentColor"
              height="20"
              icon-name="mod-outline"
              viewBox="0 0 20 20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 20c-.101 0-.202-.014-.3-.04C8.249 19.554 1 17.277 1 12V3.187A1.122 1.122 0 0 1 1.846 2.1L9.73.108c.177-.044.363-.044.54 0L18.154 2.1A1.122 1.122 0 0 1 19 3.187V12c0 5.277-7.249 7.554-8.7 7.957A1.162 1.162 0 0 1 10 20ZM2.25 3.283V12c0 4.465 6.989 6.531 7.786 6.751.725-.22 7.714-2.286 7.714-6.751V3.283L10 1.33 2.25 3.283Z"></path>
            </svg>
            <div className="textContainer">
              <h5>Moderation</h5>
              <h6>Moderation tools</h6>
            </div>
            <button> Mod Settings</button>
          </div>
        </div>
  );

}

export default ProfileSideBar;