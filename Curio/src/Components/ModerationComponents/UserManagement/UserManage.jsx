import React from "react";
import Header from "../../../Pages/Moderation/header";
import ModSidebar from "../../../Pages/Moderation/ModerationSidebar/ModSidebar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './UserManage.css';
import Banned from "./Banned";
import Muted from "./Muted";
import Moderators from "./Moderators";

function UserManage( props ) {
  const { Community } = useParams();
  const [type, setType] = useState("banned");



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
    if (type === "banned") {
      return <Banned />;
    } else if (type === "muted") {
      return <Muted />;
    } else {
      return <Moderators />;
    }
  }


  return (
    <div style={{marginTop:"4rem"}}>
    <Header />
    <ModSidebar communityName={Community}/>
    <div style={{marginLeft: "17rem" }}>
      <h6 className="UserManagement">User Management</h6>
            <div className="col-7 d-flex align-items-center mt-5">
              <button
                className={`me-4 ${
                  type === "banned" ? "changeButtons3" : "changeButtons2"
                }`}
                onClick={() => {
                  setType("banned");
                }}
              >
                Banned
              </button>
              <button
                className={`me-4 ${
                  type === "muted" ? "changeButtons3" : "changeButtons2"
                }`}
                onClick={() => {
                  setType("muted");
                }}
              >
                Muted
              </button>
              <button
                className={`me-4 ${
                  type === "moderators" ? "changeButtons3" : "changeButtons2"
                }`}
                onClick={() => {
                  setType("moderators");
                }}
              >
                Moderators
              </button>
            </div>
          {returntype()}
      </div>
    </div>
  );
}

export default UserManage;