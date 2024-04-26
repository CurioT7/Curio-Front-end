import CommunityInfo from "./CommunityInfo";
import CommunityHeader from "./CommunityHeader";
import CommunityBody from "./CommunityBody";
import "./CommunityPage.css";

import React from 'react';
function CommuntiyPage(props) {
  

  return (
    <div className=" community-container ">
      <CommunityHeader />
      <div className="row me-3 justify-content-center ">    
        <div className="col-12 col-lg-8">   
        <CommunityBody setSubreddit={props.setSubreddit} />
        </div>
        <div className="col-lg-4 d-none d-lg-block">
        <CommunityInfo />
        </div>
      </div>

    </div>
  );
}
export default CommuntiyPage;