import React, { useEffect, useState } from 'react';
import OpenChatCom from "../../Components/OpenChat/OpenChatComLeft_Side/OpenChatComLeft_Side";
import NewChat_Com from "../../Components/OpenChat/OpenChatComRight_Side/NewChat/NewChat";
import "./Open_Chat_Page.css";
import Threads from '../../Components/OpenChat/OpenChatComRight_Side/Threads/Threads';
import LiveChat from '../../Components/OpenChat/OpenChatComRight_Side/LiveChat/LiveChat';
import { useNavigate } from 'react-router-dom';

function Right_Side_Chat(props) {
    const [recipient, setRecipient] = useState('');

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

    const handleRecipient = (newrecipient) => {
        setRecipient(newrecipient);
    };

    return (
        <div className='open-chat-container'>
            
            <div className='side-bar-chat-page'>
                <OpenChatCom />
            </div>
            <div className='right-side-main-chat'>
                {props.newPage === "New Chat" ? (
                    <NewChat_Com handleRecipient={handleRecipient}/>
                ) : props.newPage === "Threads" ? (
                    <Threads />
                ) : props.newPage === "Chat" ? (
                    <>
                    <LiveChat recipient={recipient}/>
                    {/* <LiveChatInput /> */}
                    </>
                ) : null}
            </div>
        </div>
    );
}

export default Right_Side_Chat;
