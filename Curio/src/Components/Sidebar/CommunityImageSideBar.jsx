import React from "react";

function CommunityImageSideBar({imageUrl}) {
  return (
    <div>
      <div>
        <img className="community-image-sidebar"
          src={imageUrl}
          alt="community-icon"
        />
      </div>
    </div>
  );
}

export default CommunityImageSideBar;