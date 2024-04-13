import React from 'react';
import { useState, useEffect } from 'react';
import BackButton from '../../styles/icons/BackButton';
import { Avatar, IconButton, Box, Button } from '@chakra-ui/react';
import { SlOptions } from "react-icons/sl";
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

function PostContentDetails(post) {
    const [savedPosts, setSavedPosts] = useState([]);
    const [hiddenPosts, setHiddenPosts] = useState([]);
    const [isHidden, setIsHidden] = useState(false);
    const toast = useToast();
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
                    console.log(response.data.savedPosts);
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
        if (hiddenPosts && hiddenPosts.some(post => post._id === post._id)) {
            setIsHidden(true);
        }
        else{
            setIsHidden(false);
        }
    }, [hiddenPosts]);

    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);
    const [savedComments, setSavedComments] = useState([]);
    const navigate = useNavigate();
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

    const handleHidePost = () => {
        setIsHidden(!isHidden);
    }

    const handleBack = () => {
        navigate(-1);
    }


    return (
        <>
            {!isHidden &&
                <div className='d-flex flex-column w-100'>
                    <div className='d-flex'>
                        <div className='d-flex justify-content-start'>
                            <button onClick={handleBack} style={{backgroundColor: "#EAEDEF", width: "2.1rem", height: "2.1rem"}} className='back-button-post-content signup-back-button me-2 d-flex justify-content-center align-items-center'><BackButton/></button>
                            <Avatar size='sm' className='me-2' name='Segun Adebayo' src='https://a.thumbs.redditmedia.com/4SKK4rzvSSDPLWbx4kt0BvE7B-j1UQBLZJsNCGgMz54.png' />
                            <div className='d-flex flex-column'>
                                <a className='community-post-name'>r/germany</a>
                                <a className='community-post-name' style={{fontWeight: "300", fontSize: "0.875rem"}}>{post.user}</a>
                            </div>
                        </div>
                        <div className='ms-auto'>
                            <PostControl hidePost={handleHidePost} postDetails={true} hiddenPosts={hiddenPosts} savedPosts={savedPosts} savedComments={savedComments} username={post.user} _id={post._id} />
                        </div>
                    </div>
                    <h3 className='post-content-header mb-3'>{post.title}</h3>
                    <p className='post-details-content'>{post.content}</p>
                    <Box className='col-md-6 mb-5 col-12 col-lg-4' display='flex' justifyContent='start'>
                        <div className='d-flex me-2 align-items-center votes-control px-2' style={{backgroundColor: upvoted ? "#D93A00" : downvoted ? "#6A5CFF" : ""}}>
                            <button className='me-2 upvotes-footer-button' onClick={() => makePostUpvoted()}>
                                {upvoted ? <FilledUpvote /> : downvoted ? <Upvotes whiteOutline={true} /> : <Upvotes />}
                            </button>
                            <div className='me-2'>
                                <span className='votes-count' style={{color: upvoted || downvoted ? "#ffffff" : ""}}>{post.upvotes - post.downvotes}</span>
                            </div>
                            <button className='downvotes-footer-button' onClick={() => makePostDownvoted()}>
                                {downvoted ? <FilledDownvote /> : upvoted ? <Downvotes whiteOutline={true} /> : <Downvotes />}
                            </button>
                        </div>
                        <Button flex='1' className='post-footer-button me-2 px-1' variant='ghost' leftIcon={<FaRegCommentAlt />}>
                        <span className='share-post-text'>{post.comments.length}</span>
                        </Button>
                        <Button flex='1' className='post-footer-button me-2 px-3' variant='ghost'  leftIcon={<LuShare />}>
                        <span className='share-post-text'>Share</span>
                        </Button>
                    </Box>
                </div>
                }
                {isHidden && 
                    <div className='d-flex justify-content-between hidden-container mb-3'>
                        <h3 className='d-flex align-items-center post-hidden-content'>Post Hidden</h3>
                        <button onClick={handleUnhide} className='undo-button'>Undo</button>
                    </div>
                }
                <CommentInputForm />
                <div>
                    <PostComments username="Glutton_Sea" commentUpvotes={3} comment="How will they (USCIS) know exactly that you are engaged ? It will not be reported anywhere .And he most definitely should never mention this or you in an F1 visa interview. It will be absolutely denied . He needs to show strong ties to home country and no immigrant intent to get an F1. After he’s in the US, he can marry you etc and adjust status ." />
                </div>
        </>
    )
}

export default PostContentDetails