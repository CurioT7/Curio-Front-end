import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import "./TopCommunities.css";
import Community from "../OneCommunity/OneCommunity";
import Picture from "../../styles/icons/commPic.png";

import { Link } from 'react-router-dom';
import axios from "axios";

const hostUrl = import.meta.env.VITE_SERVER_HOST;


function TopCommunities(props) {

  const { page } = useParams();

  const [communityInfo, setCommunityInfo] = useState([]);

  useEffect(() => {
    props.hideSidebar();
  }, []);

  useEffect(() => {
    async function showCommunityInformation({page}) {
        try {
            const response = await axios.get(`${hostUrl}/api/best/communities/${page}`);
            console.log(response.data.communities);
            setCommunityInfo(response.data.communities);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    showCommunityInformation({page});
    
}, [page]);




  const communitiesTest = [
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },
    {
      name: "r/aww",
      category: "Cute Animals",
      members: "45M",
      picture: Picture,
    },
    {
      name: "r/science",
      category: "Science",
      members: "30M",
      picture: Picture,
    },
    {
      name: "r/funny",
      category: "Funny/Humor",
      members: "58M",
      picture: Picture,
    },

  ];

  return (
    <div id="testtest2" className="container parentDiv">
      <h1 className="text-center best-of-reddit">Best of Reddit</h1>
      <h2 className="top-communities">Top Communities</h2>
      <h2 className="browse">Browse Reddit's largest communities</h2>
      {communityInfo.map((_, index) => {
        return index % 4 === 0 ? (
          <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-sm-1 w-100 rowHeight">
            {communityInfo.slice(index, index + 4).map((community, key) => (
                <Community
                  index={index + key}
                  name={community.name}
                  category={community.category}
                  members={community.members}
                  picture= {Picture}
                />
            ))}
          </div>
        ) : null;
      })}
      <div className="row rowcols-1">
        <div className="d-flex align-items-xl-end justify-content-evenly mx-auto w-50 h-50" key={page}>
          <Link to="/communities/best/1" className="pagesStyles">
          <a>1</a>
          </Link>
          <Link to="/communities/best/2" className="pagesStyles">
          <a>2</a>
          </Link>
          <Link to="/communities/best/3" className="pagesStyles">
          <a>3</a>
          </Link>
          <Link to="/communities/best/4" className="pagesStyles">
          <a>4</a>
          </Link>
          <Link to="/communities/best/5" className="pagesStyles">
          <a>5</a>
          </Link>
          <Link to="/communities/best/6" className="pagesStyles">
          <a>6</a>
          </Link>
          <Link to="/communities/best/7" className="pagesStyles">
          <a>7</a>
          </Link>
          <Link to="/communities/best/8" className="pagesStyles">
          <a>8</a>
          </Link>
          <Link to="/communities/best/9" className="pagesStyles">
          <a>9</a>
          </Link>
          <Link to="/communities/best/10" className="pagesStyles">
          <a>10</a>
          </Link>
        </div>
      </div>
      <div>
        {page}
      </div>
    </div>
  );
}

export default TopCommunities;

