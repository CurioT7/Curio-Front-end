import React, { useState } from 'react';
import "./Sent_Messages_Table.css";
import { getTimeDifference } from '../getTimeDifference/getTimeDifference';
import { Link } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from "react-bootstrap/Popover";

function Sent_Messages(props) {
    const [showPopover, setShowPopover] = useState(false);
    const username = localStorage.getItem('username');
    const { isRecipientNull } = props;

    const renderTooltip = () => (
        <Popover
            onMouseEnter={() => setShowPopover(true)}
            onMouseLeave={() => setShowPopover(false)}
            className="custom-tooltip">
            <div className='popover_details'>
                <h3 className='popover_details_header'>{props.displayName}</h3>
                <a href="">u/{username}</a>
            </div>
        </Popover>
    );

    return (
        <div className='sent_message_table_content'>
            <h5 className='subject_sent_messages'>{props.subject}:</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <span className='sent_message_details'>to
                    <OverlayTrigger
                        trigger={["hover", "focus"]}
                        placement="bottom"
                        show={showPopover}
                        overlay={renderTooltip}
                    >
                        <span href="" style={{
                            color: "#80bce9",
                            cursor: 'pointer',
                            position: 'relative'
                        }}
                            onMouseEnter={() => setShowPopover(true)}
                            onMouseLeave={() => setShowPopover(false)}
                        >
                            {isRecipientNull === true ?
                                "/u/" : "/r/"
                            }{props.recipient}
                        </span>
                    </OverlayTrigger>
                    {props.sender !== username &&
                        <>
                            <span> via </span>
                            <Link to={`/r/${props.sender}`} style={{ color: '#228822' }}>
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
