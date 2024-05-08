import React, { useEffect, useState } from 'react';
import "./Posting_Cards.css";
import Posting_rules from "./Posting_rules/Posting_rules";
import Community_details from "./Community_details/Community_details";
import Community_rules from './Community_rules/Community_rules';
import { fetchSubredditData } from './Community_info_Endpoints';

function Posting_Cards(community) {
  const [subredditData, setSubredditData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSubredditData(community.community);
        setSubredditData(data);
      } catch (error) {
        console.error("Error fetching subreddit data:", error);
      }
    };

    fetchData();
  }, [community]);

  return (
    <div className='postingContainer'>
      <Community_details
        subredditData={subredditData}
        community={community}
      />
      {subredditData && subredditData.subreddit && subredditData.rules && subredditData.rules.length > 0 &&
        <Community_rules
          subbreddit={subredditData.subreddit}
          rules={subredditData.rules}
        />
      }
      <Posting_rules />
    </div>
  );
}

export default Posting_Cards;
