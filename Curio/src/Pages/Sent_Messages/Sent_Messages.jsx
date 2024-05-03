import React, { useEffect, useState } from 'react';
import "./Sent_Messages.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Sent_Messages_Table from '../../Components/Sent_Messages_Table/Sent_Messages_Table';

const serverHost = import.meta.env.VITE_SERVER_HOST;

function Sent_Messages(props) {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
        props.hideSidebar();
        // fetchUserData();
        return () => {
            props.showSidebar();
        }
    }, []);

    return (
        <div className='sent_message_content'>
            <div className='sent_message_table'>
                <Sent_Messages_Table />
            </div>
        </div>
    );
}

export default Sent_Messages;
