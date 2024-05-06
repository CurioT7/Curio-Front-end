import React from "react";
import { useEffect, useState } from "react";
import "./Moderation.css";
import { chakra } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Removed from "../../Components/ModerationComponents/Removed";
import Edited from "../../Components/ModerationComponents/Edited";
import Unmoderated from "../../Components/ModerationComponents/Unmoderated";
import Activity from "../../Components/ModerationComponents/Activity";
import DropDownArrow from "../../styles/icons/DropDownArrow";
import { Overlay, OverlayTrigger, Popover } from "react-bootstrap";
import ModSidebar from "./ModerationSidebar/ModSidebar";
import Header from "./header";

function Moderation(props) {
  const { Community } = useParams();
  const [type, setType] = useState("removed");
  const [communityChoice, setCommunityChoice] = useState("Communities");
  const [contentChoice, setcontentChoice] = useState("All Content");
  const [newestChoice, setNewestChoice] = useState("Newest First");
  const [showCommunities, setShowCommunities] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showNewest, setShowNewest] = useState(false);

  function handleShowCommunities() {
    setShowCommunities(!showCommunities);
    console.log(Community);
  }

  function handleShowContent() {
    setShowContent(!showContent);
  }

  function handleShowNewest() {
    setShowNewest(!showNewest);
  }

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

  function returntype() {
    if (type === "removed") {
      return <Removed />;
    } else if (type === "edited") {
      return <Edited />;
    } else {
      return <Unmoderated />;
    }
  }

  return (
  <div style={{marginTop:"4rem"}}>
    <Header />
    <ModSidebar communityName= {Community}/>
    <div style={{marginLeft: "17rem" }}>
      <div className="row g-3 ">
        <div className="col-12 ps-5">
          <h1 className="queueTitle">Queue</h1>
          <p className="">
            Anything that needs the moderator attention will show up in needs
            review
          </p>
          <div className="row" style={{ height: "fit-content" }}>
            <div className="col-7 d-flex align-items-center">
              <button
                className={`me-4 ${
                  type === "removed" ? "changeButtons1" : "changeButtons"
                }`}
                onClick={() => {
                  setType("removed");
                }}
              >
                Removed
              </button>
              <button
                className={`me-4 ${
                  type === "edited" ? "changeButtons1" : "changeButtons"
                }`}
                onClick={() => {
                  setType("edited");
                }}
              >
                Edited
              </button>
              <button
                className={`me-4 ${
                  type === "unmoderated" ? "changeButtons1" : "changeButtons"
                }`}
                onClick={() => {
                  setType("unmoderated");
                }}
              >
                Unmoderated
              </button>
            </div>
            <div
              className="col-5 d-flex align-items-center justify-content-end " 
              style={{ position: "relative" }}
            >
              <OverlayTrigger
                trigger="click"
                placement="bottom"
                show={showCommunities}
                overlay={
                  <Popover id="communitiescomms">
                    <div>
                      <div>
                        Select all
                      </div>
                      <div>
                          Music
                      </div>  
                      <button className="ApplyButton mt-3">Apply</button>
                      <button className="CancelButton">Cancel</button>
                    </div>
                  </Popover>
                }
              >
                <button
                  className="me-4 showCommsbtn"
                  onClick={handleShowCommunities}
                >
                  {communityChoice} <DropDownArrow />
                </button>
              </OverlayTrigger>
              <OverlayTrigger
                trigger="click"
                placement="bottom"
                show={showContent}
                overlay={
                  <Popover id="popover2">
                    <div>
                      <div onClick={() => setcontentChoice('All Content')}>
                        <span >All Content</span>
                        </div>
                        <div className="mt-3" onClick={() => setcontentChoice('Posts')}>
                       <span>Posts</span>
                        </div>
                        <div className="mt-3" onClick={() => setcontentChoice('Comments')}>
                        <span>Comments</span>
                        </div>
                    </div>
                  </Popover>
                }
              >
                <button className="me-4" onClick={handleShowContent}>
                  {contentChoice} <DropDownArrow />
                </button>
              </OverlayTrigger>
              <OverlayTrigger
                trigger="click"
                placement="bottom"
                show={showNewest}
                overlay={
                  <Popover id="popover2">
                    <div>
                      <div onClick={() => setNewestChoice('Newest first')}>
                        <span>Newest first</span>
                        </div>
                        <div className="mt-3" onClick={() => setNewestChoice('Oldest first')}>
                       <span >Oldest first</span>
                        </div>
                        <div className="mt-3" onClick={() => setNewestChoice('Most reported first')}>
                        <span>Most reported first</span>
                        </div>
                    </div>
                  </Popover>
                }
              >
                <button className="me-4" onClick={handleShowNewest}>
                  {newestChoice} <DropDownArrow />
                </button>
              </OverlayTrigger>
            </div>
          </div>
          <hr style={{ width: "100%", left: 0 }} />
          {returntype()}
        </div>
      </div>
    </div>
    </div>
  );
}

export default Moderation;
