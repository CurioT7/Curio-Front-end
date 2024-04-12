import React from 'react';
import { useState } from 'react';
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

function PostContentDetails(post) {

    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);
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

    const handleBack = () => {
        navigate(-1);
    }


    return (
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
                    <PostControl postDetails={true} username={post.user} _id={post._id} />
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
            <CommentInputForm />
            <div>
                <PostComments username="Glutton_Sea" commentUpvotes={3} comment="How will they (USCIS) know exactly that you are engaged ? It will not be reported anywhere .And he most definitely should never mention this or you in an F1 visa interview. It will be absolutely denied . He needs to show strong ties to home country and no immigrant intent to get an F1. After he’s in the US, he can marry you etc and adjust status ." />
            </div>
        </div>
    )
}

export default PostContentDetails