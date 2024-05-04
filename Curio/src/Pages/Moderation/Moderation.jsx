import React from "react";
import { useEffect, useState } from "react";
import './Moderation.css';
import { chakra  } from "@chakra-ui/react";
import { Box}  from "@chakra-ui/react";
import NeedsReview from "../../Components/ModerationComponents/NeedsReview";
import Reported from "../../Components/ModerationComponents/Reported";
import Removed from "../../Components/ModerationComponents/Removed";
import Edited from "../../Components/ModerationComponents/Edited";
import Unmoderated from "../../Components/ModerationComponents/Unmoderated";
import Activity from "../../Components/ModerationComponents/Activity";


function Moderation( props ) {

  const [type, setType] = useState("needs review");

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
     navigate('/login');
    }
    props.hideSidebar();
    return () => {
    props.showSidebar();
    }
  }, []);

  function returntype() {
    if (type === "needs review") {
      return <NeedsReview />
    }
    else if(type === "reported") {
      return <Reported />
    }
    else if(type === "removed") {
      return <Removed />
    }
    else if(type === "edited") {
      return <Edited />
    }
    else {
      return <Unmoderated />
    }
  }


  return (
    <div style={{ marginTop: "5rem" }}>
      <div className="row g-3">
        <div className="col-9 ps-5">
          <h1 className="queueTitle">Queue</h1>
          <p className="">Anything that needs the moderator attention will show up in needs review</p>
          <div className="row" style={{height: 'fit-content'}}>
          <div className="col-8 d-flex align-items-center">
            <button className={`me-4 ${type === 'needs review'? 'changeButtons1' : 'changeButtons'}`} 
            onClick={() => {setType('needs review')}}>Needs Review</button>
           <button className={`me-4 ${type === 'reported'? 'changeButtons1' : 'changeButtons'}`}
            onClick={() => {setType('reported')}}>Reported</button>
            <button className={`me-4 ${type === 'removed'? 'changeButtons1' : 'changeButtons'}`}
             onClick={() => {setType('removed')}}>Removed</button>
            <button className={`me-4 ${type === 'edited'? 'changeButtons1' : 'changeButtons'}`}
             onClick={() => {setType('edited')}}>Edited</button>
            <button className={`me-4 ${type === 'unmoderated'? 'changeButtons1' : 'changeButtons'}`}
             onClick={() => {setType('unmoderated')}}>Unmoderated</button>
             </div>
             <div className="col-4 d-flex align-items-center">  
            <button>Communities</button>
            <button className="ms-5">All Content</button>
            <button className="ms-5">Newest First</button>
              </div>
          </div>
          <hr style={{ width: "100%", left: 0 }} />
          {returntype()}
        </div>
        <div className="col-3">
          <Activity />
        </div>
      </div>
    </div>
  );
}


export default Moderation;