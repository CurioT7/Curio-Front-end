import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Flex,Avatar,Box,Heading,IconButton,Text,Image } from '@chakra-ui/react'
import { Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
const VITE_SERVER_HOST = import.meta.env.VITE_SERVER_HOST;


import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
  } from '@chakra-ui/react'
import { FaRegCommentAlt } from "react-icons/fa";
import { PiLockSimple } from "react-icons/pi";
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
import { BsShield } from "react-icons/bs";
import { PiLockSimpleFill } from "react-icons/pi";
import { SendLockedPost,SendUnlockedPost,FetchPostLockStatus } from './PostEndPoints.js';
import './Post.css'
import PostControl from './PostControl.jsx';
import axios from 'axios';

function Post(props) {
    const [subreddit, setSubreddit] = useState([]);
    const [isHidden, setIsHidden] = useState(false);
    const toast = useToast();
    const postId = props._id;
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
    const navigate = useNavigate();
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
    const Toast = (message,statues) => {
        toast({
            description: message,
            status: statues,
            duration: 3000,
            isClosable: true,
        });
    }
    const makePostUpvoted = () => {
        if (upvoted) {
            setUpvoted(false);
        } else {
            setUpvoted(true);
            setDownvoted(false);
        }
    }
    const makePostDownvoted = () => {
        if (downvoted) {
            setDownvoted(false);
        } else {
            setDownvoted(true);
            setUpvoted(false);
        }
    }
    useEffect(() => {
        const fetchPostLockStatus = async () => {
            const response = await FetchPostLockStatus(props.id);
            if(response){
                setIsLocked(response.item.isLocked);
            }
        }
        fetchPostLockStatus();
    },[])
    const handleLockComments = async () => {
       
        const response = await SendLockedPost(props.id);
        if(response.success){
            setIsLocked(true);
            console.log("Post locked successfully");
            Toast("Post locked successfully","success");
        }
        else{
            Toast("Something went wrong, please try again later.","error");
        }

    }
    const handleUnlockComments = async () => {
        
        const response = await SendUnlockedPost(props.id);
        if(response.success){
            console.log("Post unlocked successfully");
            setIsLocked(false);
            Toast("Post unlocked successfully","success");
        }
        else{
            Toast("Something went wrong, please try again later.","error");
        }
    }

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

    const handleNavigationToDetails = () => {
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
            dateViewed: new Date().toISOString()
        }
        const recentPosts = JSON.parse(localStorage.getItem('recentPosts'));
        console.log(post);


        if (recentPosts && Array.isArray(recentPosts)) {

            const postExists = recentPosts.find((recentPost) => recentPost._id === post._id);
            if (!postExists) {

                recentPosts.unshift(post);
                recentPosts.slice(0,10);
                localStorage.setItem('recentPosts', JSON.stringify(recentPosts));
            }
        }
        else {
            localStorage.setItem('recentPosts', JSON.stringify([post]));
        }

        if (recentPosts && recentPosts.length === 0) {
            localStorage.setItem('recentPosts', JSON.stringify([post]));
        }
        window.dispatchEvent(new Event('newRecentPost'));
        navigate(`/post/post-details/${props._id}`, { state: { post } });
    }

 

    return (

        <>
            {!isHidden &&
                <div>
                    <Card className='Post' variant='ghost' >
                        <CardHeader className='py-0'>
                            <Flex spacing='4'>
                            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                <Avatar size='sm' name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />

                                <Box>
                                <a href={`/user/${props.user}`} className='community-post-name'>{props.user}</a>
                                
                                </Box>
                            </Flex>
                            {isLocked && <FcLock className='lock-icon' />}
                            <PostControl hidePost={handleHidePost} postDetails={false} hiddenPosts={props.hiddenPosts} savedPosts={props.savedPosts} savedComments={props.savedComments} username={props.user} _id={props._id} />
                            </Flex>
                        </CardHeader>
                        <CardBody className='py-0' onClick={handleNavigationToDetails}>
                            <Heading as='h3' size='md'>{props.title}</Heading>
                            {props.content && <Text className='text-body'>
                            {props.content}
                            </Text>}
                            {props.image && <Image
                                objectFit='cover'
                                src={props.image}
                                alt='Chakra UI'
                                className='mb-1'
                            />}
                            
                        </CardBody>
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
                                <div className='d-flex me-2 align-items-center votes-control px-2' style={{backgroundColor: upvoted ? "#D93A00" : downvoted ? "#6A5CFF" : ""}}>
                                    <button data-testid="upvotes" className='me-2 upvotes-footer-button' onClick={() => makePostUpvoted()}>
                                        {upvoted ? <FilledUpvote /> : downvoted ? <Upvotes whiteOutline={true} /> : <Upvotes />}
                                    </button>
                                    <div className='me-2'>
                                        <span className='votes-count' style={{color: upvoted || downvoted ? "#ffffff" : ""}}>{(props.upvotes - props.downvotes > 0) ? (props.upvotes - props.downvotes) : 0}</span>
                                    </div>
                                    <button data-testid="downvotes" className='downvotes-footer-button' onClick={() => makePostDownvoted()}>
                                        {downvoted ? <FilledDownvote /> : upvoted ? <Downvotes whiteOutline={true} /> : <Downvotes />}
                                    </button>
                                </div>
                                <Button flex='1' className='post-footer-button me-2 px-1' variant='ghost' leftIcon={<FaRegCommentAlt />}>
                                <span className='share-post-text'>{props.comments.length}</span>
                                </Button>
                                <Menu>
                                <MenuButton as={Button} flex='1' className='post-footer-button me-2 px-3' variant='ghost' leftIcon={<LuShare />}>
                                    <span data-testid="share" className='share-post-text'>Share</span>
                                </MenuButton>
                                <MenuList>
                                <MenuItem onClick={async () => {
                                    
                                        console.log('postId:', postId);
                                    
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

                            {props.isMod&& <Box display='flex'  justifyContent='end'>
                                <Popover>
                                    <PopoverTrigger>
                                        <Button
                                            variant='ghost'
                                            colorScheme='gray'
                                            className='moderator-icon'
                                            
                                        ><BsShield /></Button>
                                    </PopoverTrigger>
                                    <PopoverContent margin={0} padding={0}>
                                        <PopoverBody margin={0} padding={0}>
                                        {isLocked?(<Text onClick={handleUnlockComments} margin={0} padding={3} className='moderator-content'><div><PiLockSimpleFill className='moderator-content-icon' /><span>Unlock Comments</span></div></Text>) :(<Text onClick={handleLockComments} margin={0} padding={3} className='moderator-content'> <div> <PiLockSimple className='moderator-content-icon'  /> <span>Lock comments</span></div></Text>)}
                                            
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>
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