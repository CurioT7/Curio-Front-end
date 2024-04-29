import Listing from "./Listing";
import "./CommunityPage.css";
import Post from "../Post/Post";
import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { useParams } from 'react-router-dom'
import { fetchDataFromBackend } from "./CommunityEndPoints";
import { fetchNewFromBackend, fetchRisingFromBackend,fetchTopFromBackend,fetchTopTimeFromBackend,fetchSubCurioInfo,fetchUserName } from "./CommunityEndPoints";
function CommunityBody(props) {
  const navigate = useNavigate();
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
            
            if(mod.username===userData.username){
              setIsMod(true);
            }
          })
      }
  }

  fetchAndSetData();
}, [Community]);

function handleCreatePost(){
  props.setSubreddit(Community);
  navigate(`/user/CreatePost`);
}

async function changeSortType(value,time) {
    
    
    
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

  return (
    <div className="community-body">
      <div className=" list mb-3">
        <Listing onChangeSort={changeSortType} isCommunity={true} isProfile={false} isHome={false} />
      </div>
      <h3 className="headings-titles text-uppercase fw-bold mb-1"></h3>

      <div className="post">
        {randomPost.isSelected==false ? (posts.map((post) => (
          <>
          {post.type === 'poll' ? (
                    <Post
                    pollTitle={post.title}
                    body={post.body}
                    pollText={post.content}
                    user={post.authorName}
                    _id={post._id}
                    type={post.type}
                    optionNames={post.options.map((option) => option.name)}
                    votes={post.options.map((option) => option.votes)}
                    upvotes={post.upvotes}
                    downvotes={post.downvotes}
                    comments={post.comments}
                    voteLength={post.voteLength}
                    isLocked={post.isLocked}
                    subreddit={Community}
                  />) : (
                    <Post
                    _id={post._id}
                    title={post.title}
                    body={post.body}
                    user={post.authorName}
                    upvotes={post.upvotes}
                    downvotes={post.downvotes}
                    comments={post.comments}
                    content={post.content}
                    isMod={isMod}
                    linkedSubreddit={post.linkedSubreddit}
                    isLocked={post.isLocked}
                    subreddit={Community}
                  />
                  )}
          <h3 className="headings-titles text-uppercase fw-bold mb-1"></h3>
          </>
        ))):(
          <>
 {randomPost.post.type === 'poll' ? (
                    <Post
                    pollTitle={randomPost.post.title}
                    body={randomPost.post.body}
                    pollText={randomPost.post.content}
                    user={randomPost.post.authorName}
                    _id={randomPost.post._id}
                    type={randomPost.post.type}
                    optionNames={randomPost.post.options.map((option) => option.name)}
                    votes={randomPost.post.options.map((option) => option.votes)}
                    upvotes={randomPost.post.upvotes}
                    downvotes={randomPost.post.downvotes}
                    comments={randomPost.post.comments}
                    voteLength={randomPost.post.voteLength}
                    isLocked={randomPost.post.isLocked}
                    subreddit={Community}
                  />) : (
                    <Post
                    _id={randomPost.post._id}
                    title={randomPost.post.title}
                    body={randomPost.post.body}
                    user={randomPost.post.authorName}
                    upvotes={randomPost.post.upvotes}
                    downvotes={randomPost.post.downvotes}
                    comments={randomPost.post.comments}
                    content={randomPost.post.content}
                    isMod={isMod}
                    linkedSubreddit={randomPost.post.linkedSubreddit}
                    isLocked={randomPost.post.isLocked}
                    subreddit={Community}
                  />
                  )}
        </>
        )}
        {(posts.length<1 && randomPost.isSelected==false) ||(!randomPost.post && randomPost.isSelected==true)? (<div className="m-5 row justify-content-center align-items-center">
          <div className="col text-center">
          <h4 className="fw-bold" >This community doesn't have any posts yet</h4>
          <p className="text-muted">Make one and get this feed started.</p>
          <Button onClick={handleCreatePost} colorScheme="blue" fontSize='sm' fontWeight='bold' style={{borderRadius:'30px'}} >Create a post</Button>
          </div>
          </div>):null}
      </div>
      
    </div>
  );
}
export default CommunityBody;