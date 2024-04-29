import React from "react";
import Choose_Community from "./Choose_Community";

function Community({ onSelect, subreddit }) {
    const handleCommunitySelect = (community) => {
        onSelect(community.replace(/^r\//, '').replace(/^u\//, '')); // Pass the selected community without "r/" or "u/"
    };
    

    return (
        <>
            <Choose_Community onSelect={handleCommunitySelect} subreddit={subreddit}/>
        </>
    );
}

export default Community;
