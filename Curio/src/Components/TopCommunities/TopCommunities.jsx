import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import "./TopCommunities.css";
import Community from "../OneCommunity/OneCommunity";
import Picture from "../../styles/icons/commPic.png";

import { Link } from "react-router-dom";
import axios from "axios";
import DropdownIcon from "../../styles/icons/DropdownIcon.svg";
import UpwardsIcon from "../../styles/icons/Upwards.svg";
import ShowMore from "../../styles/icons/ShowMore";

import { showCommunityInformation } from "./TopCommunitiesEnpoints.js";



/**
 * Renders the TopCommunities component.
 *
 * @component
 * @param {Object} props - The component props.
 * @module TopComms
 */
function TopCommunities(props) {
  const pagesIndex = useParams();

  let pages = [];

  const [communityInfo, setCommunityInfo] = useState([]);
  const [communitiesnumber, setCommunitiesNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAllPages, setShowAllPages] = useState(false);
  const commPerPage = 10;
  useEffect(() => {
    handleGetCommunities(currentPage);
  }, [currentPage]);

  useEffect(() => {
    props.hideSidebar();
    return () => {
      props.showSidebar();
    };
  }, []);


  async function handleGetCommunities(page) {
    const response = await showCommunityInformation(page);
    if (response) {
      setCommunityInfo(response.data.communities);
      setCommunitiesNumber(response.data.totalCommunitiesCount);
    }
  }


  for (let i = 1; i <= Math.ceil(communitiesnumber / commPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="container parentDiv">
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
      <div className="d-flex justify-content-evenly mx-auto w-50">
        {pages.slice(0, 5).map((page, index) => (
         <Link to={`/communities/best/${page}`}>
          <button key={index} onClick={() => setCurrentPage(page)} className={` ${currentPage === page ? "selectedPage" : ""}`}>
            {page}
          </button>
          </Link>

        ))}
            </div>
      </div>
      {!showAllPages && (
        <div className="d-flex justify-content-evenly mx-auto w-50">
          <button onClick={() => setShowAllPages(true)}><ShowMore /></button>
        </div>
      )}

    {showAllPages && (
      <div>
      {Array.from({ length: Math.ceil((pages.length) / 5) }).map((_, lineIndex) => (
        <div key={lineIndex} className="d-flex justify-content-evenly mx-auto w-50 mt-2">
          {pages.slice(5 + lineIndex * 5, 10 + lineIndex * 5).map((page, index) => (
            <Link to={`/communities/best/${page}`}>
            <button key={index} onClick={() => setCurrentPage(page)} className={` ${currentPage === page ? "selectedPage" : ""}`}>
              {page}
            </button>
            </Link>
          ))}
        </div>
      ))}
      <div className="d-flex justify-content-evenly mx-auto w-50">
        <button onClick={() => setShowAllPages(false)}><img src={UpwardsIcon} style={{width: '10px', fill: 'black'}} /></button>
      </div>
    </div>
  )}
</div>
  );
}

export default TopCommunities;