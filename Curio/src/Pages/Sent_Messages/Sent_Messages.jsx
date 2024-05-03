import React, { useEffect, useState } from 'react';
import "./Sent_Messages.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Sent_Messages_Table from '../../Components/Sent_Messages_Table/Sent_Messages_Table';

const serverHost = import.meta.env.VITE_SERVER_HOST;

function Sent_Messages(props) {
    const navigate = useNavigate();
    const [sentMessages, setSentMessages] = useState([]);


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
        props.hideSidebar();
        fetchUserData();
        return () => {
            props.showSidebar();
        }
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${serverHost}/api/message/sent`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setSentMessages(response.data.messages);
        } catch (error) {
            if (error.response) {
                if (error.response.status === 500) {
                    console.error('Error retrieving search results');
                }
            } else {
                console.error('Network Error. Please check your internet connection.');
            }
        }
    };

    return (
        <div className='sent_message_content'>
            <div 
            style={{ 
                marginTop: '70px', 
                marginBottom:'70px',
                width: '70%',
                }}>
                {sentMessages.map((message, index) => (
                    <div key={message._id}>
                        <div className='sent_message_table' 
                            style={{
                                background: index % 2 === 0 ? "#f6f7f8" : "white"
                            }}>
                            <Sent_Messages_Table
                                subject={message.subject}
                                message={message.message}
                                timestamp={message.timestamp}
                                sender={message.sender !== null ? message.sender.username: message.senderSubreddit.name}
                                recipient={message.recipient !==null ? message.recipient.username: message.recipientSubreddit.name}
                                isRecipientNull={!message.recipient}
                                 />
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Sent_Messages;
