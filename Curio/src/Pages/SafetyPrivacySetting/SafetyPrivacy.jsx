import React from 'react';
import "./SafetyPrivacy.css";
import UserSetting from "../../Components/UserSetting/UserSetting.jsx";
import Privacy from "../../Components/SafetyPrivacy/SafetyPrivacy.jsx";

function SafetyPrivacy() {
  return (
    <div>
      <UserSetting />
      <Privacy/> 
    </div>
  );
}

export default SafetyPrivacy;
