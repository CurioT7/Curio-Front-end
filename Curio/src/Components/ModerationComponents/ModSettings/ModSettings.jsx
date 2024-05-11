import React from "react";
import Header from "../../../Pages/Moderation/header";
import ModSidebar from "../../../Pages/Moderation/ModerationSidebar/ModSidebar";
import "./ModSettings.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Input } from "@chakra-ui/react";

/**
 * Renders the ModSettings component.
 * @param {Object} props - The component props.
 * @param {string} props.communityName - The name of the community.
 * @param {boolean} props.ageChecked - The boolean value of the age check.
 * 
 * @component
 * @example
 * return (
 *   <ModSettings />
 * )
 * 
 * @module ModSettings
 */
function ModSettings( props ) {
  const { Community } = useParams();
  const [ageCheck, setAgeCheck] = useState(false);

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
      <h2 className="settingname">Community Settings</h2>
      <h6 className="h6-mod-settings">Community profile</h6>

      <h3 className="settingname">Community name</h3>
      <Input
          type="text"
          className="form-control mr-sm-2"
          maxLength="100"
        />
        <h3 className="settingname2">Community description</h3>
        <h6 className="h6-mod-settings">This is how new members come to understand your community</h6>
        <Input
          type="text"
          className="form-control mr-sm-2"
          maxLength="500"
        />
        <br />
<div>
  <h3 className="settingname">Send welcome message to new members</h3>
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
      <br />
  <h6>Community Types</h6>
<div>
  <input
    type="radio"
    id="public"
    name="communityType"
  />
  <label className="label-mod-settings" htmlFor="public" style={{ display: 'flex', alignItems: 'center' }}>
    <svg class="_3WyydSidemq34inFmhA1SE" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 20 20"><path d="M12,11 C15.309,11 18,13.691 18,17 C18,17.553 17.552,18 17,18 L3,18 C2.448,18 2,17.553 2,17 C2,13.691 4.691,11 8,11 L12,11 Z M10,9.7334 C7.868,9.7334 6.133,7.9994 6.133,5.8664 L6.133,4.8664 C6.133,2.7344 7.868,1.0004 10,1.0004 C12.132,1.0004 13.867,2.7344 13.867,4.8664 L13.867,5.8664 C13.867,7.9994 12.132,9.7334 10,9.7334 Z"></path></svg>
    Public
  </label>
</div>
<div>
  <input
    type="radio"
    id="restricted"
    name="communityType"
  />
  <label className="label-mod-settings" htmlFor="restricted" style={{ display: 'flex', alignItems: 'center' }}>
    <svg class="CodbGPlWjCpPE6jWVhkOn" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 40 40"><g><path d="M20,8C9.1,8,0.5,14,0.5,21.7h4c0-3.6,3.4-6.9,8.2-8.5C11,15,10,17.4,10,20c0,5.5,4.5,10,10,10s10-4.5,10-10c0-2.6-1-5-2.7-6.8c4.8,1.7,8.2,4.9,8.2,8.5h4C39.5,14,30.9,8,20,8z"></path></g></svg>
    Restricted
  </label>
</div>
<div>
  <input
    type="radio"
    id="private"
    name="communityType"
  />
  <label className="label-mod-settings" htmlFor="private" style={{ display: 'flex', alignItems: 'center' }}>
    <div><svg class="_1Ma7YYe0ShiEmNSS16r18H" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" width="10" height="10"><g><rect x="7.5" y="12.5" width="0" height="0"></rect><path fill="inherit" d="M32.5,17.5v-2.6c0-6.8-5.6-12.4-12.4-12.4h-0.2c-6.8,0-12.4,5.6-12.4,12.4v2.6C6.1,17.5,5,18.6,5,20v10c0,5.5,4.5,10,10,10h10c5.5,0,10-4.5,10-10V20C35,18.6,33.9,17.5,32.5,17.5z M12.5,17.5v-2.6c0-4.1,3.3-7.4,7.4-7.4h0.2c4.1,0,7.4,3.3,7.4,7.4v2.6H12.5z"></path></g></svg></div>
    Private
  </label>
</div>
</div>
    <div>
      <br />
  <h6>18+ year old community</h6>
  <div>

  <input
  type="checkbox"
  id="ageCheck"
  name="ageCheck"
  checked={ageCheck}
  onChange={() => setAgeCheck(!ageCheck)}
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