import React from 'react'
import { useState, useEffect } from 'react'
import "./Home.css"
import RecentPosts from '../../Components/RecentPosts/RecentPosts'
import Post from '../../Components/Post/Post'
import BackToTheTopButton from "./BackToTopButton.jsx";
import axios from 'axios';
function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const hostUrl = import.meta.env.VITE_SERVER_HOST;
    const subreddit = "Books fuga";
    const fetchData = async () => {
      try {
        const response = await axios.get(`${hostUrl}/api/best`);
        if (response.status === 200) {
          setPosts(response.data.SortedPosts || response.data);
        }
        else{
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);
  return (
    <>
    
      {/* Insert posts here (above recent posts) */}
      <div className='col-md-6 d-flex p-3 posts-container flex-column'>
          {posts && posts.map((post, index) => {
            return (
              <Post
                key={index}
                _id={post._id}
                user={post.authorName}
                title={post.title}
                image={post.image}
                content={post.content}
                upvotes={post.upvotes}
                downvotes={post.downvotes}
                comments={post.comments}
              />
            )
          })}
         <Post
            _id={1}
            user="r/germany"
            title="First Post"
            content="Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla facilisi. Vivamus id enim odio. Aliquam volutpat urna ac est pulvinar rhoncus."
            upvotes={10}
            downvotes={1}
            comments={[4, 5]} // Dummy array for comments
          />
          <hr className='col-md-12 mb-3' style={{backgroundColor: "#0000003F"}}></hr>
          <Post
            _id={2}
            user="r/netherlands"
            title="Second Post"
            image="https://preview.redd.it/happy-easter-v0-o8d3et699nrc1.jpeg?width=640&crop=smart&auto=webp&s=7a63acc0ef0afb3699c036718113ef23e13b96f7"
            upvotes={10}
            downvotes={1}
            comments={[4, 5]} // Dummy array for comments
          />
          <Post
            _id={3}
            user="r/PS5"
            title="Third Post"
            image="https://preview.redd.it/rate-my-cars-1-10-v0-8j3ibwziwlrc1.jpg?width=640&crop=smart&auto=webp&s=5a58a6861581152a2cd2eb9f8ea2671b56c5e640"
            upvotes={10}
            downvotes={1}
            comments={[4, 5]} // Dummy array for comments
          />
          <BackToTheTopButton/>
        
      </div>
      <div className='d-flex justify-content-end ms-auto mb-4 fixed-container' style={{marginRight: "3rem", paddingTop: "1.2rem", height: "100vh", overflowY: "auto", width: "20%"}}>
          <RecentPosts />
      </div>
    
    </>
  )
}

export default Home
