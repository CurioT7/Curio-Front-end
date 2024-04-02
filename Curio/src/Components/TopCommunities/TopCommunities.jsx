import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import "./TopCommunities.css";
import Community from "../OneCommunity/OneCommunity";
import Picture from "../../styles/icons/commPic.png";

import { Link } from 'react-router-dom';
import axios from "axios";
import DropdownIcon from "../../styles/icons/DropdownIcon.svg";
import UpwardsIcon from "../../styles/icons/Upwards.svg"

const hostUrl = import.meta.env.VITE_SERVER_HOST;


function TopCommunities(props) {

  const { page } = useParams();

  const [communityInfo, setCommunityInfo] = useState([]);
  const [isDropDown, toggleDropDown] = useState(false);

  useEffect(() => {
    props.hideSidebar();
  }, []);

  useEffect(() => {
    async function showCommunityInformation({page}) {
        try {
          const response = await axios.get(`${hostUrl}/api/best/communities?page=${page}`);
            console.log(response.data.communities);
            setCommunityInfo(response.data.communities);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    showCommunityInformation({page});
    
}, [page]);

  const handleDropDown = () => {
    toggleDropDown(true);
  }

  const handleHidePages = () => {
    toggleDropDown(false);
  }


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
      <h1 className="text-center best-of-reddit">Best of Curio</h1>
      <h2 className="top-communities">Top Communities</h2>
      <h2 className="browse">Browse Reddit's largest communities</h2>
      {communityInfo.map((_, index) => {
        return index % 4 === 0 ? (
          <div className="row row-cols-xl-4 w-100 rowHeight">
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
      {isDropDown? ( 
        <>  
      <div className="row row-cols-18 topRow">
        <div className="col">
          <a href="/communities/best/1">1</a>
          </div>
          <div className="col">
          <a href="/communities/best/2">2</a>
          </div>
          <div className="col">
          <a href="/communities/best/3">3</a>
          </div>
          <div className="col">
          <a href="/communities/best/4">4</a>
          </div>
          <div className="col">
          <a href="/communities/best/5">5</a>
          </div>
          <div className="col">
          <a href="/communities/best/6">6</a>
          </div>
          <div className="col">
          <a href="/communities/best/7">7</a>
          </div>
          <div className="col">
          <a href="/communities/best/8">8</a>
          </div>
          <div className="col">
          <a href="/communities/best/9">9</a>
          </div>
          <div className="col">
          <a href="/communities/best/10">10</a>
          </div>
          <div className="col">
          <a href="/communities/best/11">11</a>
          </div>
          <div className="col">
          <a href="/communities/best/12">12</a>
          </div>
          <div className="col">
          <a href="/communities/best/13">13</a>
          </div>
          <div className="col">
          <a href="/communities/best/14">14</a>
          </div>
          <div className="col">
          <a href="/communities/best/15">15</a>
          </div>
          <div className="col">
          <a href="/communities/best/16">16</a>
          </div>
          <div className="col">
          <a href="/communities/best/17">17</a>
          </div>
          <div className="col">
          <a href="/communities/best/18">18</a>
          </div>

      </div>
      <div className="row row-cols-18 topRow">
  <div className="col">
    <a href="/communities/best/19">19</a>
  </div>
  <div className="col">
    <a href="/communities/best/20">20</a>
  </div>
  <div className="col">
    <a href="/communities/best/21">21</a>
  </div>
  <div className="col">
    <a href="/communities/best/22">22</a>
  </div>
  <div className="col">
    <a href="/communities/best/23">23</a>
  </div>
  <div className="col">
    <a href="/communities/best/24">24</a>
  </div>
  <div className="col">
    <a href="/communities/best/25">25</a>
  </div>
  <div className="col">
    <a href="/communities/best/26">26</a>
  </div>
  <div className="col">
    <a href="/communities/best/27">27</a>
  </div>
  <div className="col">
    <a href="/communities/best/28">28</a>
  </div>
  <div className="col">
    <a href="/communities/best/29">29</a>
  </div>
  <div className="col">
    <a href="/communities/best/30">30</a>
  </div>
  <div className="col">
    <a href="/communities/best/31">31</a>
  </div>
  <div className="col">
    <a href="/communities/best/32">32</a>
  </div>
  <div className="col">
    <a href="/communities/best/33">33</a>
  </div>
  <div className="col">
    <a href="/communities/best/34">34</a>
  </div>
  <div className="col">
    <a href="/communities/best/35">35</a>
  </div>
  <div className="col">
    <a href="/communities/best/36">36</a>
  </div>
</div>

<div className="row row-cols-18 topRow">
  <div className="col">
    <a href="/communities/best/37">37</a>
  </div>
  <div className="col">
    <a href="/communities/best/38">38</a>
  </div>
  <div className="col">
    <a href="/communities/best/39">39</a>
  </div>
  <div className="col">
    <a href="/communities/best/40">40</a>
  </div>
  <div className="col">
    <a href="/communities/best/41">41</a>
  </div>
  <div className="col">
    <a href="/communities/best/42">42</a>
  </div>
  <div className="col">
    <a href="/communities/best/43">43</a>
  </div>
  <div className="col">
    <a href="/communities/best/44">44</a>
  </div>
  <div className="col">
    <a href="/communities/best/45">45</a>
  </div>
  <div className="col">
    <a href="/communities/best/46">46</a>
  </div>
  <div className="col">
    <a href="/communities/best/47">47</a>
  </div>
  <div className="col">
    <a href="/communities/best/48">48</a>
  </div>
  <div className="col">
    <a href="/communities/best/49">49</a>
  </div>
  <div className="col">
    <a href="/communities/best/50">50</a>
  </div>
  <div className="col">
    <a href="/communities/best/51">51</a>
  </div>
  <div className="col">
    <a href="/communities/best/52">52</a>
  </div>
  <div className="col">
    <a href="/communities/best/53">53</a>
  </div>
  <div className="col">
    <a href="/communities/best/54">54</a>
  </div>
</div>

<div className="row row-cols-18 topRow">
  <div className="col">
    <a href="/communities/best/55">55</a>
  </div>
  <div className="col">
    <a href="/communities/best/56">56</a>
  </div>
  <div className="col">
    <a href="/communities/best/57">57</a>
  </div>
  <div className="col">
    <a href="/communities/best/58">58</a>
  </div>
  <div className="col">
    <a href="/communities/best/59">59</a>
  </div>
  <div className="col">
    <a href="/communities/best/60">60</a>
  </div>
  <div className="col">
    <a href="/communities/best/61">61</a>
  </div>
  <div className="col">
    <a href="/communities/best/62">62</a>
  </div>
  <div className="col">
    <a href="/communities/best/63">63</a>
  </div>
  <div className="col">
    <a href="/communities/best/64">64</a>
  </div>
  <div className="col">
    <a href="/communities/best/65">65</a>
  </div>
  <div className="col">
    <a href="/communities/best/66">66</a>
  </div>
  <div className="col">
    <a href="/communities/best/67">67</a>
  </div>
  <div className="col">
    <a href="/communities/best/68">68</a>
  </div>
  <div className="col">
    <a href="/communities/best/69">69</a>
  </div>
  <div className="col">
    <a href="/communities/best/70">70</a>
  </div>
  <div className="col">
    <a href="/communities/best/71">71</a>
  </div>
  <div className="col">
    <a href="/communities/best/72">72</a>
  </div>
</div>
<div className="d-flex justify-content-center mx-auto upContainer">
        <button>
          <img src={UpwardsIcon} onClick={handleHidePages} className="dropDownIcon" />
        </button>
      </div>

      </>   )
      :(
        <>
      <div className="row rowcols-1">
        <div className="d-flex align-items-xl-end justify-content-evenly mx-auto w-50 h-50 firstPages" key={page}>
          <a href="/communities/best/1">1</a>
          <a href="/communities/best/2">2</a>
          <a href="/communities/best/3">3</a>
          <a href="/communities/best/4">4</a>
          <a href="/communities/best/5">5</a>
          <a href="/communities/best/6">6</a>
          <a href="/communities/best/7">7</a>
          <a href="/communities/best/8">8</a>
          <a href="/communities/best/9">9</a>
          <a href="/communities/best/10">10</a>
        </div>
      </div>
      <div className="d-flex justify-content-center mx-auto dropDownContainer">
        <button>
          <img src={DropdownIcon} onClick={handleDropDown} className="dropDownIcon" />
        </button>
      </div>
      </>
      )}
    </div>
  );
}

export default TopCommunities;

