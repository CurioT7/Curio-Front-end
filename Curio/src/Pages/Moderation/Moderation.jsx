import React from "react";
import { useEffect, useState } from "react";
import { chakra } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Removed from "../../Components/ModerationComponents/Removed";
import Edited from "../../Components/ModerationComponents/Edited";
import Unmoderated from "../../Components/ModerationComponents/Unmoderated";
import Activity from "../../Components/ModerationComponents/Activity";
import DropDownArrow from "../../styles/icons/DropDownArrow";
import { Overlay, OverlayTrigger, Popover } from "react-bootstrap";
import Header from "./header";
import ModSidebar from "./ModerationSidebar/ModSidebar";
import './Moderation.css';

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
        <div className="mainModerationDiv ps-5 mt-4">
          <h1 className="queueTitle">Queues</h1>
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
          </div>
          {returntype()}
        </div>
    </div>
    </div>
  );
}

export default Moderation;
