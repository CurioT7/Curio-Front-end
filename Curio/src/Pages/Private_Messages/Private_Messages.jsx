import React, { useEffect, useState } from 'react';
import "./Private_Messages.css";
import axios from "axios";
import FromMessage from "../../Components/Private_Messages/from_message/from_message.jsx";
import ToMessage from "../../Components/Private_Messages/to_message/to_message.jsx";
import SubjectMessage from "../../Components/Private_Messages/subject_message/subject_message.jsx";
import Message from '../../Components/Private_Messages/message/message.jsx';
import { Button, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import MessagesNavbar from '../../Components/Messages/MessagesNavbar.jsx';

const serverHost = import.meta.env.VITE_SERVER_HOST;

function Private_Messages(props) {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const [userCommunities, setUserCommunities] = useState([]);
  const [subreddit, setSubreddit] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("");
  const toast = useToast();

  function Toast(message, state) {
    toast({
      description: message,
      status: state,
      duration: 3000,
      isClosable: true,
    })
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
    props.hideSidebar();
    fetchUserData();
    return () => {
      props.showSidebar();
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const communityDataResponse = await axios.get(
        `${serverHost}/api/moderatedSubreddits/${username}`
      );
      const communityNames = communityDataResponse.data.moderatedCommunities;
      setUserCommunities(communityNames);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          console.error('User not found');
        } else if (error.response.status === 500) {
          console.error('An unexpected error occurred on the server. Please try again later.');
        }
      } else {
        console.error('Network Error. Please check your internet connection.');
      }
    }
  };

  const handlePrivateMessage = async () => {
    let isSubreddit = false;
    try {
      let finalSubreddit = subreddit;
      if (finalSubreddit === username) {
        finalSubreddit = null;
      }
      let finalRecipient = recipient;
      if (finalRecipient.startsWith("r/")) {
        finalRecipient = finalRecipient.substring(2);
        isSubreddit = true;
      }
      const messageData = {
        subreddit: finalSubreddit,
        subject: subject,
        message: message,
        recipient: finalRecipient,
        sendToSubreddit: isSubreddit
      };
      console.log(messageData)
      const response = await axios.post(
        `${serverHost}/api/message/compose`,
        messageData,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      switch (response.status) {
        case 200:
          Toast('Message sent successfully', 'success');
          break;
        default:
          console.error("Unexpected response status:", response.status);
          break;
      }
    } catch (error) {
      const status = error.response ? error.response.status : null;
      switch (status) {
        case 400:
          if (isSubreddit) {
            Toast('No subreddit found with that name', 'error');
          } else {
            Toast('No user found with that username', 'error');
          } 
          break;
        case 500:
          Toast('Error retrieving search results', 'error');
          break;
        case 401:
          Toast('Unauthorized', 'error');
          break;
        default:
          console.error("Unexpected error:", error);
          break;
      }
    }
  };

  return (
    <div style={{ marginTop: "60px" }}>
      <MessagesNavbar />
      <div className='private_message_content'>
        <div className='private_message_table'>
          <h2 className='private_message_title'>Send A Private Message</h2>
          <div className='private_message_body'>
            <FromMessage userCommunities={userCommunities} setSubreddit={setSubreddit} />
            <ToMessage setRecipient={setRecipient} />
            <SubjectMessage setSubject={setSubject} />
            <Message setMessage={setMessage} />
            <Button className="send_private_message" colorScheme='blue' size='sm' onClick={handlePrivateMessage}>
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Private_Messages;
