import React from 'react';
import "./Sent_Messages_Table.css";
import { getTimeDifference } from '../getTimeDifference/getTimeDifference';
import { Link } from 'react-router-dom';

function Sent_Messages(props) {
    const username = localStorage.getItem('username');
    const { isRecipientNull } = props;

    return (
        <div className='sent_message_table_content'>
            <h5 className='subject_sent_messages'>{props.subject}:</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <span className='sent_message_details'>to
                    <a href="" style={{
                        color: "#80bce9"
                    }}>
                        {isRecipientNull === true ?
                            "/u/" : "/r/"
                        }{props.recipient}
                    </a>
                    {props.sender !== username &&
                        <>
                            <span> via </span>
                            <Link to={`/r/${props.sender}`} style={{ color: '#228822' }}>
                                /r/{props.sender}
                            </Link>
                            <span style={{marginLeft:'5px'}}>[
                                <Link to={`/r/${props.sender}`} style={{color:'#228822'}}>M</Link>
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
