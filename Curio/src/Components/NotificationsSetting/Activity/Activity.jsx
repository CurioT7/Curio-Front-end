import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import "./Activity.css"
import update from "../update-pref";
import axios from 'axios';
import { useToast, Flex, Switch, Spacer } from '@chakra-ui/react';
import Titles from "../../feedSettings/childs/Titles";

function Activity(){
    const serverHost = import.meta.env.VITE_SERVER_HOST;
    const toast = useToast()
    const [mentionChecked, setMentionChecked] = useState(true);
    const [commentsChecked, setCommentsChecked] = useState(true);
    const [upvotesPostsChecked, setUpvotesPostsChecked] = useState(true);
    const [upvotesCommentsChecked, setUpvotesCommentsChecked] = useState(true);
    const [repliesChecked, setRepliesChecked] = useState(true);
    const [newFollowersChecked, setNewFollowersChecked] = useState(true);
    const [postsFollowChecked, setPostsFollowChecked] = useState(true);
    function Toast(){
        toast({
            
            description: "Changes Saved",
            status: 'info',
            duration: 3000,
            isClosable: true,
          })
    }
    const handleMentionChange = () => {
        setMentionChecked(!mentionChecked);
       sendDataToBackend({mentionChecked: !mentionChecked});
         Toast()
    };

    const handleCommentsChange = () => {
        setCommentsChecked(!commentsChecked);
       sendDataToBackend({commentsChecked: !commentsChecked});
        Toast()
    };
    
    const handleUpvotesPostsChange = () => {
        setUpvotesPostsChecked(!upvotesPostsChecked);
         sendDataToBackend({upvotesPostsChecked: !upvotesPostsChecked});
        Toast()
    };
    
    const handleUpvotesCommentsChange = () => {
        setUpvotesCommentsChecked(!upvotesCommentsChecked);
        sendDataToBackend({upvotesCommentsChecked: !upvotesCommentsChecked});
        Toast()
    };
    
    const handleRepliesChange = () => {
        setRepliesChecked(!repliesChecked);
        sendDataToBackend({repliesChecked: !repliesChecked});
        Toast()
        
    };
    
    const handleNewFollowersChange = () => {
        setNewFollowersChecked(!newFollowersChecked);
        sendDataToBackend({newFollowersChecked: !newFollowersChecked});
        Toast()
        
    };

    const handlePostsFollowChange = () => {
        setPostsFollowChecked(!postsFollowChecked);
        sendDataToBackend({postsFollowChecked: !postsFollowChecked});
        Toast()
        
    };

    async function sendDataToBackend(data) {
        // Validate data
        if (!data || typeof data !== 'object') {
            console.error('Invalid data:', data);
            return;
        }

        try {
            const token = 'your_token_here'; 
            const response = await axios.patch(`${serverHost}/api/settings/v1/me/prefs`, data, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(response)
            return response;
        } catch (error) {
            console.error('Error sending data to backend:', error);
        }
    }

    async function fetchDataFromBackend() {
        try {
            const token = 'your_token_here'; 
            const response = await axios.get(`${serverHost}/api/settings/v1/me/prefs`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching data from backend:', error);
        }
    }
    React.useEffect(() => {
        async function fetchAndSetData() {
            const data = await fetchDataFromBackend();
            if (data) {
                
                setMentionChecked(data.mentionChecked);
                setCommentsChecked(data.commentsChecked);
                setUpvotesPostsChecked(data.upvotesPostsChecked);
                setUpvotesCommentsChecked(data.upvotesCommentsChecked);
                setRepliesChecked(data.repliesChecked);
                setNewFollowersChecked(data.newFollowersChecked);
                setPostsFollowChecked(data.postsFollowChecked);
            }
        }

        fetchAndSetData();
    }, []);

    return(
        <>
            <Flex mb={5} alignItems='center'>
                <Titles title='Mentions of u/username'/>
                <Spacer/>
                <Switch size='lg' isChecked={mentionChecked} onChange={handleMentionChange}/>
            </Flex>
            <Flex mb={5} alignItems='center'>
                <Titles title='Comments on your posts'/>
                <Spacer/>
                <Switch size='lg' isChecked={commentsChecked} onChange={handleCommentsChange}/>
            </Flex>
            <Flex mb={5} alignItems='center'>
                <Titles title='Upvotes on your posts'/>
                <Spacer/>
                <Switch size='lg' isChecked={upvotesPostsChecked} onChange={handleUpvotesPostsChange}/>
            </Flex>
            <Flex mb={5} alignItems='center'>
                <Titles title='Upvotes on your comments'/>
                <Spacer/>
                <Switch size='lg' isChecked={upvotesCommentsChecked} onChange={handleUpvotesCommentsChange}/>
            </Flex>
            <Flex mb={5} alignItems='center'>
                <Titles title='Replies to your comments'/>
                <Spacer/>
                <Switch size='lg' isChecked={repliesChecked} onChange={handleRepliesChange}/>
            </Flex>
            <Flex mb={5} alignItems='center'>
                <Titles title='New followers'/>
                <Spacer/>
                <Switch size='lg' isChecked={newFollowersChecked} onChange={handleNewFollowersChange}/>
            </Flex>
            <Flex mb={5} alignItems='center'>
                <Titles title='Posts you follow'/>
                <Spacer/>
                <Switch size='lg' isChecked={postsFollowChecked} onChange={handlePostsFollowChange}/>
            </Flex>
        </>
    );
}

export default Activity;
