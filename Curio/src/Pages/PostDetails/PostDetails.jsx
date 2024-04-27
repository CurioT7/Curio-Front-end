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
    React.useEffect(() => {
        getInfo();
    }, []);
  const post = location.state?.post;
  return (
    <div className='posts-content-container mt-4 col-md-6 col-7'>
      <PostContentDetails {...(post || postInfo)} />
    </div>
  );
}

export default PostDetails;