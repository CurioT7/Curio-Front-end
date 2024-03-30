import Listing from "./Listing";
import "./CommunityPage.css";
import Post from "../Post/Post";
import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { fetchDataFromBackend } from "./CommunityEndPoints";
import { fetchNewFromBackend, fetchRisingFromBackend,fetchTopFromBackend } from "./CommunityEndPoints";
function CommunityBody({ props }) {
  const serverHost = import.meta.env.VITE_SERVER_HOST;
  const[posts, setPosts] = React.useState([])
  const[sortType, setSortType] = React.useState('')
  const { Community } = useParams();
  



React.useEffect(() => {
    async function fetchAndSetData() {
        const data = await fetchDataFromBackend(Community);
        if (data) {
            setPosts(data.posts);
        }
    }

    fetchAndSetData();
}, [Community]);


async function changeSortType(value) {
    setSortType(value);
    console.log(`value :${value}`);
    async function SetData() {
        if (value === 'Hot') {
            const data = await fetchDataFromBackend(Community);
            if (data) {
                setPosts(data.posts);
            }
        }
        else if (value === 'New') {
            const data = await fetchNewFromBackend(Community);
            if (data) {
                setPosts(data.posts);
            }
        }
        else if (value === 'Top') {
            const data = await fetchTopFromBackend(Community);
            if (data) {
                setPosts(data.posts);
            }
        }
        else if (value === 'Rising') {
            const data = await fetchRisingFromBackend(Community);
            if (data) {
                setPosts(data.posts);
            }
        }
    }
    SetData();
}
console.log(posts);
  return (
    <div className="community-body">
      <div className=" list mb-3">
        <Listing onChangeSort={changeSortType} />
      </div>
      <h3 className="headings-titles text-uppercase fw-bold mb-1"></h3>

      <div className="post">
        {posts.map((post) => (
          <Post
            
            id={post._id}
            title={post.title}
            body={post.body}
            user={post.authorName}
            upvotes={post.upvotes}
            downvotes={post.downvotes}
            comments={post.comments}
            content={post.content}
          />
        ))}
        
      </div>
      
    </div>
  );
}
export default CommunityBody;