import React from "react";
import { useEffect } from "react";

import TopCommunities from "../../Components/TopCommunities/TopCommunities.jsx";



function TopCommunity(props) {

  useEffect(() => {
    props.hideSidebar();
  }, []);

  return (
  <div>
    <div>
    <TopCommunities/>
    </div>
  </div>
  );
}

export default TopCommunity;