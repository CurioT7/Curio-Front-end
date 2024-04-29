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
import ShowPoll from '../../Components/Poll/ShowPoll.jsx'
import Pagination from 'react-bootstrap/Pagination';

function Home() {
  const [savedPosts, setSavedPosts] = useState([]);
  const [savedComments, setSavedComments] = useState([]);
  const [hiddenPosts, setHiddenPosts] = useState([]); 
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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

  const [polls, setPolls] = React.useState([]);

useEffect(() => {
  async function fetchAndSetData() {
      const data = await SortHomePosts("best", pageNumber);

    if (data) {
      setPosts(data.posts);
      setTotalPages(Math.ceil(data.totalPosts / 10));
      setRandomPost({ ...randomPost, isSelected: false });
      window.scrollTo(0, 0); // Scroll to the top of the page
      //const pollsData = data.SortedPosts.filter(post => post.type === 'poll');
      //console.log('Polls Data:', pollsData);
      //setPolls(pollsData);
    }
  }

  window.addEventListener('deletePost', fetchAndSetData);

  fetchAndSetData();
  console.log("posts", posts)
  return () => {
    window.removeEventListener('deletePost', fetchAndSetData);
  }
}, [pageNumber]);


useEffect(() => {
  console.log('Polls needed array:', polls);
}, [polls]);


async function changeSortType(value,time) {
  
  
  async function SetData() {
      if (value === 'Hot') {
          const data = await SortHomePosts("hot");
          if (data) {
              setPosts(data.posts || data);
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

function handleShowPolls(){
  console.log(polls);
}

async function getBlocked() {
  try {
      if (!localStorage.getItem('token')) {
          console.error('Token not found');
          return;
      }
      const hostUrl = import.meta.env.VITE_SERVER_HOST;
      const response = await axios.get(`${hostUrl}/api/settings/v1/me/prefs`, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
      });
      const blockedUsernames = response.data.viewBlockedPeople.map(user => user.blockedUsername);
      setBlockedUsers(blockedUsernames);
      return response.data
  } catch (error) {
      console.error('Error:', error);
  }
}

useEffect(() => {
  async function handleBlocked() {
   await getBlocked();
  }

  handleBlocked();
}, []);


  return (
    <>
    
      {/* Insert posts here (above recent posts) */}
      <div style={{marginTop: "70px"}} className='col-9 col-lg-6 col-md-6 d-flex p-3 posts-container flex-column'>
        <div className='my-1'>
        <Listing onChangeSort={changeSortType} isHome={true} isCommunity={false} isProfile={false} onClick={handleShowPolls}/>
        <hr className='col-md-12 mb-3' style={{backgroundColor: "#0000003F"}}></hr>
        </div>
            {((randomPost.isSelected==false) && posts) ? (
              posts
                .filter(post => !blockedUsers.includes(post.authorName))
                .map((post) => (
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
                  />) : (
                    <Post
                    _id={post.post._id}
                    title={post.post.title}
                    body={post.post.body}
                    user={post.post.authorName}
                    upvotes={post.post.upvotes}
                    downvotes={post.post.downvotes}
                    comments={post.post.comments}
                    content={post.post.content}
                    //isMod={isMod}
                    linkedSubreddit={post.details.subredditName}
                    voteStatus={post.details.voteStatus}
                    isLocked={post.post.isLocked}
                  />
                  )}
                    <hr className='col-md-12 mb-3' style={{backgroundColor: "#0000003F"}}></hr>
                  </>
                ))
            ):(
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
                    //isMod={isMod}
                    linkedSubreddit={randomPost.post.linkedSubreddit}
                    isLocked={randomPost.post.isLocked}
                  />
                  )}
                <hr className='col-md-12 mb-3' style={{backgroundColor: "#0000003F"}}></hr>
              </>
            )}
      </div>
      <div className='d-flex justify-content-end ms-auto mb-4 fixed-container' style={{marginRight: "3rem", paddingTop: "1.2rem", height: "100vh", overflowY: "auto", width: "20%"}}>
          <RecentPosts />
          <BackToTheTopButton/>
      </div>
      <div style={{marginLeft: "20rem"}}>

        <Pagination>
          <Pagination.Prev onClick={() => setPageNumber(pageNumber - 1)} />
          <Pagination.Ellipsis onClick={() => setPageNumber((pageNumber - 10) < 0 ? 1 : (pageNumber - 10))} />

          <Pagination.Item active>{pageNumber}</Pagination.Item>
          <Pagination.Item onClick={() => setPageNumber(pageNumber + 1)}>{pageNumber + 1}</Pagination.Item>
          <Pagination.Item onClick={() => setPageNumber(pageNumber + 2)}>{pageNumber + 2}</Pagination.Item>
          <Pagination.Item onClick={() => setPageNumber(pageNumber + 3)}>{pageNumber + 3}</Pagination.Item>
          <Pagination.Item onClick={() => setPageNumber(pageNumber + 4)}>{pageNumber + 4}</Pagination.Item>

          <Pagination.Ellipsis onClick={() => setPageNumber((pageNumber + 10) > totalPages ? totalPages : (pageNumber + 10))} />
          <Pagination.Next onClick={() => setPageNumber(pageNumber + 1)} />
        </Pagination>
      </div>

    
    </>
  )
}

export default Home