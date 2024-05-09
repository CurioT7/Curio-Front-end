/**
 * Community component for selecting a community.
 * @param {Object} props - The props object containing the component's properties.
 * @param {function} props.onSelect - The function to be called when a community is selected.
 * @param {string} props.subreddit - The currently selected subreddit.
 * @module Community
 */
import React from "react";
import Choose_Community from "./Choose_Community";

function Community({ onSelect, subreddit }) {
    /**
     * Handles the selection of a community.
     * @param {string} community - The selected community.
     */
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
