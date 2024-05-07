import CommunityInfo from "./CommunityInfo";
import CommunityHeader from "./CommunityHeader";
import CommunityBody from "./CommunityBody";
import "./CommunityPage.css";
import { useEffect, useState } from "react";
import { getModerators,fetchSubCurioInfo } from "./CommunityEndPoints";
import { useParams } from "react-router-dom";

import React from 'react';
function CommuntiyPage(props) {
  const { Community } = useParams();
  const [isModerator, setIsModerator] = useState(false);

  

  useEffect(() => {
    async function handleGetModerators() {
      const response = await fetchSubCurioInfo(Community);
      
        if (response) {
          response.subreddit.moderators.map((moderator) => {
            if (moderator.username === localStorage.getItem("username")) {
              setIsModerator(true);
              return
              
            }
            else{
              setIsModerator(false);
            }
          });
          
        }
    }
    
    handleGetModerators();
    
  }, [Community]);


  return (
    <div className=" community-container mt-5 ">
      <CommunityHeader setSubreddit={props.setSubreddit} isModerator={isModerator}/>
      <div className="row me-3 justify-content-center ">    
        <div className="col-12 ">   
        <CommunityBody setSubreddit={props.setSubreddit} />
        </div>
        
      </div>

    </div>
  );
}
export default CommuntiyPage;