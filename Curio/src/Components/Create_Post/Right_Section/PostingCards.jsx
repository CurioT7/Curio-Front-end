/**
 * Function component for rendering posting cards.
 * @component
 * @param {Object} community - The community data.
 * @module PostingCards
 */
import React, { useEffect, useState } from 'react';
import "./PostingCards.css";
import PostingRules from "./PostingRules/PostingRules";
import CommunityDetails from "./CommunityDetails/CommunityDetails";
import CommunityRules from './CommunityRules/CommunityRules';
import { fetchSubredditData } from './Community_info_Endpoints';

// Function component for rendering posting cards
function PostingCards(community) {
  const [subredditData, setSubredditData] = useState(null);

  useEffect(() => {
    
    const fetchData = async () => {
        if(community.community){
        const data = await fetchSubredditData(community.community);
        setSubredditData(data);}
     
    };

    fetchData();
    
    
  }, [community.community]);

  return (
    <div className='postingContainer'>
      {/* Component for displaying community details */}
      <CommunityDetails
        subredditData={subredditData}
        community={community}
      />
      {/* Render community rules if data is available */}
      {subredditData && subredditData.subreddit && subredditData.rules && subredditData.rules.length > 0 &&
        <CommunityRules
          subbreddit={subredditData.subreddit}
          rules={subredditData.rules}
        />
      }
      {/* Component for displaying posting rules */}
      <PostingRules />
    </div>
  );
}

export default PostingCards;
