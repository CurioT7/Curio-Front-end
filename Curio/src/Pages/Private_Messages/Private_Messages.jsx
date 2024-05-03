import React, { useEffect, useState } from 'react';
import "./Private_Messages.css";
import axios from "axios";
import FromMessage from "../../Components/Private_Messages/from_message/from_message.jsx";
import ToMessage from "../../Components/Private_Messages/to_message/to_message.jsx";
import SubjectMessage from "../../Components/Private_Messages/subject_message/subject_message.jsx";
import Message from '../../Components/Private_Messages/message/message.jsx';
import { Button } from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';

const serverHost = import.meta.env.VITE_SERVER_HOST;

function Private_Messages(props) {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const [userCommunities, setUserCommunities] = useState([]);

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
        `${serverHost}/api/user/${username}/about`
      );
      const communityNames = communityDataResponse.data.moderatedSubreddits.map(community => community.name);
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
  


  return (
    <div className='private_message_content'>
      <div className='private_message_table'>
        <h2 className='private_message_title'>Send A Private Message</h2>
        <div className='private_message_body'>
          <FromMessage userCommunities={userCommunities}/>
          <ToMessage />
          <SubjectMessage />
          <Message />
          <Button className="send_private_message" colorScheme='blue' size='sm'>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Private_Messages;