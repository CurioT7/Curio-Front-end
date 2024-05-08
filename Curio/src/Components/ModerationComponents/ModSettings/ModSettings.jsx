import React from "react";
import Header from "../../../Pages/Moderation/header";
import ModSidebar from "../../../Pages/Moderation/ModerationSidebar/ModSidebar";
import "./ModSettings.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Input } from "@chakra-ui/react";

function ModSettings( props ) {
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
      <h2>Community Settings</h2>
      <h6 className="h6-mod-settings">Community profile</h6>

      <h3>Community name</h3>
      <Input
          type="text"
          className="form-control mr-sm-2"
          maxLength="100"
        />
        <h3>Community description</h3>
        <h6 className="h6-mod-settings">This is how new members come to understand your community</h6>
        <Input
          type="text"
          className="form-control mr-sm-2"
          maxLength="500"
        />
<div>
  <h3>Send welcome message to new members</h3>
  <div>
    <input
      type="radio"
      name="welcomeMessage"
    />
    <label className="label-mod-settings" htmlFor="yes">Yes</label>
  </div>
  <div>
    <input
      type="radio"
      name="welcomeMessage"
    />
    <label className="label-mod-settings" htmlFor="no">No</label>
  </div>
    <div>
  <h6>Community Types</h6>
  <div>
    <input
      type="radio"
      id="public"
      name="communityType"
    />
    <label className="label-mod-settings" htmlFor="public">Public</label>
  </div>
  <div>
    <input
      type="radio"
      id="restricted"
      name="communityType"
    />
    <label className="label-mod-settings" htmlFor="restricted">Restricted</label>
  </div>
  <div>
    <input
      type="radio"
      id="private"
      name="communityType"
    />
    <label className="label-mod-settings" htmlFor="private">Private</label>
  </div>
</div>
    <div>
  <h6>18+ year old community</h6>
  <div>
    <input
      type="checkbox"
      id="ageCheck"
      name="ageCheck"
    />
    <label className="label-mod-settings" htmlFor="ageCheck">Yes</label>
  </div>
</div>
</div>

 </div>
      </div>
  );
}

export default ModSettings;