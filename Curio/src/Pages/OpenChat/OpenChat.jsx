import React, { useEffect, useState } from 'react';
import "./OpenChat.css";
import OpenChatCom from "../../Components/OpenChat/OpenChatCom";

function OpenChat(props) {

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
        props.hideSidebar();
        props.hideNavbar();
        return () => {
            props.showSidebar();
            props.showNavbar();
        };
    }, []);

    return (
        <div className='open-chat-container'>
            <div className='side-bar-chat-page'>
                <OpenChatCom />
            </div>
            <div className='right-side-main-chat'>

            </div>
        </div>
    );
}

export default OpenChat;
