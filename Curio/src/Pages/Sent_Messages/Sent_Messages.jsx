import React, { useEffect, useState } from 'react';
import "./Sent_Messages.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

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
    <div className='private_message_content'>

    </div>
  );
}

export default Sent_Messages;
