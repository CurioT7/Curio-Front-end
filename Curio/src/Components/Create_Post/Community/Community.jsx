import React from "react";
import Choose_Community from "./Choose_Community";

function Community({ onSelect }) {
    // Callback function to receive the selected community or username from Choose_Community
    const handleCommunitySelect = (community) => {
        onSelect(community.replace(/^r\//, '').replace(/^u\//, '')); // Pass the selected community without "r/" or "u/"
    };
    

    return (
        <>
            <Choose_Community onSelect={handleCommunitySelect} />
        </>
    );
}

export default Community;
