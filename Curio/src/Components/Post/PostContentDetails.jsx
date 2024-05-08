import React from 'react';
import { useState, useEffect } from 'react';
import BackButton from '../../styles/icons/BackButton';
import { Avatar, IconButton, Box } from '@chakra-ui/react';
import { Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { FcLock } from "react-icons/fc";
import { FaRegCommentAlt } from "react-icons/fa";
import { LuShare } from "react-icons/lu";
import Upvotes from '../../styles/icons/Upvotes';
import Downvotes from '../../styles/icons/Downvotes';
import FilledDownvote from '../../styles/icons/FilledDownvote';
import FilledUpvote from '../../styles/icons/FilledUpvote';
import { useNavigate } from 'react-router-dom';
import PostComments from './PostComments';
import CommentInputForm from './CommentInputForm';
import PostControl from './PostControl';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { fetchCommentsFromBackend,GetSortedComments } from './CommentsEndPoints';
import SortingComments from './SortingComments';
import {useParams} from 'react-router-dom';
import PostLock from './PostLock';
import { set } from 'mongoose';
import UserPopover from '../UserPopover/UserPopover.jsx';
import { userFollow, userUnfollow, getFollower, showFriendInformation } from '../FriendInformation/ShowFriendInformationEndpoints.js';
import { FetchSubredditName } from './PostEndPoints';
import Polls from '../../Components/Poll/ShowPoll.jsx';


const hostUrl = import.meta.env.VITE_SERVER_HOST;

const token = localStorage.getItem('token');

function PostContentDetails(post) {
    const { postID } = useParams();
    const [savedPosts, setSavedPosts] = useState([]);
    const [hiddenPosts, setHiddenPosts] = useState([]);
    const [isHidden, setIsHidden] = useState(false);
    const [comments, setComments] = useState([]);
    const [isLocked, setIsLocked] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [friendInfo, setFriendInfo] = useState({});
    const [didVote, setDidVote] = useState(false);
    const [votes, setVotes] = useState(post.upvotes - post.downvotes);
    const toast = useToast();
    const postId = post._id;
    const [isClicked, setIsClicked] = useState(false);


    const handleIsLocked = (value) => {
        setIsLocked(value);
    }
   
    useEffect(() => {
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
                    setSavedComments(response.data.savedComments);
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
        if(localStorage.getItem('token')){
            getHidden();    
            getSaved();
        }
    }, []);
 
    const handleUnhide = async () => {
        try{
            var hostUrl = import.meta.env.VITE_SERVER_HOST;
            const response = await axios.post(`${hostUrl}/api/unhide`, {
                postId: post._id
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.status === 200){
                toast({
                    description: "Post Unhidden",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
                window.dispatchEvent(new Event('hideOrSave'));
                setIsHidden(false);
            }
        }
        catch(err){
            console.log(err);
            if (err.response.status === 409){
                toast({
                    description: "Item already unhidden.",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            }
            else{
                toast({
                    description: "Server Error Occured.",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            }
    }
    }

    useEffect(() => {
        if(localStorage.getItem('token')){
            if (hiddenPosts && hiddenPosts.some(hiddenPost => hiddenPost._id === post._id)) {
                setIsHidden(true);
            }
            else{
                setIsHidden(false);
            }
        }
    }, [hiddenPosts]);

    useEffect(() => {   
        setIsLocked(post.isLocked);
    },[post])

    const [upvoted, setUpvoted] = useState((post.voteStatus || (post.details && post.details[0].voteStatus)) === "upvoted" ? true : false);
    const [downvoted, setDownvoted] = useState((post.voteStatus || (post.details && post.details[0].voteStatus)) === "downvoted" ? true : false);
    const [savedComments, setSavedComments] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            if (post.voteStatus){
                return;
            }
            else if (post.details && post.details[0].voteStatus){
                if (post.details[0].voteStatus === "upvoted"){
                    setUpvoted(true);
                    setDownvoted(false);
                }
                else if (post.details[0].voteStatus === "downvoted"){
                    setDownvoted(true);    
                    setUpvoted(false);         
                }
            }
        }
    }, [post]);
    const makePostUpvoted = async () => {
        if (localStorage.getItem('token') === null) {
            navigate('/login');
        }
        if (upvoted) {
            const response = await axios.post(`${hostUrl}/api/vote`, {
                itemID: post._id,
                itemName: "post",
                direction: 0
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.status === 200 || response.status === 201){
                setUpvoted(false);
                setVotes(votes - 1);
            }
        } else {
            const response = await axios.post(`${hostUrl}/api/vote`, {
                itemID: post._id,
                itemName: "post",
                direction: 1
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.status === 200 || response.status === 201){
                setUpvoted(true);
                setDownvoted(false);
                setVotes(votes + 1);
            }
        }
    }
    const makePostDownvoted = async () => {
        if (localStorage.getItem('token') === null) {
            navigate('/login');
        }
        if (downvoted) {
            const hostUrl = import.meta.env.VITE_SERVER_HOST;
            const response = await axios.post(`${hostUrl}/api/vote`, {
                itemID: post._id,
                itemName: "post",
                direction: 0
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.status === 200 || response.status === 201){
                setDownvoted(false);
                setVotes(votes + 1);
            }
        } else {
            const response = await axios.post(`${hostUrl}/api/vote`, {
                itemID: post._id,
                itemName: "post",
                direction: -1
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.status === 200 || response.status === 201){
                setDownvoted(true);
                setUpvoted(false);
                setVotes(votes - 1);
            }
        }
    }

    const handleHidePost = () => {
        setIsHidden(!isHidden);
    }

    function Toast(){
        toast({
            description: "Something went wrong, please try again later.",
            status: "error",
            duration: 3000,
            isClosable: true,
        });
    }
    const handleBack = () => {
        setIsClicked(false);
        navigate(-1);
    }
    useEffect(() => {
        async function fetchAndSetData() {
            if (localStorage.getItem('token') === null) {
                const response = await axios.get(`${hostUrl}/api/comments/${post._id}`);
                if (response.status === 200 || response.status === 201) {
                    setComments(response.data.comments);
                }
                else {
                    Toast();
                }
            }
            else{
                const response = await axios.get(`${hostUrl}/api/comments/${post._id}`,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.status === 200 || response.status === 201) {
                    setComments(response.data);
                }
                else {
                    Toast();
                }
            }       
        }
        window.addEventListener('deleteComment', fetchAndSetData);
    
        fetchAndSetData();
        return () => {
            window.removeEventListener('deleteComment', fetchAndSetData);
        }
    }, [post]);

    const handleChangedSort = async (value) => {
        setTimeout( async () => {
            
            const data = await GetSortedComments(post._id, value,post.details[0].subredditName);
            if (data) {
                setComments(data.comments);
            }
            else {
                Toast();
            }
        },0)
       
    }

    function handleFollowToggle(username) {
        if (!token) {
         navigate('/login');
        }
        else{
        if (isFollowing) {
            userUnfollow(username);
        } else {
            userFollow(username);
        }
        setIsFollowing(!isFollowing);
    }
    }

    async function handleGetFollower(username) {
        try {
            const result = await getFollower(username);
            if (result) {
                setIsFollowing(true);
            } else {
                console.error('Error:', result.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function showFriendInfo(username) {
        const result = await showFriendInformation(username);
        if(result) {
          setFriendInfo(result.data);
        }
      }

      function handleCopyLink(postId) {
        navigator.clipboard.writeText(`http://localhost:5173/post/post-details/${postId}`);
        alert('Link copied to clipboard');
      }

    const handleNavigationToSubreddit = () => {
        navigate(`/r/${post.subreddit}`);
    }

    useEffect(() => {
        if (post && post.details) {
            setDidVote(post.details[0].pollVote !== null);
        }
    }, [post]);
      

    return (
        <>
            {!isHidden &&
                <div className='d-flex flex-column w-100'>
                    <div className='d-flex'>
                        <div className='d-flex justify-content-start'>
                            <button onClick={handleBack} style={{backgroundColor: "#EAEDEF", width: "2.1rem", height: "2.1rem"}} className='back-button-post-content signup-back-button me-2 d-flex justify-content-center align-items-center'><BackButton/></button>
                            <Avatar size='sm' className='me-2' name='Segun Adebayo' src='https://a.thumbs.redditmedia.com/4SKK4rzvSSDPLWbx4kt0BvE7B-j1UQBLZJsNCGgMz54.png' />
                            <div className='d-flex flex-column'>
                                <a onClick={handleNavigationToSubreddit} className='community-post-name'>r/{post.subreddit || (post.details && post.details[0].subredditName)}</a>
                                <UserPopover user={post.user || post.authorName} friendInfo={friendInfo} isFollowing={isFollowing} handleFollowToggle={handleFollowToggle} 
                                handleGetFollower={handleGetFollower} showFriendInformation={showFriendInfo} classname="userPosting" />
                            </div>
                        </div>
                        <div className='ms-auto d-flex flex-direction-row'>
                            <div>
                                {isLocked && <FcLock className='lock-icon' />}
                            </div>
                            <PostControl hidePost={handleHidePost} postDetails={true} hiddenPosts={hiddenPosts} savedPosts={savedPosts} savedComments={savedComments} username={post.user} _id={post._id} />
                        </div>
                    </div>
                    { post.type === "poll" ? (<Polls optionNames={post.options.map((option) => option.name)} user={post.authorName} 
                    votes={post.options.map((option) => option.votes)} _id={post._id} pollTitle={post.title} optionSelected={post.details[0].pollVote}
                    pollText={post.content} voteLength={post.voteLength} pollEnded={post.details[0].pollEnded} didVote={didVote}/>) : (
                    <>
                    <h3 className='post-content-header mb-3'>{post.title}</h3>

                    <div onClick={() => setIsClicked(true)}>
                        {post.isSpoiler && !isClicked ? (
                            <>
                                <p className='text-body-spoiler'>
                                    {post.content}
                                </p>
                            </>
                        ) : (
                            <>
                                <p className='post-details-content' dangerouslySetInnerHTML={{ __html: post.content}} />

                            </>
                        )}
                        </div>
                        </>
                        )}
                        {post.media !== "" && <img className='mb-3' src={post.media} alt={post.title} />}
                    <Box className=' mb-5 col-12 ' display='flex' flexDirection='row' justifyContent='space-between'>
                            <Box display='flex' flexDirection='row'>
                            <div className='d-flex me-2 align-items-center votes-control px-2' style={{backgroundColor: upvoted ? "#D93A00" : downvoted ? "#6A5CFF" : ""}}>
                                <button className='me-2 upvotes-footer-button' onClick={() => makePostUpvoted()}>
                                    {upvoted ? <FilledUpvote /> : downvoted ? <Upvotes whiteOutline={true} /> : <Upvotes />}
                                </button>
                                <div className='me-2'>
                                    <span className='votes-count' style={{color: upvoted || downvoted ? "#ffffff" : ""}}>{votes || (post.upvotes - post.downvotes)}</span>
                                </div>
                                <button className='downvotes-footer-button' onClick={() => makePostDownvoted()}>
                                    {downvoted ? <FilledDownvote /> : upvoted ? <Downvotes whiteOutline={true} /> : <Downvotes />}
                                </button>
                            </div>
                            <Button flex='1' className='post-footer-button me-2 px-1' variant='ghost' leftIcon={<FaRegCommentAlt />}>
                            <span className='share-post-text'>{comments?.length}</span>
                            </Button>
                                <Menu>
                                        <MenuButton as={Button} flex='1' className='post-footer-button me-2 px-3' variant='ghost' leftIcon={<LuShare />}>
                                            <span data-testid="share" className='share-post-text'>Share</span>
                                        </MenuButton>
                                        <MenuList>
                                        <MenuItem onClick={async () => {
                                            handleCopyLink(postId);
                                        }}>
                                        <svg rpl="" class="mt-[1px] ml-[4px]" fill="currentColor" height="20" icon-name="link-post-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14.111 12.5a3.701 3.701 0 0 1-1.09 2.41c-.479.47-.928.922-1.378 1.373-.45.45-.894.9-1.368 1.366a3.852 3.852 0 0 1-2.698 1.099 3.852 3.852 0 0 1-2.698-1.099 3.738 3.738 0 0 1-1.116-2.659c0-.997.402-1.953 1.116-2.658.479-.472.928-.923 1.378-1.375.45-.45.893-.9 1.368-1.365A3.936 3.936 0 0 1 9.638 8.59a3.968 3.968 0 0 1 2.24.258c.27-.269.546-.54.812-.806l.131-.13a5.086 5.086 0 0 0-3.182-.624A5.052 5.052 0 0 0 6.732 8.71c-.48.471-.929.922-1.377 1.373-.449.451-.894.9-1.37 1.366A4.982 4.982 0 0 0 2.5 14.992c0 1.328.534 2.602 1.486 3.543A5.13 5.13 0 0 0 7.58 20a5.13 5.13 0 0 0 3.595-1.465c.478-.471.927-.923 1.377-1.374.451-.451.894-.9 1.368-1.366a4.993 4.993 0 0 0 1.263-2.071c.243-.781.288-1.61.132-2.412L14.11 12.5Z"></path>
                                            <path d="M16.017 1.467A5.123 5.123 0 0 0 12.422 0a5.123 5.123 0 0 0-3.595 1.467c-.478.471-.926.923-1.377 1.374-.45.451-.894.9-1.367 1.366a4.966 4.966 0 0 0-1.106 1.624 4.907 4.907 0 0 0-.291 2.86l1.2-1.19a3.699 3.699 0 0 1 1.092-2.41c.478-.472.928-.923 1.377-1.374.45-.45.894-.9 1.368-1.366a3.844 3.844 0 0 1 2.698-1.101c1.012 0 1.982.396 2.698 1.101a3.736 3.736 0 0 1 1.116 2.66c0 .996-.401 1.953-1.116 2.658-.478.471-.927.922-1.377 1.373-.45.451-.893.9-1.368 1.367a3.933 3.933 0 0 1-2.014 1.003 3.966 3.966 0 0 1-2.24-.26c-.273.274-.551.549-.818.818l-.123.12a5.087 5.087 0 0 0 3.183.624 5.053 5.053 0 0 0 2.906-1.423c.477-.472.926-.923 1.376-1.375.45-.452.894-.9 1.368-1.365A4.977 4.977 0 0 0 17.5 5.008a4.977 4.977 0 0 0-1.488-3.543l.005.002Z"></path>
                                        </svg>
                                        Copy Link
                                    </MenuItem>
                                        </MenuList>
                                        </Menu>
                        </Box>
                        <Box>
                            {post.isMod&& 
                            <PostLock id={postId} isLocked={isLocked} onChangeLock={handleIsLocked} />
                            }
                        </Box>
                    </Box>
                </div>
                }
                {isHidden && 
                    <div className='d-flex justify-content-between hidden-container mb-3'>
                        <h3 className='d-flex align-items-center post-hidden-content'>Post Hidden</h3>
                        <button onClick={handleUnhide} className='undo-button'>Undo</button>
                    </div>
                }
                <CommentInputForm type={"createComment"} ID={postId} />
                <SortingComments onChangeSort={handleChangedSort} />
            {comments && comments.map((comment, index) => (
                <PostComments key={comment._id} id={comment._id} savedComments={savedComments} voteStatus={comment.details?.voteStatus || "unvoted"} username={comment.authorName} commentUpvotes={comment.upvotes-comment.downvotes} comment={comment.content} />
            ))}
        </>
    )
}

export default PostContentDetails