import { React, useEffect, useState } from "react";
import MessagesNavbar from "../../Components/Messages/MessagesNavbar.jsx";
import InboxTabs from "../../Components/Messages/InboxTabs.jsx";
import Messages from "../../Components/Messages/Messages.jsx";
import { fetchMessages } from "./InboxMessagesEndpoints";
import UserName_Mentions_Com from "../../Components/Messages/UserName_Mentions/UserName_Mentions_Com.jsx";
import Post_Replies_Com from "../../Components/Messages/Post_Replies/Post_Replies_Com.jsx";
import { fetchDownvotedMessages, fetchUpvotedMessages } from "./InboxMessagesEndpoints";


function AllInbox(props) {

    const [messages, setMessages] = useState([]);
    const [usernameMentions, setUsernameMentions] = useState([]);
    const [postReplies, setPostReplies] = useState([]);
    const [unreadMessages, setUnreadMessages] = useState([]);
    const [downvotedcomments, setDownvotedComments] = useState([]);
    const [upvotedcomments, setupvotedComments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchMessages("all");
                const filteredMessages = response.filter((message) => message.type === "message");
                setMessages(filteredMessages);
                const filteredUsernameMentions = response.filter((message) => message.type === "usernameMentions");
                setUsernameMentions(filteredUsernameMentions);
                const filteredPostReplies = response.filter((message) => message.type === "postReply");
                setPostReplies(filteredPostReplies);
                const downvote = await fetchDownvotedMessages();
                setDownvotedComments(downvote);
                const upvote = await fetchUpvotedMessages();
                setupvotedComments(upvote);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchData();
        window.addEventListener("privateUnreadMessageDeleted", fetchData);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
        props.hideSidebar();
        return () => {
            props.showSidebar();
        }
    }, []);


    return (
        <div style={{ marginTop: "60px", backgroundColor: "#EDEFF1", height: "100vh" }}>
            <MessagesNavbar />
            <InboxTabs />
            {messages.length === 0 && usernameMentions.length === 0 && postReplies.length === 0 && (
                <div className="error-message">
                    <p style={{
                        padding: '20px',
                    }}>there doesn't seem to be anything here
                    </p>
                </div>
            )}
            <div className="d-flex justify-content-center mt-4">
                <Messages messages={messages} />
            </div>
            {usernameMentions && usernameMentions.map((usernameMention, index) => (
                <div className="d-flex justify-content-center mt-4 col-md-8">
                    <UserName_Mentions_Com
                        title={usernameMention.postId ? usernameMention.postId.title : null}
                        noComments={usernameMention.commentNumber}
                        sender={usernameMention.sender.username}
                        timestamp={usernameMention.timestamp}
                        linkedSubreddit={usernameMention.linkedSubreddit ? usernameMention.linkedSubreddit.name : null}
                        message={usernameMention.message}
                        itemId={usernameMention.commentId}
                        downvotedcomments={downvotedcomments}
                        upvotedcomments={upvotedcomments}
                    />
                </div>
            ))}

            {postReplies && postReplies.map((postReply, index) => (
                <div className="d-flex justify-content-center mt-4">
                    <Post_Replies_Com
                        title={postReply.postId ? postReply.postId.title : null}
                        noComments={postReply.commentNumber}
                        sender={postReply.sender.username}
                        timestamp={postReply.timestamp}
                        linkedSubreddit={postReply.linkedSubreddit ? postReply.linkedSubreddit.name : null}
                        message={postReply.message}
                        itemId={postReply.commentId}
                        downvotedcomments={downvotedcomments}
                        upvotedcomments={upvotedcomments}
                    />
                </div>
            ))}

        </div>
    );
}

export default AllInbox;