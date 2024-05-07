import React from 'react'
import { useState, useEffect } from 'react'
import "./Home.css"
import RecentPosts from '../../Components/RecentPosts/RecentPosts'
import Post from '../../Components/Post/Post'
import BackToTheTopButton from "./BackToTopButton.jsx";
import Listing from '../../Components/CommunitiesListing/Listing.jsx'
import Poll from '../../Components/Poll/ShowPoll.jsx'
import { SortHomePosts } from './HomeEndPoints.jsx'
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
  const [sortType, setSortType] = useState('Best');
  const [sortTime, setSortTime] = useState('today');
  const [didVote, setDidVote] = useState(false);
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
  async function fetchData() {
  
  if (sortType==='top') {
    const data = await SortHomePosts(sortType, pageNumber, sortTime);
    if(data){
      setPosts(data.posts);
      setTotalPages(Math.ceil(data.totalPosts / 10));
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
  }else{
    const data =await SortHomePosts(sortType, pageNumber);
    console.log(data);
    if(data){
      setPosts(data.posts);
      setTotalPages(Math.ceil(data.totalPosts / 10));
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
  window.addEventListener('deletePost', fetchData);
  window.addEventListener('loginOrSignup', fetchData);
  fetchData();
  return () => {
    window.removeEventListener('deletePost', fetchData);
    window.removeEventListener('loginOrSignup', fetchData);
  }
}, [pageNumber]);



async function changeSortType(value,time) {
  
      if(value==="Top"){
        const data = await SortHomePosts(value,pageNumber,time);
        setSortType(value.toLowerCase());
        setSortTime(time);
        if (data) {
            setPosts(data.posts || data);
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
      else{
          const data = await SortHomePosts(value, pageNumber);
          setSortType(value.toLowerCase());
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

useEffect(() => {
  if (localStorage.getItem('token')) {
    if (posts) {
      const votes = [];
      posts.forEach(post => {
        votes[post.post._id] = post.details.pollVote !== null;
      });
      setDidVote(votes);
    }
  }
}, [posts]);


  return (
    <>
    
      {/* Insert posts here (above recent posts) */}
      <div style={{marginTop: "70px"}} className='col-12 col-lg-6  d-flex p-3 posts-container flex-column'>
        <div className='my-1'>
        <Listing onChangeSort={changeSortType} isHome={true} isCommunity={false} isProfile={false}/>
        <hr className='col-md-12 mb-3' style={{backgroundColor: "#0000003F"}}></hr>
        </div>
        {localStorage.getItem('token') ? (
              posts
                .filter(post => !blockedUsers.includes(post.authorName))
                .map((post) => (
                  <>
                    {post.post.type === 'poll' ? (
                    <Post
                    pollTitle={post.post.title}
                    body={post.post.body}
                    pollText={post.post.content}
                    user={post.post.authorName}
                    _id={post.post._id}
                    type={post.post.type}
                    optionNames={post.post.options.map((option) => option.name)}
                    votes={post.post.options.map((option) => option.votes)}
                    upvotes={post.post.upvotes}
                    downvotes={post.post.downvotes}
                    comments={post.post.comments}
                    isLocked={post.post.isLocked}
                    voteLength={post.post.voteLength}
                    linkedSubreddit={post.details?.subredditName}
                    didVote={didVote[post.post._id]}
                    optionSelected={post.details?.pollVote}
                    pollEnded={post.details?.pollEnded}
                    createdAt={post.post.createdAt}
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
                    media={post.post.media}
                    //isMod={isMod}
                    linkedSubreddit={post.details?.subredditName}
                    voteStatus={post.details?.voteStatus}
                    isLocked={post.post.isLocked}
                    savedPosts={savedPosts}
                    hiddenPosts={hiddenPosts}
                    isUserMember={post.details?.isUserMemberOfItemSubreddit}
                  />
                  )}
                    <hr className='col-md-12 mb-3' style={{backgroundColor: "#0000003F"}}></hr>
                  </>
                ))
            ):(
              posts
                .filter(post => !blockedUsers.includes(post.authorName))
                .map((post) => (
                  <>
                    {post.post.type === 'poll' ? (
                    <Post
                    pollTitle={post.post.title}
                    body={post.post.body}
                    pollText={post.post.content}
                    user={post.post.authorName}
                    _id={post.post._id}
                    type={post.post.type}
                    optionNames={post.post.options.map((option) => option.name)}
                    votes={post.post.options.map((option) => option.votes)}
                    upvotes={post.post.upvotes}
                    downvotes={post.post.downvotes}
                    comments={post.post.comments}
                    isLocked={post.post.isLocked}
                    voteLength={post.post.voteLength}
                    linkedSubreddit={post.post.linkedSubreddit.name}
                    didVote={didVote[post.post._id]}
                    optionSelected={post.details?.pollVote}
                    pollEnded={post.details?.pollEnded}
                    createdAt={post.post.createdAt}
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
                    media={post.post.media}
                    //isMod={isMod}
                    linkedSubreddit={post.post.linkedSubreddit?.name}
                    voteStatus={post.details?.voteStatus}
                    isLocked={post.post.isLocked}
                    savedPosts={savedPosts}
                    hiddenPosts={hiddenPosts}
                    isUserMember={post.details?.isUserMemberOfItemSubreddit}
                  />
                  )}
                    <hr className='col-md-12 mb-3' style={{backgroundColor: "#0000003F"}}></hr>
                  </>
                ))
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