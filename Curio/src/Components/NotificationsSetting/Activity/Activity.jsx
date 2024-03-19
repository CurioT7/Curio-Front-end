import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import "./Activity.css"

function Activity(){
    const [mentionChecked, setMentionChecked] = useState(true);
    const [commentsChecked, setCommentsChecked] = useState(true);
    const [upvotesPostsChecked, setUpvotesPostsChecked] = useState(true);
    const [upvotesCommentsChecked, setUpvotesCommentsChecked] = useState(true);
    const [repliesChecked, setRepliesChecked] = useState(true);
    const [newFollowersChecked, setNewFollowersChecked] = useState(true);
    const [postsFollowChecked, setPostsFollowChecked] = useState(true);

    const handleMentionChange = () => {
        setMentionChecked(!mentionChecked)
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

    const handlePostsFollowChange = () => {
        setPostsFollowChecked(!postsFollowChecked);
    };

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
