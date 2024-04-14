import Listing from "./Listing";
import "./CommunityPage.css";
import Post from "../Post/Post";
import React from 'react';
import { Button } from "@chakra-ui/react";
import { useParams } from 'react-router-dom'
import { fetchDataFromBackend } from "./CommunityEndPoints";
import { fetchNewFromBackend, fetchRisingFromBackend,fetchTopFromBackend,fetchTopTimeFromBackend,fetchSubCurioInfo,fetchUserName } from "./CommunityEndPoints";
function CommunityBody({ props }) {
  
  const[posts, setPosts] = React.useState([])
  const[randomPost, setRandomPost] = React.useState({
    post:{

    },
    isSelected: false
  })
  const { Community } = useParams();
  const[isMod,setIsMod] = React.useState(false);



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

React.useEffect(() => {
  async function fetchAndSetData() {
      const subCurioData = await fetchSubCurioInfo(Community);
      const userData = await fetchUserName();
      if (subCurioData && userData) {
          subCurioData.subreddit.moderators.map((mod)=>{
            console.log(mod.username);
            if(mod.username===userData.username){
              setIsMod(true);
            }
          })
      }
  }

  fetchAndSetData();
}, [Community]);



async function changeSortType(value,time) {
    
    
    async function SetData() {
        if (value === 'Hot') {
            const data = await fetchDataFromBackend(Community);
            if (data) {
                setPosts(data.posts);
                setRandomPost({ ...randomPost, isSelected: false });
            }
            else{
              setPosts([]);
              setRandomPost({ ...randomPost, isSelected: false });
            }
        }
        else if (value === 'New') {
            const data = await fetchNewFromBackend(Community);
            if (data) {
                setPosts(data.posts);
                setRandomPost({ ...randomPost, isSelected: false });
            }
            else{
              setPosts([]);
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
          else{
            setPosts([]);
            setRandomPost({ ...randomPost, isSelected: false });
          }
          }
          else{
            const data = await fetchTopTimeFromBackend(Community,time);
            if (data) {
              setPosts(data.post);
              setRandomPost({ ...randomPost, isSelected: false });
              }
              else{
                setPosts([]);
                setRandomPost({ ...randomPost, isSelected: false });
              }
            }
            
        }
        else if (value === 'Random') {
            const data = await fetchRisingFromBackend(Community);
            if (data) {
                setRandomPost({ post: data.post, isSelected: true });
                
            }
            else{
              setRandomPost({ post:{}, isSelected: true });
            }
        }
    }
    SetData();
}

  return (
    <div className="community-body">
      <div className=" list mb-3">
        <Listing onChangeSort={changeSortType} isCommunity={true} isProfile={false} isHome={false} />
      </div>
      <h3 className="headings-titles text-uppercase fw-bold mb-1"></h3>

      <div className="post">
        {randomPost.isSelected==false ? (posts.map((post) => (
          <>
          <Post
            
            id={post._id}
            title={post.title}
            body={post.body}
            user={post.authorName}
            upvotes={post.upvotes}
            downvotes={post.downvotes}
            comments={post.comments}
            content={post.content}
            isMod={isMod}
          />
          <h3 className="headings-titles text-uppercase fw-bold mb-1"></h3>
          </>
        ))):(<Post
            
          id={randomPost.post._id}
          title={randomPost.post.title}
          body={randomPost.post.body}
          user={randomPost.post.authorName}
          upvotes={randomPost.post.upvotes}
          downvotes={randomPost.post.downvotes}
          comments={randomPost.post.comments}
          content={randomPost.post.content}
          isMod={isMod}
        />)}
        {(posts.length<1 && randomPost.isSelected==false) ||(!randomPost.post && randomPost.isSelected==true)? (<div className="m-5 row justify-content-center align-items-center">
          <div className="col text-center">
          <h4 className="fw-bold" >This community doesn't have any posts yet</h4>
          <p className="text-muted">Make one and get this feed started.</p>
          <Button colorScheme="blue" fontSize='sm' fontWeight='bold' style={{borderRadius:'30px'}} >Create a post</Button>
          </div>
          </div>):null}
      </div>
      
    </div>
  );
}
export default CommunityBody;