import Listing from "./Listing";
import "./CommunityPage.css";
import Post from "../Post/Post";
import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { fetchDataFromBackend } from "./CommunityEndPoints";
function CommunityBody({ props }) {
  const serverHost = import.meta.env.VITE_SERVER_HOST;
  const[posts, setPosts] = React.useState([])
  
  const { Community } = useParams();
  console.log(Community);



React.useEffect(() => {
    async function fetchAndSetData() {
        const data = await fetchDataFromBackend(Community);
        if (data) {
            setPosts(data.posts);
        }
    }

    fetchAndSetData();
}, [Community]);
console.log(posts);
  return (
    <div className="community-body">
      <div className=" list mb-3">
        <Listing  />
      </div>
      <h3 className="headings-titles text-uppercase fw-bold mb-1"></h3>

      <div className="post">
        <Post/>
      </div>
      
    </div>
  );
}
export default CommunityBody;