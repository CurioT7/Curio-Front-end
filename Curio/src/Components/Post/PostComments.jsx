import React from "react";
import { useState } from "react";
import { Avatar, IconButton, Box, Button } from '@chakra-ui/react';
import { LuShare } from "react-icons/lu";
import { SlOptions } from "react-icons/sl";
import Upvotes from "../../styles/icons/Upvotes";
import Downvotes from "../../styles/icons/Downvotes";
import FilledUpvote from "../../styles/icons/FilledUpvote";
import FilledDownvote from "../../styles/icons/FilledDownvote";
import Ellipsis from "../../styles/icons/Elippsis";
import SaveButton from "../../styles/icons/SaveButton";
import ReportPost from "../../styles/icons/ReportPost";
import Hide from "../../styles/icons/Hide";

function PostComments(props) {
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);

    const [showControls, setShowControls] = useState(false);
    const handleEllipsisClick = () => {
        setShowControls(!showControls);
    };

    const makeCommentUpvoted = () => {
        if (upvoted) {
            setUpvoted(false);
        } else {
            setUpvoted(true);
            setDownvoted(false);
        }
    }
    const makeCommentDownvoted = () => {
        if (downvoted) {
            setDownvoted(false);
        } else {
            setDownvoted(true);
            setUpvoted(false);
        }
    }

    return (
        <div className="d-flex flex-column">
            <div className="d-flex mb-3">
                <Avatar size='sm' className='me-2' name='Segun Adebayo' src='https://preview.redd.it/snoovatar/avatars/nftv2_bmZ0X2VpcDE1NToxMzdfZWI5NTlhNzE1ZGZmZmU2ZjgyZjQ2MDU1MzM5ODJjNDg1OWNiMTRmZV8yNjYyMzA1MA_rare_fece1052-efb7-4ff4-be96-0aabece1e0fa-headshot.png?width=64&height=64&crop=smart&auto=webp&s=523c745b5c559087b4577764c49f60ad3af2c0c6' />
                <div className="d-flex align-items-center">
                    <p className="username-comments-section m-0">{props.username}</p>
                </div>
            </div>
            <div className="d-flex">
                <p className="post-details-content">{props.comment}</p>
            </div>
            <div className="d-flex align-items-center col-md-3 col-8">
                <div className="votes-hover-effect d-flex justify-content-center align-items-center p-3">
                    <button onClick={makeCommentUpvoted} className=" upvotes-footer-button d-flex justify-content-center align-items-center">{!upvoted && <Upvotes />} {upvoted && <FilledUpvote colorFill="#D93A00"/>}</button>
                </div>
                <span className="comment-upvotes">{props.commentUpvotes}</span>
                <div className="votes-hover-effect d-flex justify-content-center align-items-center p-3">
                    <button onClick={makeCommentDownvoted} className=" downvotes-footer-button d-flex justify-content-center align-items-center">{!downvoted && <Downvotes />}{downvoted && <FilledDownvote colorFill="#6A5CFF"/>}</button>
                </div>
                <Button flex='1' style={{backgroundColor: "#ffffff"}} className='post-footer-button me-2 px-3' variant='ghost'  leftIcon={<LuShare />}>
                    <span className='share-post-text'>Share</span>
                </Button>
                <button className="post-dropdown-control d-flex justify-content-center align-items-center" onClick={handleEllipsisClick}>
                    <Ellipsis className="ellipsis-img" />
                </button>
                {showControls && <div className="post-dropdown" style={{ 
                                                    display: showControls ? 'flex' : 'none',
                                                    flexDirection: 'column',
                                                    alignItems: 'flex-start',
                                                    position: 'absolute',
                                                    backgroundColor: '#FFFFFF',
                                                    borderRadius: '10px',
                                                    boxShadow: '2px 6px 10px rgba(0, 0, 0, 0.4)',
                                                    marginTop: '9.5rem',
                                                    marginLeft: '9rem',
                                                    zIndex: '1'
                                                }}>
                                                    <ul className='drop-down-list w-100 px-0'>
                                                        <li className="drop-down-item ps-3 dropdown-list-post-control d-flex align-items-center">
                                                                <SaveButton />
                                                                <div className="d-flex align-items-center justify-content-center"><p className='mt-3 text-text d-flex'>Save</p></div>
                                                        </li>
                                                        <li className="drop-down-item ps-3 dropdown-list-post-control d-flex align-items-center">
                                                                <ReportPost />
                                                                <div><p className='mt-3 text-text'>Report</p></div>
                                                        </li>
                                                    </ul>   
                                                </div>
                        }
            </div>
        </div>
    );
}

export default PostComments;