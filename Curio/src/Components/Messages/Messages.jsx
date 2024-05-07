import React, { useEffect, useState } from "react";
import "./Messages.css";
import { fetchMessages } from "../../Pages/InboxMessages/InboxMessagesEndpoints";
import axios from "axios";

function Messages(props) {


    const handleDelete = async (id) => {
        try {
            const hostUrl = import.meta.env.VITE_SERVER_HOST;
            const response = await axios.post(`${hostUrl}/api/message/delete/${id}`,{},{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.status === 200) {
                window.dispatchEvent(new Event("privateUnreadMessageDeleted"));
            }
        } catch (error) {
            console.error("Error deleting message:", error);
        }
    }

    const handleUnread = async (id) => {
        try {
            const hostUrl = import.meta.env.VITE_SERVER_HOST;
            const response = await axios.post(`${hostUrl}/api/message/unread/${id}`,{},{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.status === 200) {
                window.dispatchEvent(new Event("privateUnreadMessageDeleted"));
            }
        } catch (error) {
            console.error("Error marking message unread:", error);
        }
    }

    return (
        <div className="w-100 d-flex flex-column justify-content-center align-items-center">
            {props.messages.map((message, index) => (
                <div key={index} className="d-flex flex-column col-md-8 p-3 mb-2" style={{ backgroundColor: "#F6F7F8" }}>
                    <h5 className="message-title mb-3">hello:</h5>
                    <div className="message-from ms-5">
                        <div>
                            <p className="secondary-message-text">from <a className="sender-style" href={`/user/${message.sender.username}`}>u/{message.sender.username}</a></p>
                        </div>
                        <div>
                            <p>{message.message}</p>
                        </div>
                        <div className="d-flex">
                            <p onClick={() => handleDelete(message._id)} className="private-messages-controls me-3">Delete</p>
                            <p onClick={() => handleUnread(message._id)} className="private-messages-controls me-3">Mark unread</p>
                            {/* <p className="private-messages-controls me-3">Report</p>
                            <p className="private-messages-controls me-3">Block</p> */}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Messages;
