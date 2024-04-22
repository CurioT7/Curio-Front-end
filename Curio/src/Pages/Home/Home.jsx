import React from 'react'
import { useState, useEffect } from 'react'
import "./Home.css"
import RecentPosts from '../../Components/RecentPosts/RecentPosts'
import Post from '../../Components/Post/Post'
import BackToTheTopButton from "./BackToTopButton.jsx";
import Listing from '../../Components/CommunitiesListing/Listing.jsx'
import Poll from '../../Components/Poll/ShowPoll.jsx'
import { fetchPostsFromBackend,SortHomePosts } from './HomeEndPoints.js'
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { set } from 'mongoose'
function Home() {
  const [savedPosts, setSavedPosts] = useState([]);
  const [savedComments, setSavedComments] = useState([]);
  const [hiddenPosts, setHiddenPosts] = useState([]); 
  const [isBlocked, setIsBlocked] = useState(false);
  const toast = useToast();

  const getSaved = async () => {
      try{
        var hostUrl = import.meta.env.VITE_SERVER_HOST;
        const response = await axios.get(`${hostUrl}/api/saved_categories`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.status === 200 || response.status === 201){
          setSavedPosts(response.data.savedPosts);
        }
      }
      catch(err){
        toast({
          description: "Server Error Occured.",
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    }

    const getHidden = async () => {
      try{
        var hostUrl = import.meta.env.VITE_SERVER_HOST;
        const response = await axios.get(`${hostUrl}/api/hidden`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.status === 200 || response.status === 201){
          setHiddenPosts(response.data.hiddenPosts);
        }
      }
      catch(err){
          toast({
            description: "Server Error Occured.",
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
      }
    }

  const refetchHiddenSavedPosts = async () => {
    if(localStorage.getItem('token')){
      getHidden();
      getSaved();
    }
  }

  
  useEffect(() => {
    window.addEventListener('hideOrSave', refetchHiddenSavedPosts);
    window.addEventListener('loginOrSignup', async () => {
      if (localStorage.getItem('token')) {
        getHidden();
        getSaved();
      }
      else{
        setHiddenPosts([]);
        setSavedPosts([]);
      }
    })
    
    if(localStorage.getItem('token')){
      getHidden();
      getSaved();
    }

    return () => {
      window.removeEventListener('hideOrSave', refetchHiddenSavedPosts);
      window.removeEventListener('loginOrSignup', async () => {
        if (localStorage.getItem('token')) {
          getHidden();
          getSaved();
        }
        else{
          setHiddenPosts([]);
          setSavedPosts([]);
        }
      })
    }
  }, []);

  const[posts, setPosts] = React.useState([])
  const[randomPost, setRandomPost] = React.useState({
    post:{

    },
    isSelected: false
  })
useEffect(() => {
  async function fetchAndSetData() {
      const data = await fetchPostsFromBackend();
      
      if (data) {
          setPosts(data.SortedPosts || data);
          setRandomPost({ ...randomPost, isSelected: false });
      }
  }
  window.addEventListener('deletePost', fetchAndSetData);

  fetchAndSetData();
  return () => {
      window.removeEventListener('deletePost', fetchAndSetData);
  }
}, []);


async function changeSortType(value,time) {
  
  
  async function SetData() {
      if (value === 'Hot') {
          const data = await SortHomePosts("hot");
          if (data) {
              setPosts(data.SortedPosts || data);
              setRandomPost({ ...randomPost, isSelected: false });
          } else{
            setPosts([]);
            toast({
              description: "Server Error Occured.",
              status: 'error',
              duration: 5000,
              isClosable: true,
            })
          }
      }
      else if (value === 'New') {
          const data = await SortHomePosts("new");
          if (data) {
              setPosts(data.SortedPosts || data);
              setRandomPost({ ...randomPost, isSelected: false });
          }
          else{
            setPosts([]);
            toast({
              description: "Server Error Occured.",
              status: 'error',
              duration: 5000,
              isClosable: true,
            })
          }
      }
      else if (value === 'Top') {
          const data = await SortHomePosts("top");
          if (data) {
              setPosts(data.SortedPosts || data);
              setRandomPost({ ...randomPost, isSelected: false });
          }
          else{
            setPosts([]);
            toast({
              description: "Server Error Occured.",
              status: 'error',
              duration: 5000,
              isClosable: true,
            })
          }
      }
      else if (value === 'Best') {
          const data = await fetchPostsFromBackend();
          if (data) {
              setPosts(data.SortedPosts || data);
              setRandomPost({ ...randomPost, isSelected: false });
          }
          else{
            setPosts([]);
            toast({
              description: "Server Error Occured.",
              status: 'error',
              duration: 5000,
              isClosable: true,
            })
          }
      }
  }
  SetData();
}



  return (
    <>
    
      {/* Insert posts here (above recent posts) */}
      <div className='col-9 col-lg-6 col-md-6 d-flex p-3 posts-container flex-column'>
        <div className='my-1'>
        <Listing onChangeSort={changeSortType} isHome={true} isCommunity={false} isProfile={false}/>
        <hr className='col-md-12 mb-3' style={{backgroundColor: "#0000003F"}}></hr>
        </div>
        )}
        {((randomPost.isSelected==false) && posts) ? (posts.map((post) => (
          <><Post
            
            _id={post._id}
            title={post.title}
            body={post.body}
            user={post.authorName}
            upvotes={post.upvotes}
            downvotes={post.downvotes}
            comments={post.comments}
            content={post.content}
            linkedSubreddit={post.linkedSubreddit}
            savedPosts={savedPosts}
            savedComments={savedComments}
            hiddenPosts={hiddenPosts}
          />
          <hr className='col-md-12 mb-3' style={{backgroundColor: "#0000003F"}}></hr>
          </>
        ))):(
        <><Post
            
          _id={randomPost.post._id}
          title={randomPost.post.title}
          body={randomPost.post.body}
          user={randomPost.post.authorName}
          upvotes={randomPost.post.upvotes}
          downvotes={randomPost.post.downvotes}
          comments={randomPost.post.comments}
          content={randomPost.post.content}
          linkedSubreddit={randomPost.linkedSubreddit}
          savedPosts={savedPosts}
          savedComments={savedComments}
        />
        <hr className='col-md-12 mb-3' style={{backgroundColor: "#0000003F"}}></hr>
        </>)}
      </div>
      <div className='d-flex justify-content-end ms-auto mb-4 fixed-container' style={{marginRight: "3rem", paddingTop: "1.2rem", height: "100vh", overflowY: "auto", width: "20%"}}>
          <RecentPosts />
          <BackToTheTopButton/>

      </div>
    
    </>
  )
}

export default Home
