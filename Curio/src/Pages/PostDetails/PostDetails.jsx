import React from 'react';
import PostContentDetails from '../../Components/Post/PostContentDetails';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

function PostDetails(props) {
  const location = useLocation();
  const [postInfo, setPostInfo] = React.useState({});
  const { postID } = useParams();
  const toast = useToast();
  const getInfo = async () => {
        if (localStorage.getItem('token') === null){
          try{
              const hostUrl = import.meta.env.VITE_SERVER_HOST;
              const response = await axios.get(`${hostUrl}/api/info?objectID=${postID}&objectType=post`);
              if (response.status === 200 || response.status === 201){
                  setPostInfo(response.data.item);
              }
          }
          catch(err){
              toast({
                  description: "Server Error Occured.",
                  status: 'error',
                  duration: 5000,
                  isClosable: true,
              })
          }
        }
        else{
          try{
              const hostUrl = import.meta.env.VITE_SERVER_HOST;
              const response = await axios.get(`${hostUrl}/api/info?objectID=${postID}&objectType=post`,{
                  headers: {
                      Authorization: `Bearer ${localStorage.getItem('token')}`
                  }
              });
              if (response.status === 200 || response.status === 201){
                  setPostInfo(response.data.item);
              }
          }
          catch(err){
              toast({
                  description: "Server Error Occured.",
                  status: 'error',
                  duration: 5000,
                  isClosable: true,
              })
          }
        }
    }
    React.useEffect(() => {
        getInfo();
    }, []);
  const post = location.state?.post;
  React.useEffect(() => {
}, []);
  return (
    <div className='posts-content-container col-md-6 col-7'>
      <PostContentDetails {...(postInfo || post)} />
      {/* <PostContentDetails {...postInfo} /> */}

    </div>
  );
}

export default PostDetails;