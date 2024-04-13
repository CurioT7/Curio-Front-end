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
import SortingComments from './SortingComments';
import {useParams} from 'react-router-dom';
import { fetchCommentsFromBackend } from './CommentsEndPoints';
import { useToast } from '@chakra-ui/react';

function PostContentDetails() {
    const toast = useToast();
    const { postID } = useParams();
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);
    const [comments, setComments] = useState([]);
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
    function Toast(){
        toast({
            description: "Something went wrong, please try again later.",
            status: "error",
            duration: 3000,
            isClosable: true,
        });
    }
    const handleBack = () => {
        navigate(-1);
    }
    console.log("hello world");
    React.useEffect(() => {
        console.log("hello UseEffect");
        async function fetchAndSetData() {
            const data = await fetchCommentsFromBackend(postID);
            if (data) {
                setComments(data.comments);
            }
            else {
                Toast();
            }
        }
    
        fetchAndSetData();
    }, []);

    return (
        <div className='d-flex flex-column w-100'>
            <div className='d-flex'>
                <div className='d-flex justify-content-start'>
                    <button onClick={handleBack} style={{backgroundColor: "#EAEDEF", width: "2.1rem", height: "2.1rem"}} className='back-button-post-content signup-back-button me-2 d-flex justify-content-center align-items-center'><BackButton/></button>
                    <Avatar size='sm' className='me-2' name='Segun Adebayo' src='https://a.thumbs.redditmedia.com/4SKK4rzvSSDPLWbx4kt0BvE7B-j1UQBLZJsNCGgMz54.png' />
                    <div className='d-flex flex-column'>
                        <a className='community-post-name'>r/germany</a>
                        <a className='community-post-name' style={{fontWeight: "300", fontSize: "0.875rem"}}>thisissodamnhard103</a>
                    </div>
                </div>
                <IconButton
                    className='ms-auto'
                    variant='ghost'
                    colorScheme='gray'
                    aria-label='See menu'
                    borderRadius={"50%"}
                    icon={<SlOptions />}
                />
            </div>
            <h3 className='post-content-header mb-3'>Is it suspicious to be engaged to a U.S citizen before going to the US on an f1 visa?</h3>
            <p className='post-details-content'>The twist here is that Im a U.S citizen but I have lived abroad for the past (around) 20 years.. my whole family returned from the US to home country when I was 8, I am 26 now so my whole education has been in my home country. My bf and I want to engaged before he goes to the US so we can get married after his masters. My question is, if we do decide to get married in the US after his masters and apply for his Adjustment of status there from F1 to green card, will his intent while entering the country on an f1 be questioned since he was already emgaged to a US citizen? Even considering the fact that I havent been to the US in almost 20 years so when we got engaged we expected that he would be coming back to the home country and we didnt intend to settle in the U.S at that point? What if we change our mind after he goes there?</p>
            <Box className='col-md-6 mb-5 col-12 col-lg-4' display='flex' justifyContent='start'>
                <div className='d-flex me-2 align-items-center votes-control px-2' style={{backgroundColor: upvoted ? "#D93A00" : downvoted ? "#6A5CFF" : ""}}>
                    <button className='me-2 upvotes-footer-button' onClick={() => makePostUpvoted()}>
                        {upvoted ? <FilledUpvote /> : downvoted ? <Upvotes whiteOutline={true} /> : <Upvotes />}
                    </button>
                    <div className='me-2'>
                        <span className='votes-count' style={{color: upvoted || downvoted ? "#ffffff" : ""}}>10</span>
                    </div>
                    <button className='downvotes-footer-button' onClick={() => makePostDownvoted()}>
                        {downvoted ? <FilledDownvote /> : upvoted ? <Downvotes whiteOutline={true} /> : <Downvotes />}
                    </button>
                </div>
                <Button flex='1' className='post-footer-button me-2 px-1' variant='ghost' leftIcon={<FaRegCommentAlt />}>
                <span className='share-post-text'>12</span>
                </Button>
                <Button flex='1' className='post-footer-button me-2 px-3' variant='ghost'  leftIcon={<LuShare />}>
                <span className='share-post-text'>Share</span>
                </Button>
            </Box>
            <CommentInputForm />
            <SortingComments />
            {comments.map((comment, index) => (
                <PostComments key={comment._id} username={comment.authorName} commentUpvotes={comment.upvotes-comment.downvotes} comment={comment.content} />
            ))}
            <PostComments username="Glutton_Sea" commentUpvotes={3} comment="How will they (USCIS) know exactly that you are engaged ? It will not be reported anywhere .And he most definitely should never mention this or you in an F1 visa interview. It will be absolutely denied . He needs to show strong ties to home country and no immigrant intent to get an F1. After he’s in the US, he can marry you etc and adjust status ." />
        </div>
    )
}

export default PostContentDetails