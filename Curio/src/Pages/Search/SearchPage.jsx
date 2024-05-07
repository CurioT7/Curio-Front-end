import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Divider } from '@chakra-ui/react'
import {useNavigate} from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import UserResults from "./UserResults";
import CommunityResults from "./CommunityResults";
import Post from '../../Components/Post/Post';
import PostComments from '../../Components/Post/PostComments';
import SearchListing from "./SearchListing";
import { SortSearchContent,SortSearchContentByHashtag } from "./SortingSearchEndPoints";
import { set } from "mongoose";

function SearchPage(){
    const { searchTerm } = useParams();
    const navigate = useNavigate();
    const [userResults, setUserResults] = useState([]);
    const [communityResults, setCommunityResults] = useState([]);
    const [postResults, setPostResults] = useState([]);
    const [commentResults, setCommentResults] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]);
    const [savedComments, setSavedComments] = useState([]);
    const [hiddenPosts, setHiddenPosts] = useState([]); 
    const [displaySort, setDisplaySort] = useState(1);
    const [hashtag,setHashtag] = useState({
        posts: [],
        comments: [],
        type:'Posts'
    });

    const handleUserResults = async () => {
        try{
            const hostUrl = import.meta.env.VITE_SERVER_HOST;
            const response = await axios.get(`${hostUrl}/api/search/people/${searchTerm}`);
            setUserResults(response.data.users);
        }
        catch(error){
            console.log(error);
        }
    }

    const handleCommunityResults = async () => {
        try{
            const hostUrl = import.meta.env.VITE_SERVER_HOST;
            const response = await axios.get(`${hostUrl}/api/searchCommunities/${searchTerm}`);
            setCommunityResults(response.data.subreddits);
        }
        catch(error){
            console.log(error);
            setCommunityResults([]);
        }

    }

    const handlePostResults = async () => {
        try{
            const hostUrl = import.meta.env.VITE_SERVER_HOST;
            const response = await axios.get(`${hostUrl}/api/search/${searchTerm}`);
            setPostResults(response.data.posts);
        }
        catch(error){
            console.log(error);
            setPostResults([]);
        }
    }

    const handleCommentResults = async () => {
        try{
            const hostUrl = import.meta.env.VITE_SERVER_HOST;
            const response = await axios.get(`${hostUrl}/api/searchCommentsOrPosts/${searchTerm}/comment/relevance`);
            setCommentResults(response.data.content);
        }
        catch(error){
            console.log(error);
            setCommentResults([]);
        }
    }

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
    useEffect(() => {
        if(displaySort == 1) handlePostResults();
        if (displaySort== 2) handleCommentResults();
    },[displaySort,searchTerm]);

    useEffect(() => {
        handleUserResults();
        handleCommunityResults();
        handlePostResults();
        handleHashtagResults();
        getSaved();
        getHidden();
    }, [searchTerm]);

    const handleHashtagResults = async () => {
        const data = await SortSearchContentByHashtag(searchTerm);
        if(data){
            setHashtag({type:"Posts",posts:data.posts,comments:data.comments});
        }
    }

    const handleChangeSort = async (sortType, timeinterval) => {
        if(displaySort == 2){
        const commentResult  = await SortSearchContent('comment', sortType, searchTerm);
        if(commentResult){
            setCommentResults(commentResult.content);
            }
        }
        if(displaySort == 1){
            if(timeinterval){
                const postResult = await SortSearchContent('post', sortType, searchTerm, timeinterval);
                if(postResult){
                    setPostResults(postResult.content);
                }
            }
           
        }
        if(displaySort == 3){
            setHashtag({...hashtag,type:sortType})
        }
    }

    const tabListRef = useRef();
    return (
        <div className="posts-content-container pt-4 mt-5">
            <Tabs variant='soft-rounded'>
                <div className="d-flex flex-column">
                    <div className="d-flex">
                        <div className="d-flex align-items-center me-3 mt-2">
                            <h2 style={{color: "#576f76", fontSize: "0.75rem", fontWeight: "600"}}>SEARCH RESULTS</h2>
                        </div>
                            <TabList className="scrollableTabList" ref={tabListRef}>
                                <Tab onClick={()=>{setDisplaySort(1)}}>Posts</Tab>
                                <Tab onClick={()=>{setDisplaySort(0)}}>Communities</Tab>
                                <Tab onClick={()=>{setDisplaySort(2)}}>Comments</Tab>
                                <Tab onClick={()=>{setDisplaySort(0)}}>People</Tab>
                                <Tab onClick={()=>{setDisplaySort(3)}}>HashTag</Tab>
                            </TabList>
                    </div>
                    <SearchListing searchTerm={searchTerm} displaySort={displaySort} onChangeSort={handleChangeSort} />
                    <div className="m-0 p-0">
                        <TabPanels className="m-0 p-0">
                            <TabPanel className="px-0 me-5">
                                {postResults.length === 0 ? (
                                    <p>No Search Results</p>
                                ) : (
                                    <>
                                    {postResults.map(post => (
                                        <>
                                            <Post
                                                _id={post._id}
                                                title={post.title}
                                                body={post.body}
                                                user={post.authorName}
                                                upvotes={post.upvotes}
                                                downvotes={post.downvotes}
                                                comments={post.comments}
                                                content={post.content}
                                                savedPosts={savedPosts}
                                                hiddenPosts={hiddenPosts}
                                                savedComments={savedComments}
                                                media={post.media}
                                            />
                                            <hr className='col-md-6 mb-3' style={{backgroundColor: "#0000003F"}}></hr>
                                        </>
                                    ))}
                                    </>
                                )}
                            </TabPanel>
                            <TabPanel>
                                {communityResults.length === 0 ? (
                                    <p>No search results</p>
                                ) : (
                                    <>
                                        {communityResults.map(community => (
                                            <>
                                                <CommunityResults name={community.name} members={community.members} />
                                                <hr className='col-md-6 mb-3' style={{backgroundColor: "#0000003F"}}></hr>
                                            </>
                                        ))}
                                    </>
                                )}
                            </TabPanel>
                            <TabPanel>
                                {commentResults.length === 0 ? (
                                    <p>No search results</p>
                                ) : (
                                    <>
                                        {commentResults.map(comment => (
                                            <>
                                                <PostComments
                                                    key={comment._id}
                                                    id={comment._id}
                                                    savedComments={savedComments}
                                                    username={comment.authorName}
                                                    commentUpvotes={comment.upvotes-comment.downvotes}
                                                    comment={comment.content}
                                                />
                                                <hr className='col-md-6 mb-3' style={{backgroundColor: "#0000003F"}}></hr>
                                            </>
                                        ))}
                                    </>
                                )}
                            </TabPanel>
                            <TabPanel>
                                {userResults.length === 0 ? (
                                    <p>No search results</p>
                                ) : (
                                    <>
                                        {userResults.map(user => (
                                            <>
                                                <UserResults username={user.username} karma={user.karma} />
                                                <hr className='col-md-6 mb-3' style={{backgroundColor: "#0000003F"}}></hr>
                                            </>
                                        ))}
                                    </>
                                )}
                            </TabPanel>
                            <TabPanel>
                              { hashtag.type==='Posts' &&
                              <>
                                { hashtag.posts.length == 0?( <p> No search result</p>):( <>
                                    {hashtag.posts.map(post => (
                                        <>
                                            <Post
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
                                                hiddenPosts={hiddenPosts}
                                                savedComments={savedComments}
                                            />
                                            <hr className='col-md-6 mb-3' style={{backgroundColor: "#0000003F"}}></hr>
                                        </>
                                    ))}
                                </>)
                                } 
                              </>

                              }
                              { hashtag.type==='Comments' &&
                              <>
                                { hashtag.comments.length == 0?( <p> No search result</p>):( <>
                                    {hashtag.comments.map(comment => (
                                        <>
                                            <PostComments
                                                key={comment._id}
                                                id={comment._id}
                                                savedComments={savedComments}
                                                username={comment.authorName}
                                                commentUpvotes={comment.upvotes-comment.downvotes}
                                                comment={comment.content}
                                            />
                                            <hr className='col-md-6 mb-3' style={{backgroundColor: "#0000003F"}}></hr>
                                        </>
                                    ))}
                                </>)
                                }
                              </>

                              }
                                
                            </TabPanel>
                        </TabPanels>
                    </div>
                </div>
            </Tabs>
        </div>
    );
}

export default SearchPage;