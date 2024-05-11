/**
 * Component for rendering sent messages.
 * 
 * @param {Object} props - Component props.
 * @param {string} props.subject - The subject of the message.
 * @param {string} props.recipient - The recipient of the message.
 * @param {string} props.sender - The sender of the message.
 * @param {string} props.timestamp - The timestamp of the message.
 * @param {string} props.message - The content of the message.
 * @param {string} props.cakeDay - The date the user joined.
 * @param {string} props.displayName - The display name of the user.
 * @param {number} props.postkarma - The post karma of the user.
 * @param {number} props.commentkarma - The comment karma of the user.
 * @param {string} props.about - The about section of the user.
 * @param {boolean} props.isRecipientNull - Boolean indicating if the recipient is null.
 * 
 * @module SentMessagesTable
 */

import React, { useState } from 'react';
import "./Sent_Messages_Table.css";
import { getTimeDifference } from '../getTimeDifference/getTimeDifference';
import { Link } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from "react-bootstrap/Popover";
import { VscActivateBreakpoints } from "react-icons/vsc";
import { formatDistanceToNow } from 'date-fns';

function Sent_Messages(props) {
    const [showPopover, setShowPopover] = useState(false);
    const username = localStorage.getItem('username');
    const { isRecipientNull } = props;
    const formattedDate = formatDistanceToNow(new Date(props.cakeDay), { addSuffix: true });
    const renderTooltip = () => (
        <Popover id='popover-sent-messages' onMouseEnter={() => setShowPopover(true)}
            onMouseLeave={() => setShowPopover(false)}
            style={{ maxWidth: '500px' }} >
            <div className='popover_details'>
                <h3 className='popover_details_header'>{props.displayName}</h3>
                <Link
                    to={`/user/${username}`}
                    className='username-popover-sent'
                    style={{ color: '#80bce9' }}>u/{username}</Link>
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
            }}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                    <VscActivateBreakpoints
                        color="#878a8c"
                        fontSize='large' />
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                        <span>{props.postkarma + props.commentkarma}</span>
                        <span>Karma</span>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                        <span style={{
                            fontSize: '12px',
                            color: '#878a8c'
                        }}>{props.postkarma} Post Karma</span>
                        <span style={{
                            fontSize: '12px',
                            color: '#878a8c'
                        }}>{props.commentkarma} Comment Karma</span>
                    </div>
                </div>
                <div
                    style={{
                        color: '#878a8c',
                        height: '50px',
                        border: '0.1px solid'
                    }} />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <i className="created-date-icon fa-solid fa-cake-candles"
                        style={{ color: '#878a8c' }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: 'bold' }}>{formattedDate}</span>
                        <span style={{ color: '#878a8c' }}>Joined {props.cakeDay}</span>
                    </div>
                </div>
            </div>
            <div style={{ color: '#878a8c' }}>
                {props.about}
            </div>
        </Popover>
    )

    return (
        <div className='sent_message_table_content' data-testid="sent-message-content">
            <h5 className='subject_sent_messages' data-testid="subject">{props.subject}:</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <span className='sent_message_details'>to
                    <OverlayTrigger
                        trigger={['hover', 'focus']}
                        placement="bottom"
                        show={showPopover}
                        overlay={renderTooltip()}
                    >
                        <span onMouseEnter={() => {
                            setShowPopover(true);
                        }} style={{
                            color: "#80bce9",
                            cursor: 'pointer',
                            position: 'relative'
                        }} onMouseLeave={() => setShowPopover(false)}
                            data-testid="recipient">
                            {isRecipientNull === true ?
                                <Link to={`/r/${props.recipient}`}>/r/{props.recipient}</Link> :
                                <Link to={`/user/${props.recipient}`}>/u/{props.recipient}</Link>
                            }
                        </span>
                    </OverlayTrigger>
                    {props.sender !== username &&
                        <>
                            <span> via </span>
                            <Link to={`/r/${props.sender}`} style={{ color: '#228822' }} data-testid="sender">
                                /r/{props.sender}
                            </Link>
                            <span style={{ marginLeft: '5px' }}>[
                                <Link to={`/r/${props.sender}`} style={{ color: '#228822' }}>M</Link>
                            </span>]
                        </>
                    }
                    <span className='sent_message_time'></span>sent {getTimeDifference(props.timestamp)} ago
                </span>
                <span className='message_name_detail'>{props.message}</span>
            </div>
        </div>
    );
}

export default Sent_Messages;
