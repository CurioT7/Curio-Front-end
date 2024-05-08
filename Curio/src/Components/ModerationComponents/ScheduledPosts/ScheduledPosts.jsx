import React from "react";
import Header from "../../../Pages/Moderation/header";
import ModSidebar from "../../../Pages/Moderation/ModerationSidebar/ModSidebar";
import DisplayPost from "./DisplayPost";
import { useEffect } from "react";
import { useParams } from "react-router-dom";


function ScheduledPosts( props ) {

  const { Community } = useParams();
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


  return (
    <div style={{marginTop:"4rem"}}>
      <Header />
      <ModSidebar communityName={Community}/>
      <div style={{marginLeft: "17rem" }}>
        <DisplayPost />
      </div>
    </div>
  );
}

export default ScheduledPosts;