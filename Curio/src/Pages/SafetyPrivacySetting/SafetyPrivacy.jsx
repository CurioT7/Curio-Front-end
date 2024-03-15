import React from 'react';
import { useEffect } from 'react';
import "./SafetyPrivacy.css";
import UserSetting from "../../Components/UserSetting/UserSetting.jsx";
import Privacy from "../../Components/SafetyPrivacy/SafetyPrivacy.jsx";

function SafetyPrivacy(props) {

useEffect(() => {
    props.hideSidebar();
  }, []);
  return (
    <div>
      <UserSetting />
      <Privacy/> 
    </div>
  );
}

export default SafetyPrivacy;
