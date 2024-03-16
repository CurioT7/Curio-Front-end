import React, { useState } from "react";
import { Box, Heading } from "@chakra-ui/react";

function Activity(){
    const [mentionChecked, setMentionChecked] = useState(true);
    const [commentsChecked, setCommentsChecked] = useState(true);
    const [upvotesPostsChecked, setUpvotesPostsChecked] = useState(true);
    const [upvotesCommentsChecked, setUpvotesCommentsChecked] = useState(true);
    const [repliesChecked, setRepliesChecked] = useState(true);
    const [newFollowersChecked, setNewFollowersChecked] = useState(true);

    const handleMentionChange = () => {
        setMentionChecked(!!isChecked)
    };

    const handleCommentsChange = () => {
        setCommentsChecked(!commentsChecked);
    };
    
    const handleUpvotesPostsChange = () => {
        setUpvotesPostsChecked(!upvotesPostsChecked);
    };
    
    const handleUpvotesCommentsChange = () => {
        setUpvotesCommentsChecked(!upvotesCommentsChecked);
    };
    
    const handleRepliesChange = () => {
        setRepliesChecked(!repliesChecked);
    };
    
    const handleNewFollowersChange = () => {
        setNewFollowersChecked(!newFollowersChecked);
    };

    return(
        <>
            <Box className="mention_username d-flex flex-wrap mb-3">
                <Box className="mention_username">
                    <label htmlFor="mention_username-checkbox">
                        <Heading as="h3" className="headings-settings d-flex fw-500 mb-1">
                            Mentions of u/username
                        </Heading>
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
                        <Heading as="h3" className="headings-settings d-flex fw-500 mb-1">
                            Comments on your posts
                        </Heading>
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
                        <Heading as="h3" className="headings-settings d-flex fw-500 mb-1">
                            Upvotes on your posts
                        </Heading>
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
                        <Heading as="h3" className="headings-settings d-flex fw-500 mb-1">
                            Upvotes on your comments
                        </Heading>
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
                        <Heading as="h3" className="headings-settings d-flex fw-500 mb-1">
                            Replies to your comments
                        </Heading>
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
                        <Heading as="h3" className="headings-settings d-flex fw-500 mb-1">
                            New followers
                        </Heading>
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
        </>
    );
}

export default Activity;
