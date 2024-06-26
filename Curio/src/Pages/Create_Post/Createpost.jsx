import React, { useState, useEffect  } from "react";
import {useNavigate} from 'react-router-dom';
import { Box, Button, Text } from '@chakra-ui/react';
import NewPostForm from "../../Components/Create_Post/NewPostForm";
import "./Createpost.css";
import Community from '../../Components/Create_Post/Community/Community';
import PostingCards from "../../Components/Create_Post/Right_Section/PostingCards";

function Createpost(props) {
  const navigate = useNavigate();
  const [selectedCommunity, setSelectedCommunity] = useState(null); 

    const handleCommunitySelect = (community) => {
        setSelectedCommunity(community);
    };

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
    <div className='container-create-post' style={{marginTop:'3rem'}}>
      <div className="container container-create-post-2" style={{display:'flex'}}>
        <div className='left-container-post'>
            <Box className="cont-create-post">
              <Text className='create-post-title'>Create Post</Text>
            </Box>
            <Community onSelect={handleCommunitySelect} subreddit={props.subreddit}/>
            <div className='new-post-form'>
              <NewPostForm community={selectedCommunity ? selectedCommunity.replace(/^r\//, '').replace(/^u\//, '') : null} />
            </div>
          </div>
          <div className='right-container-post'>
            <PostingCards community={selectedCommunity}/>
          </div>
      </div>
    </div>
  );
}

export default Createpost;
