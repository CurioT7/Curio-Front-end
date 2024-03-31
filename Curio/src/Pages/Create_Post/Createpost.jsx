import React from 'react';
import { useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import { Box, Button, Text } from '@chakra-ui/react';
import NewPostForm from "../../Components/Posts/NewPostForm"
import "./Createpost.css"

function Createpost(props) {
  const navigate = useNavigate();
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
    <div className='container-create-post container'>
        <div className='left-container-post'>
          <Box className="cont-create-post">
            <Text className='create-post-title'>Create Post</Text>
          </Box>
          <div className='new-post-form'>
            <NewPostForm/>
          </div>
        </div>
        <div className='right-container-post'>
          wfrefvvbgbgrfbwg
        </div>
    </div>
  );
}

export default Createpost;
