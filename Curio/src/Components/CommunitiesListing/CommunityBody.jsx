import Listing from "./Listing";
import "./CommunityPage.css";
import Post from "../Post/Post";
import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { fetchDataFromBackend } from "./CommunityEndPoints";
import { fetchNewFromBackend, fetchRisingFromBackend,fetchTopFromBackend,fetchTopTimeFromBackend } from "./CommunityEndPoints";
function CommunityBody({ props }) {
  
  const[posts, setPosts] = React.useState([])
  const[randomPost, setRandomPost] = React.useState({
    post:{

    },
    isSelected: false
  })
  const { Community } = useParams();
  



React.useEffect(() => {
    async function fetchAndSetData() {
        const data = await fetchDataFromBackend(Community);
        if (data) {
            setPosts(data.posts);
            setRandomPost({ ...randomPost, isSelected: false });
        }
    }

    fetchAndSetData();
}, [Community]);



async function changeSortType(value,time) {
    
    console.log(`value :${value}`);
    async function SetData() {
        if (value === 'Hot') {
            const data = await fetchDataFromBackend(Community);
            if (data) {
                setPosts(data.posts);
                setRandomPost({ ...randomPost, isSelected: false });
            }
        }
        else if (value === 'New') {
            const data = await fetchNewFromBackend(Community);
            if (data) {
                setPosts(data.posts);
                setRandomPost({ ...randomPost, isSelected: false });
            }
        }
        else if (value === 'Top') {
          if(time==="All Time"){
            const data = await fetchTopFromBackend(Community);
            if (data) {
              setPosts(data.post);
              setRandomPost({ ...randomPost, isSelected: false });
          }
          }
          else{
            const data = await fetchTopTimeFromBackend(Community,time);
            if (data) {
              setPosts(data.post);
              setRandomPost({ ...randomPost, isSelected: false });
              }
            }
            
        }
        else if (value === 'Random') {
            const data = await fetchRisingFromBackend(Community);
            if (data) {
                setRandomPost({ post: data.post, isSelected: true });
                console.log(`this is random post: ${randomPost.post}`);
            }
        }
    }
    SetData();
}
console.log(posts);
  return (
    <div className="community-body">
      <div className=" list mb-3">
        <Listing onChangeSort={changeSortType} isCommunity={true} isProfile={false} isHome={false} />
      </div>
      <h3 className="headings-titles text-uppercase fw-bold mb-1"></h3>

      <div className="post">
        {randomPost.isSelected==false ? (posts.map((post) => (
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
        ))):(<Post
            
          id={randomPost.post._id}
          title={randomPost.post.title}
          body={randomPost.post.body}
          user={randomPost.post.authorName}
          upvotes={randomPost.post.upvotes}
          downvotes={randomPost.post.downvotes}
          comments={randomPost.post.comments}
          content={randomPost.post.content}
        />)}
        
      </div>
      
    </div>
  );
}
export default CommunityBody;