import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MessagesNavbar from '../../../Components/Messages/MessagesNavbar';
import InboxTabs from '../../../Components/Messages/InboxTabs';
import Post_Replies_Com from '../../../Components/Messages/Post_Replies/Post_Replies_Com';
import { fetchMessages, fetchDownvotedMessages, fetchUpvotedMessages } from '../InboxMessagesEndpoints';

function Post_Replies(props) {
    const navigate = useNavigate();
    const [recievedMessages, setRecievedMessages] = useState([]);
    const [error, setError] = useState(false);
    const [downvotedcomments, setDownvotedComments] = useState([]);
    const [upvotedcomments, setupvotedComments] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
        props.hideSidebar();

        
        const fetchData = async () => {
            try {
                const messages = await fetchMessages('postReply');
                setRecievedMessages(messages);
                const downvote = await fetchDownvotedMessages();
                setDownvotedComments(downvote);
                const upvote = await fetchUpvotedMessages();
                setupvotedComments(upvote);
                if (messages.length === 0) {
                    setError(true);
                }
            } catch (error) {
                console.error('Error fetching messages:', error.message);
                setError(true);
            }
        };

        fetchData();

        return () => {
            props.showSidebar();
        };
    }, []);

    const removeMessage = (messageId) => {
        setRecievedMessages(prevMessages => prevMessages.filter(message => message._id !== messageId));
    };

    return (
        <div style={{ marginTop: "60px" }}>
            <MessagesNavbar />
            <InboxTabs />
            <div className='username-mentions-page w-100'>
                {error ? (
                    <div className="error-message">
                        <p style={{
                            padding: '20px',
                        }}>there doesn't seem to be anything here
                        </p>
                    </div>
                ) : (
                    <div
                        style={{
                            marginTop: '20px',
                            marginBottom: '70px',
                            width: '70%',
                        }}>
                        {recievedMessages.map((message, index) => (
                            <div key={message._id}>
                                <div className='username-mentions-message-table w-100'
                                    style={{
                                        background: index % 2 === 0 ? "#f6f7f8" : "white"
                                    }}>
                                    <Post_Replies_Com
                                        title={message.postId ? message.postId.title : null}
                                        noComments={message.commentNumber}
                                        sender={message.sender.username}
                                        timestamp={message.timestamp}
                                        linkedSubreddit={message.linkedSubreddit ? message.linkedSubreddit.name : null}
                                        message={message.message}
                                        itemId={message.commentId}
                                        downvotedcomments={downvotedcomments}
                                        upvotedcomments={upvotedcomments}
                                        onBlockConfirmed={() => removeMessage(message._id)}
                                        id={message._id}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Post_Replies;
