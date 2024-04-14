import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import "./TopCommunities.css";
import Community from "../OneCommunity/OneCommunity";
import Picture from "../../styles/icons/commPic.png";

import { Link } from "react-router-dom";
import axios from "axios";
import DropdownIcon from "../../styles/icons/DropdownIcon.svg";
import UpwardsIcon from "../../styles/icons/Upwards.svg";

const hostUrl = import.meta.env.VITE_SERVER_HOST;

function TopCommunities(props) {

  const { pagesIndex } = useParams();

  let pages = [];

  const [communityInfo, setCommunityInfo] = useState([]);
  const [communitiesnumber, setCommunitiesNumber] = useState(0);
  const [isDropDown, toggleDropDown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const commPerPage = 250;
  useEffect(() => {
    props.hideSidebar();
    showCommunityInformation(currentPage);
  }, [currentPage]);

  async function showCommunityInformation(page) {
    try {
      const response = await axios.get(`${hostUrl}/api/best/communities?page=${page}`);
        console.log(response.data.communities);
        setCommunityInfo(response.data.communities);
        setCommunitiesNumber(response.data.totalCommunitiesCount);
    } catch (error) {
        console.error('Error:', error);
    }
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
  {
    name: "r/funny",
    category: "Funny/Humor",
    members: "58M",
    picture: Picture,
  },
];


  const lastCommIndex = currentPage * commPerPage;
  const firstCommIndex = lastCommIndex - commPerPage;
  const currentComms = communityInfo.slice(firstCommIndex, lastCommIndex);

  for (let i = 1; i <= Math.ceil(communitiesnumber / commPerPage); i++) {
    pages.push(i);
  }



  return (
    <div id="testtest2" className="container parentDiv">
      <h1 className="text-center best-of-reddit">Best of Curio</h1>
      <h2 className="top-communities">Top Communities</h2>
      <h2 className="browse">Browse Reddit's largest communities</h2>
      {currentComms.map((_, index) => {
        return index % 4 === 0 ? (
          <div className="row rows-cols-1 row-cols-xl-4 row-cols-l-3 row-cols-md-2 row-cols-sm-1 w-100 rowHeight">
            {currentComms.slice(index, index + 4).map((community, key) => (
              <Community
                index={(currentPage - 1) * commPerPage + index + key}
                name={community.name}
                category={community.category}
                members={community.members}
                picture={Picture}
              />
            ))}
          </div>
        ) : null;
      })}
      <div className="pagination">
      <div className="d-flex align-items-xl-end justify-content-evenly mx-auto w-50">
        {pages.map((page, index) => {
          return (
            <Link to={`/communities/best/${page}`}>
            <button key={index} onClick={() => setCurrentPage(page)}>
              {page}
            </button>
            </Link>
          );
        })}
        </div>
      </div>
    </div>
  );
}

export default TopCommunities;
