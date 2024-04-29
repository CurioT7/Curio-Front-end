import React, { useEffect, useState } from 'react';
import OpenChatCom from "../../Components/OpenChat/OpenChatComLeft_Side/OpenChatComLeft_Side";
import NewChat_Com from "../../Components/OpenChat/OpenChatComRight_Side/NewChat/NewChat";
import "./Right_Side_Chat.css";
import Threads from '../../Components/OpenChat/OpenChatComRight_Side/Threads/Threads';
import { useNavigate } from 'react-router-dom';

function Right_Side_Chat(props) {
    const [newPage, setNewPage] = useState('New Chat');

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


    const handleNewPage = (PageName) => {
        setNewPage(PageName);
    };

    return (
        <div className='open-chat-container'>
            <div className='side-bar-chat-page'>
                <OpenChatCom handleNewPage={handleNewPage} />
            </div>
            <div className='right-side-main-chat'>
                {newPage === "New Chat" ? (
                    <NewChat_Com />
                ) : newPage === "Threads" ? (
                    <Threads />
                ) : null}
            </div>
        </div>
    );
}

export default Right_Side_Chat;
