import React, { useEffect, useState } from "react";
import "./Messages.css";
import { fetchMessages } from "../../Pages/InboxMessages/InboxMessagesEndpoints";

function Messages(props) {



    return (
        <div>
            {props.messages.map((message, index) => (
                <div key={index} className="d-flex flex-column col-md-8 p-3" style={{ backgroundColor: "#F6F7F8" }}>
                    <h5 className="message-title mb-3">hello:</h5>
                    <div className="message-from ms-5">
                        <div>
                            <p className="secondary-message-text">from <a className="sender-style" href={`/user/${message.sender.username}`}>u/{message.sender.username}</a></p>
                        </div>
                        <div>
                            <p>{message.message}</p>
                        </div>
                        <div></div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Messages;
