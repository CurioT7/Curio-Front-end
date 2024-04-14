import React from 'react';
import PostContentDetails from '../../Components/Post/PostContentDetails';
import { useLocation } from 'react-router-dom';

function PostDetails(props) {
  const location = useLocation();
  const post = location.state.post;
  return (
    <div className='posts-content-container mt-4 col-md-6 col-7'>
      <PostContentDetails {...post} />
    </div>
  );
}

export default PostDetails;