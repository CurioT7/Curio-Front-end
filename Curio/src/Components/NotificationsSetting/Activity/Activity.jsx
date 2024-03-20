import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import "./Activity.css"
import update from "../update-pref";
import axios from 'axios';
import { useToast, } from '@chakra-ui/react';

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
            const response = await axios.patch(`${serverHost}/api/settings/v1/me/prefs`, data);
            console.log(response)
            // Handle response if needed
            return response;
        } catch (error) {
            console.error('Error sending data to backend:', error);
            // Handle error if needed
        }
    }

    async function fetchDataFromBackend() {
        try {
            const response = await axios.get(`${serverHost}/api/settings/v1/me/prefs`);
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
            <Box className="mention_username d-flex flex-wrap mb-3" data-testid="activity">
                <Box className="mention_username">
                    <label htmlFor="mention_username-checkbox">
                        <h3 as="h3" className="headings-settings d-flex fw-500 mb-1">
                            Mentions of u/username
                        </h3>
                    </label>
                </Box>
                <Box className="mention_username-checkbox">
                    <div className="form-check form-switch">
                        <input className="form-check-input" 
                        type="checkbox" 
                        id="flexSwitchCheckDefault"
                        checked={mentionChecked}
                        onChange={handleMentionChange}
                        />
                    </div>
                </Box>
            </Box>
            <Box className="comments-posts d-flex flex-wrap mb-3">
                <Box className="comments-posts">
                    <label htmlFor="comments-posts-checkbox">
                        <h3 className="headings-settings d-flex fw-500 mb-1">
                            Comments on your posts
                        </h3>
                    </label>
                </Box>
                <Box className="comments-posts-checkbox">
                    <div className="form-check form-switch">
                        <input className="form-check-input" 
                        type="checkbox" 
                        id="flexSwitchCheckDefault"
                        checked={commentsChecked}
                        onClick={handleCommentsChange}
                        />
                    </div>
                </Box>
            </Box>
            <Box className="upvotes-posts d-flex flex-wrap mb-3">
                <Box className="upvotes-posts">
                    <label htmlFor="upvotes-posts-checkbox">
                        <h3 className="headings-settings d-flex fw-500 mb-1">
                            Upvotes on your posts
                        </h3>
                    </label>
                </Box>
                <Box className="upvotes-posts-checkbox">
                    <div className="form-check form-switch">
                        <input className="form-check-input" 
                        type="checkbox" 
                        id="flexSwitchCheckDefault"
                        checked={upvotesPostsChecked}
                        onClick={handleUpvotesPostsChange}
                        />
                    </div>
                </Box>
            </Box>
            <Box className="upvotes-comments d-flex flex-wrap mb-3">
                <Box className="upvotes-comments">
                    <label htmlFor="upvotes-comments-checkbox">
                        <h3 className="headings-settings d-flex fw-500 mb-1">
                            Upvotes on your comments
                        </h3>
                    </label>
                </Box>
                <Box className="upvotes-comments-checkbox">
                    <div className="form-check form-switch">
                        <input className="form-check-input" 
                        type="checkbox" 
                        id="flexSwitchCheckDefault"
                        checked={upvotesCommentsChecked}
                        onClick={handleUpvotesCommentsChange}
                        />
                    </div>
                </Box>
            </Box>
            <Box className="replies-comments d-flex flex-wrap mb-3">
                <Box className="replies-comments">
                    <label htmlFor="replies-comments-checkbox">
                        <h3 className="headings-settings d-flex fw-500 mb-1">
                            Replies to your comments
                        </h3>
                    </label>
                </Box>
                <Box className="replies-comments-checkbox">
                    <div className="form-check form-switch">
                        <input className="form-check-input" 
                        type="checkbox" 
                        id="flexSwitchCheckDefault"
                        checked={repliesChecked}
                        onClick={handleRepliesChange}
                        />
                    </div>
                </Box>
            </Box>
            <Box className="new-followers d-flex flex-wrap mb-3">
                <Box className="new-followers">
                    <label htmlFor="new-followers-checkbox">
                        <h3 className="headings-settings d-flex fw-500 mb-1">
                            New followers
                        </h3>
                    </label>
                </Box>
                <Box className="new-followers-checkbox">
                    <div className="form-check form-switch">
                        <input className="form-check-input" 
                        type="checkbox" 
                        id="flexSwitchCheckDefault"
                        checked={newFollowersChecked}
                        onClick={handleNewFollowersChange}
                        />
                    </div>
                </Box>
            </Box>
            <Box className="post-follows d-flex flex-wrap mb-3">
                <Box className="post-follows">
                    <label htmlFor="post-follows-checkbox">
                        <h3 className="headings-settings d-flex fw-500 mb-1">
                            Posts you follow
                        </h3>
                    </label>
                </Box>
                <Box className="post-follows-checkbox">
                    <div className="form-check form-switch">
                        <input className="form-check-input" 
                        type="checkbox" 
                        id="flexSwitchCheckDefault"
                        checked={postsFollowChecked}
                        onClick={handlePostsFollowChange}
                        />
                    </div>
                </Box>
            </Box>
        </>
    );
}

export default Activity;
