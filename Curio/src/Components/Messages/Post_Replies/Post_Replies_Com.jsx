import React, { useState,useEffect } from 'react';
import { Flex, Box } from "@chakra-ui/react";
import Upvotes from '../../../styles/icons/Upvotes.jsx';
import Downvotes from '../../../styles/icons/Downvotes.jsx';
import FilledDownvote from '../../../styles/icons/FilledDownvote.jsx';
import FilledUpvote from '../../../styles/icons/FilledUpvote.jsx';
import { getTimeDifference } from '../../getTimeDifference/getTimeDifference';
import { handleUPVoteComments, handleDownVoteComments, BlockUserMessages } from '../../../Pages/InboxMessages/InboxMessagesEndpoints.js';
import { Link } from 'react-router-dom';

function UserName_Mentions_Com(props) {
    const [upvoted, setUpvoted] = useState(false); 
    const [downvoted, setDownvoted] = useState(false); 

    useEffect(() => {
        const isDownvoted = props.downvotedcomments.some(comment => comment._id === props.itemId);
        const isUpvoted = props.upvotedcomments.some(comment => comment._id === props.itemId);
        
        setDownvoted(isDownvoted);
        setUpvoted(isUpvoted);
    }, [props.downvotedcomments, props.upvotedcomments, props.itemId]);

    return (
        <div className='username-mentions-table'>
            <h5 className='username-mentions-header-messages'>post reply:
                <a href="" className='username-mentions-title-messages'>
                    {props.title}
                </a>
            </h5>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '0.5rem'
            }}>
                <div style={{
                    marginRight: '7px',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <button className='me-2 upvotes-footer-button' onClick={() => handleUPVoteComments(props.itemId, upvoted, setUpvoted, setDownvoted)}>
                        {upvoted ? <FilledUpvote colorFill="#D93A00"/> : <Upvotes />}
                    </button>
                    <button className='downvotes-footer-button' onClick={() => handleDownVoteComments(props.itemId, downvoted, setUpvoted, setDownvoted)}>
                        {downvoted ? <FilledDownvote colorFill="#6A5CFF"/> : <Downvotes />}
                    </button>
                </div>
                <div className='username-mention-details'>
                    <p className='username-mention-from-message'>
                        <span>
                            from <Link to={`/user/${props.sender}`} style={{
                                color: '#0079d3',
                                marginRight: '0.5rem'
                            }}>/u/{props.sender}</Link>
                            {props.linkedSubreddit && ( 
                                <>
                                    via <Link to={`/r/${props.linkedSubreddit}`} style={{
                                        color: '#0079d3',
                                        marginRight: '0.5rem',
                                    }}>/r/{props.linkedSubreddit}</Link>
                                </>
                            )}sent {getTimeDifference(props.timestamp)} ago
                        </span>
                    </p>
                    <div className='dwc' style={{
                        fontSize: '12px'
                    }}>
                        <a href="">{props.message}</a>
                    </div>
                    <Box as="ul" listStyleType="none" display="flex" gap='0.5rem' justifyContent='flex-start' paddingLeft='0'>
                        <Box className="list-item-username-mentions" as="li" paddingLeft='0'>Context</Box>
                        <Box className="list-item-username-mentions" as="li">Full Comments({props.noComments})</Box>
                        <Box className="list-item-username-mentions" as="li">Report</Box>
                        <Box className="list-item-username-mentions" as="li" onClick={() => BlockUserMessages(props.sender)}>Block User</Box>
                        <Box className="list-item-username-mentions" as="li">Mark Unread</Box>
                    </Box>
                </div>
            </div>
        </div>
    );
}

export default UserName_Mentions_Com;