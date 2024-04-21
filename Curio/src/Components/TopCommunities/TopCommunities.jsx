import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import "./TopCommunities.css";
import Community from "../OneCommunity/OneCommunity";
import Picture from "../../styles/icons/commPic.png";

import { Link } from "react-router-dom";
import axios from "axios";
import DropdownIcon from "../../styles/icons/DropdownIcon.svg";
import UpwardsIcon from "../../styles/icons/Upwards.svg";
import SearchIcon from "../../styles/SearchIcon";

const hostUrl = import.meta.env.VITE_SERVER_HOST;

function TopCommunities(props) {

  let pages = [];

  const [communityInfo, setCommunityInfo] = useState([]);
  const [communitiesnumber, setCommunitiesNumber] = useState(0);
  const [isDropDown, toggleDropDown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const commPerPage = 10;
  useEffect(() => {
    showCommunityInformation(currentPage);
  }, [currentPage]);

  useEffect(() => {
    props.hideSidebar();
    return () => {
      props.showSidebar();
    };
  }, []);

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

  const lastCommIndex = currentPage * commPerPage;
  const firstCommIndex = lastCommIndex - commPerPage;
  const currentComms = communityInfo.slice(firstCommIndex, lastCommIndex);


  for (let i = 1; i <= Math.ceil(communitiesnumber / commPerPage); i++) {
    pages.push(i);
  }

  console.log("Printed communities:", currentComms);

  return (
    <div id="testtest2" className="container parentDiv">
      <h1 className="text-center best-of-reddit">Best of Curio</h1>
      <h2 className="top-communities">Top Communities</h2>
      <h2 className="browse">Browse Reddit's largest communities</h2>
          <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-xs-1 w-100 rowHeight" style={{height: 'fit-content'}}>
            {communityInfo.map((community, index) => (
              <Community
                index={index + (currentPage -1) * commPerPage}
                name={community.name}
                category={community.category}
                members={community.members}
                picture={Picture}
              />
            ))}
          </div>
      <div className="pagination">
      <div className="d-flex align-items-xl-end justify-content-evenly mx-auto w-50">
      {pages.map((page, index) => {
          return (
            <button key={index} onClick={() => setCurrentPage(page)} className={currentPage === page ? "selectedPage" : ""}>
              {page}
            </button>
          );
        })}
        </div>
      </div>
    </div>
  );
}

export default TopCommunities;