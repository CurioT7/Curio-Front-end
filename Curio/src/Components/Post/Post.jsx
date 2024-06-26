import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Flex,Avatar,Box,Heading,IconButton,Text,Image } from '@chakra-ui/react'
import { Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import picture from "../../styles/icons/commPic.png";
import Minus from "../../styles/icons/Minus";
import PlusIcon from "../../styles/icons/PlusIcon";
import Chat from "../../styles/icons/Chat";
import { userFollow, userUnfollow, getFollower, showFriendInformation } from '../FriendInformation/ShowFriendInformationEndpoints.js';
import UserPopover from '../UserPopover/UserPopover.jsx';
import Polls from '../Poll/ShowPoll.jsx';


const VITE_SERVER_HOST = import.meta.env.VITE_SERVER_HOST;



import { FaRegCommentAlt } from "react-icons/fa";
import PostLock from './PostLock.jsx';
import { FcLock } from "react-icons/fc";
import { LuShare } from "react-icons/lu";
import { SlOptions } from "react-icons/sl";
import Upvotes from '../../styles/icons/Upvotes.jsx';
import Downvotes from '../../styles/icons/Downvotes.jsx';
import FilledDownvote from '../../styles/icons/FilledDownvote.jsx';
import FilledUpvote from '../../styles/icons/FilledUpvote.jsx';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

import { FetchObjectInfo } from './PostEndPoints.js';
import './Post.css'
import PostControl from './PostControl.jsx';
import axios from 'axios';
const hostUrl = import.meta.env.VITE_SERVER_HOST;
const token = localStorage.getItem('token');



function Post(props) {
    const [subredditName, setSubredditName] = useState("");
    const [isHidden, setIsHidden] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [friendInfo, setFriendInfo] = useState({});
    const [isUserMember, setIsUserMember] = useState();
    const toast = useToast();
    const postId = props._id;
    const [votes, setVotes] = useState(props.upvotes - props.downvotes);
    const handleHidePost = () => {
        setIsHidden(!isHidden);
    }
    useEffect(() => {
        if (props.hiddenPosts && props.hiddenPosts.some(post => post._id === props._id)) {
            setIsHidden(true);
        } else {
            setIsHidden(false);
        }      
    }, [props.hiddenPosts, props._id])
    useEffect(() => {
        setUpvoted(props.voteStatus === "upvoted" ? true : false);
        setDownvoted(props.voteStatus === "downvoted" ? true : false);
        setIsLocked(props.isLocked);
        setIsUserMember(props.isUserMember);
        window.addEventListener('loginOrSignup', () => {
            if (localStorage.getItem('token') === null){
                setUpvoted(false);
                setDownvoted(false);
            }
        });
        return () => {
            window.removeEventListener('loginOrSignup', () => {
               if (localStorage.getItem('token') === null){
                setUpvoted(false);
                setDownvoted(false);
               }
            });
        }
    }, [])
    const navigate = useNavigate();
    const [upvoted, setUpvoted] = useState((localStorage.getItem('token') && props.voteStatus === "upvoted") ? true : false);
    const [downvoted, setDownvoted] = useState((localStorage.getItem('token') && props.voteStatus === "downvoted") ? true : false);
    const [isLocked, setIsLocked] = useState(false);

    
    const makePostUpvoted = async () => {
        if (localStorage.getItem('token') === null) {
            navigate('/login');
        }
        if (upvoted) {
            const response = await axios.post(`${hostUrl}/api/vote`, {
                itemID: props._id,
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
                itemID: props._id,
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
                itemID: props._id,
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
                setUpvoted(false);
                setVotes(votes + 1);
            }
        } else {
            const response = await axios.post(`${hostUrl}/api/vote`, {
                itemID: props._id,
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
    
    const handleIsLocked = (value) => {
        setIsLocked(value);
    }
  
    
const postCategory = async (postID) => {
    
    const url = `${VITE_SERVER_HOST}/api/saved_categories`;
    const token = localStorage.getItem('token')

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
    });
    

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const responseData = await response.json();

    const postData = responseData.map(post => ({
     
        isSpoiler: post.isSpoiler,
        
    }));


    return postData;
};

    const handleUnhide = async () => {
        try{
            var hostUrl = import.meta.env.VITE_SERVER_HOST;
            const response = await axios.post(`${hostUrl}/api/unhide`, {
                postId: props._id
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

    // useEffect(() => {
    //     const fetchPostStatus = async () => {
    //         const postInfo = await FetchObjectInfo(props._id,"post");
    //         if(postInfo){
    //             setIsLocked(postInfo.item.isLocked);  
    //         }
    //         const SubredditInfo = await FetchObjectInfo(props.linkedSubreddit,"subreddit");
    //         if(SubredditInfo){
                
    //             setSubredditName(SubredditInfo.item.name);
    //         }
    //     }
    //     fetchPostStatus();
    // })

    const handleNavigationToDetails = async () => {
        try{
            const post = {
                _id: props._id,
                user: props.user,
                title: props.title,
                subreddit: props.linkedSubreddit,
                content: props.content,
                media: props.media,
                upvotes: props.upvotes,
                downvotes: props.downvotes,
                comments: props.comments,
                savedPosts: props.savedPosts,
                savedComments: props.savedComments,
                voteStatus: upvoted ? "upvoted" : downvoted ? "downvoted" : "unvoted",
                hiddenPosts: props.hiddenPosts,
                isSpoiler: props.isSpoiler,
                isMod: props.isMod,
                isLocked: isLocked,
                voteLength: props.voteLength,
                pollTitle: props.pollTitle,
                pollText: props.pollText,
                optionNames: props.optionNames,
                votes: props.votes,
                didVote: props.didVote,
                optionSelected: props.optionSelected,
                type: props.type,
                pollEnded: props.pollEnded,
                dateViewed: new Date().toISOString()
            }
            const hostUrl = import.meta.env.VITE_SERVER_HOST;
            const response = await axios.post(`${hostUrl}/api/history`, {
                postID: props._id
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.status === 200 || response.status === 201){
                window.dispatchEvent(new Event('newRecentPost'));
                navigate(`/post/post-details/${props._id}`, { state: { post } });
            }
            if (response.status === 401){
                navigate(`/post/post-details/${props._id}`, { state: { post } });
            }
        }
        catch(err){
            const post = {
                _id: props._id,
                user: props.user,
                title: props.title,
                subreddit: props.linkedSubreddit,
                content: props.content,
                image: props.image,
                upvotes: props.upvotes,
                downvotes: props.downvotes,
                comments: props.comments,
                savedPosts: props.savedPosts,
                savedComments: props.savedComments,
                hiddenPosts: props.hiddenPosts,
                isMod: props.isMod,
                isSpoiler: props.isSpoiler,
                isLocked: isLocked,
                voteLength: props.voteLength,
                pollTitle: props.pollTitle,
                pollText: props.pollText,
                optionNames: props.optionNames,
                votes: props.votes,
                didVote: props.didVote,
                optionSelected: props.optionSelected,
                type: props.type,
                pollEnded: props.pollEnded,
                dateViewed: new Date().toISOString()
            }
            
            navigate(`/post/post-details/${props._id}`, { state: { post } });
        }
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
        const result = await getFollower(username);
        if (result) {
            setIsFollowing(true);
        } else {
            console.error('Error occurred in getFollower');
        }
    }
    

    async function showFriendInfo(username) {
        const result = await showFriendInformation(username);
        if(result) {
          setFriendInfo(result.data);
        }
      }

    async function handleJoinCommunity() {
        if (localStorage.getItem('token') === null){
            navigate('/login');
        } else {
            if (!isUserMember){
                const response = await axios.post(`${hostUrl}/api/friend`, {
                    subreddit: props.linkedSubreddit
                },
                {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.status === 200){
                    setIsUserMember(!isUserMember);
                }
            }
            else {
                const response = await axios.post(`${hostUrl}/api/unfriend`, {
                        subreddit: props.linkedSubreddit
                    },{
                        headers: {
                            authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );
                if (response.status === 200){
                    setIsUserMember(!isUserMember);
                }
            }
        }
    }


 

    return (
        
        <>
            {!isHidden &&
                <div>
                    <Card className='Post' variant='ghost' >
                        {props.linkedSubreddit && <p onClick={() => navigate(`r/${props.linkedSubreddit}`)} style={{marginLeft: "70px"}} className='mb-0 subreddit-post-name'>r/{props.linkedSubreddit}</p>}
                        <CardHeader className='py-0'>
                            <Flex spacing='4'>
                            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                <Avatar size='sm' name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
                               <UserPopover user={props.user} friendInfo={friendInfo} isFollowing={isFollowing} handleFollowToggle={handleFollowToggle} 
                               handleGetFollower={handleGetFollower} showFriendInformation={showFriendInfo} classname="community-post-name" />
                            </Flex>
                            {isLocked && <FcLock className='lock-icon' />}
                            {props.linkedSubreddit && <button onClick={handleJoinCommunity} className='join-button mt-1'>{!isUserMember ? "Join" : "Leave"}</button>}
                            <PostControl hidePost={handleHidePost} postDetails={false} hiddenPosts={props.hiddenPosts} savedPosts={props.savedPosts} savedComments={props.savedComments} username={props.user} _id={props._id} isSpoiler={props.isSpoiler}  post={props.post}/>
                            </Flex>
                        </CardHeader>
                        {props.type === 'poll' ? (<Polls optionNames={props.optionNames} user={props.user} votes={props.votes} _id={props._id} pollTitle={props.pollTitle}
                            pollText={props.pollText} voteLength={props.voteLength} handleNavigation={handleNavigationToDetails}
                            didVote={props.didVote} optionSelected={props.optionSelected} pollEnded={props.pollEnded} createdAt={props.createdAt} /> ) : (
                        <CardBody className='py-0' onClick={handleNavigationToDetails} >
                            <Heading as='h3' size='md'>{props.title}</Heading>
                        {props.type === "media" && <Image style={{ filter: props.isNSFW ? "blur(4px)" : ""}} src={props.media} alt={props.title} className='mb-1 d-flex justify-content-center w-100' />}
                     {props.isSpoiler ? (
                            <>
                                <span className='text-body-spoiler' >
                                    {props.content}
                                </span>
                            </>
                        ) : (
                            <>  
                            <Text className='text-body' dangerouslySetInnerHTML={{ __html: props.content}}></Text>
                            </>
                        )}
                            {props.image && <Image
                                objectFit='cover'
                                src={props.image}
                                alt='Chakra UI'
                                className='mb-1'
                            />}

                            
                        </CardBody>
                        
                    ) }
                        {/* <Image
                            objectFit='cover'
                            src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                            alt='Chakra UI'
                        /> */}

                        <CardFooter
                            display='flex'
                            className='py-0 pb-2'
                            flexDirection='row'
                            justifyContent='space-between'
                            flexWrap='wrap'
                            sx={{
                            '& > button': {
                                minW: '136px',
                            },
                            }}
                        >   
                            <Box display='flex' justifyContent='start'>
                                <div className='d-flex me-2 align-items-center votes-control px-2' style={{backgroundColor: (upvoted && localStorage.getItem("token")) ? "#D93A00" : (downvoted && localStorage.getItem("token")) ? "#6A5CFF" : ""}}>
                                    <button data-testid="upvotes" className='me-2 upvotes-footer-button' onClick={() => makePostUpvoted()}>
                                        {(upvoted && localStorage.getItem("token") !== null) ? <FilledUpvote /> : (downvoted && localStorage.getItem("token") !== null) ? <Upvotes whiteOutline={true} /> : <Upvotes />}
                                    </button>
                                    <div className='me-2'>
                                        <span className='votes-count' style={{color: upvoted || downvoted ? "#ffffff" : ""}}>{votes}</span>
                                    </div>
                                    <button data-testid="downvotes" className='downvotes-footer-button' onClick={() => makePostDownvoted()}>
                                        {(downvoted && localStorage.getItem("token")) ? <FilledDownvote /> : (upvoted && localStorage.getItem("token")) ? <Downvotes whiteOutline={true} /> : <Downvotes />}
                                    </button>
                                </div>
                                <Button flex='1' className='post-footer-button me-2 px-1' variant='ghost' leftIcon={<FaRegCommentAlt />}>
                                <span className='share-post-text'>{props.comments && props.comments.length}</span>                                
                                </Button>
                                <Menu>
                                <MenuButton as={Button} flex='1' className='post-footer-button me-2 px-3' variant='ghost' leftIcon={<LuShare />}>
                                    <span data-testid="share" className='share-post-text'>Share</span>
                                </MenuButton>
                                <MenuList>
                                <MenuItem onClick={async () => {
                                    
                                    
                                        await navigator.clipboard.writeText(`http://localhost:5173/post/post-details/${postId}`);
                                        alert('Link copied to clipboard');
                                   
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

                            {props.isMod && <Box display='flex'  justifyContent='end'>
                               <PostLock isLocked={isLocked} id={props._id} onChangeLock={handleIsLocked} />
                            </Box>}
                            
                        </CardFooter>
                    </Card>
                </div>
            }
            {isHidden && 
                <div className='d-flex justify-content-between hidden-container'>
                    <h3 className='d-flex align-items-center post-hidden-content'>Post Hidden</h3>
                    <button onClick={handleUnhide} className='undo-button'>Undo</button>
                </div>
            }
        </>
    )
}
export default Post;