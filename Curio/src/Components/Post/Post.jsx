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
import { useState } from 'react';
import './Post.css'
function Post(props) {
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


    return (
        <div>
            <Card className='Post' variant='ghost' >
                <CardHeader>
                    <Flex spacing='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar size='sm' name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />

                        <Box>
                        <a className='community-post-name'>{props.user}</a>
                        
                        </Box>
                    </Flex>
                    <IconButton
                        variant='ghost'
                        colorScheme='gray'
                        aria-label='See menu'
                        icon={<SlOptions />}
                    />
                    </Flex>
                </CardHeader>
                <CardBody className='py-0'>
                    <Heading as='h3' size='md'>{props.title}</Heading>
                    <Text className='text-body'>
                    {props.content}
                    </Text>
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
                            <button className='me-2 upvotes-footer-button' onClick={() => makePostUpvoted()}>
                                {upvoted ? <FilledUpvote /> : downvoted ? <Upvotes whiteOutline={true} /> : <Upvotes />}
                            </button>
                            <div className='me-2'>
                                <span className='votes-count' style={{color: upvoted || downvoted ? "#ffffff" : ""}}>{props.upvotes - props.downvotes}</span>
                            </div>
                            <button className='downvotes-footer-button' onClick={() => makePostDownvoted()}>
                                {downvoted ? <FilledDownvote /> : upvoted ? <Downvotes whiteOutline={true} /> : <Downvotes />}
                            </button>
                        </div>
                        <Button flex='1' className='post-footer-button me-2 px-1' variant='ghost' leftIcon={<FaRegCommentAlt />}>
                        <span className='share-post-text'>{props.comments.length}</span>
                        </Button>
                        <Button flex='1' className='post-footer-button me-2 px-3' variant='ghost'  leftIcon={<LuShare />}>
                        <span className='share-post-text'>Share</span>
                        </Button>
                        
                    </Box>
                    
                </CardFooter>
            </Card>
        </div>
    )
}
export default Post;