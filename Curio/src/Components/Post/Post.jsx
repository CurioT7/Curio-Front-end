import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Flex,Avatar,Box,Heading,IconButton,Text,Image,Button } from '@chakra-ui/react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi"
import { BiUpvote } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import { LuShare } from "react-icons/lu";
import { SlOptions } from "react-icons/sl";
import Upvotes from '../../styles/icons/Upvotes.jsx';
import Downvotes from '../../styles/icons/Downvotes.jsx';
import FilledDownvote from '../../styles/icons/FilledDownvote.jsx';
import FilledUpvote from '../../styles/icons/FilledUpvote.jsx';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Post.css'
import PostControl from './PostControl.jsx';
import axios from 'axios';

function Post(props) {
    const [subreddit, setSubreddit] = useState([]);
    useEffect(() => {
        const hostUrl = import.meta.env.VITE_SERVER_HOST;
        async function getPostSubreddit() {
            try {
                const response = await axios.get(`${hostUrl}/api/subreddit/${props.subredditId}`);
                if (response.status === 200) {
                    setSubreddit(response.data);
                }
            }
            catch (err) {
                console.log(err);
            }
        }
    }, [])
    const navigate = useNavigate();
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);
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
        <div>
            <Card className='Post' variant='ghost' >
                <CardHeader className='py-0'>
                    <Flex spacing='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar size='sm' name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />

                        <Box>
                        <a className='community-post-name'>{props.user}</a>
                        
                        </Box>
                    </Flex>
                    <PostControl postDetails={false} savedPosts={props.savedPosts} savedComments={props.savedComments} username={props.user} _id={props._id} />
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
                    justifyContent='flex-start'
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
                        <Button flex='1' className='post-footer-button me-2 px-3' variant='ghost'  leftIcon={<LuShare />}>
                        <span data-testid="share" className='share-post-text'>Share</span>
                        </Button>
                        
                    </Box>
                    
                </CardFooter>
            </Card>
        </div>
    )
}
export default Post;