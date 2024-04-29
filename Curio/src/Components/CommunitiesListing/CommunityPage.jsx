import CommunityInfo from "./CommunityInfo";
import CommunityHeader from "./CommunityHeader";
import CommunityBody from "./CommunityBody";
import "./CommunityPage.css";

import React from 'react';
function CommuntiyPage(props) {
  

  return (
    <div className=" community-container mt-5 ">
      <CommunityHeader setSubreddit={props.setSubreddit} />
      <div className="row me-3 justify-content-center ">    
        <div className="col-12 ">   
        <CommunityBody setSubreddit={props.setSubreddit} />
        </div>
        
      </div>

    </div>
  );
}
export default CommuntiyPage;