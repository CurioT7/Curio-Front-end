import {React, useEffect, useState} from "react";
import MessagesNavbar from "../../Components/Messages/MessagesNavbar.jsx";
import InboxTabs from "../../Components/Messages/InboxTabs.jsx";
import Messages from "../../Components/Messages/Messages.jsx";
import {fetchMessages} from "./InboxMessagesEndpoints";


function MessagesInbox(props) {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchMessages("messages");
                const filteredMessages = response.filter((message) => message.type === "message" && message.isRead === true);
                setMessages(filteredMessages);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchData();
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
        <div style={{marginTop: "60px", backgroundColor: "#EDEFF1", height: "100vh"}}>
            <MessagesNavbar />
            <InboxTabs />
            {messages.length === 0 && (
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
        </div>
    );
}

export default MessagesInbox;