import React from 'react'
import { useState, useEffect } from 'react'
import "./Home.css"
import RecentPosts from '../../Components/RecentPosts/RecentPosts'
import Post from '../../Components/Post/Post'
import BackToTheTopButton from "./BackToTopButton.jsx";
import Listing from '../../Components/CommunitiesListing/Listing.jsx'
import { fetchPostsFromBackend,fetchHotFromBackend,fetchNewFromBackend,fetchTopFromBackend,fetchRandomFromBackend } from './HomeEndPoints.js'
function Home() {

  const[posts, setPosts] = React.useState([])
  const[randomPost, setRandomPost] = React.useState({
    post:{

    },
    isSelected: false
  })
React.useEffect(() => {
  async function fetchAndSetData() {
      const data = await fetchPostsFromBackend();
      if (data) {
          setPosts(data);
          setRandomPost({ ...randomPost, isSelected: false });
      }
  }

  fetchAndSetData();
}, []);

console.log(posts);


async function changeSortType(value,time) {
  
  console.log(`value :${value}`);
  async function SetData() {
      if (value === 'Hot') {
          const data = await fetchHotFromBackend();
          if (data) {
              setPosts(data);
              setRandomPost({ ...randomPost, isSelected: false });
          }
      }
      else if (value === 'New') {
          const data = await fetchNewFromBackend();
          if (data) {
              setPosts(data);
              setRandomPost({ ...randomPost, isSelected: false });
          }
      }
      else if (value === 'Top') {
          const data = await fetchTopFromBackend();
          if (data) {
              setPosts(data);
              setRandomPost({ ...randomPost, isSelected: false });
          }
      }
      else if (value === 'Random') {
          // const data = await fetchRandomFromBackend();
          // if (data) {
          //     setRandomPost({ post: data, isSelected: true });
          //     console.log(`this is random post: ${randomPost.post}`);
          // }
      }
  }
  SetData();
}
  return (
    <>
    
      {/* Insert posts here (above recent posts) */}
      <div className='col-md-6 d-flex p-3 posts-container flex-column'>
        <div className='my-1'>
        <Listing onChangeSort={changeSortType} isHome={true} isCommunity={false} isProfile={false}/>
        <hr className='col-md-12 mb-3' style={{backgroundColor: "#0000003F"}}></hr>
        </div>
        {randomPost.isSelected==false ? (posts.map((post) => (
          <><Post
            
            id={post._id}
            title={post.title}
            body={post.body}
            user={post.authorName}
            upvotes={post.upvotes}
            downvotes={post.downvotes}
            comments={post.comments}
            content={post.content}
          />
          <hr className='col-md-12 mb-3' style={{backgroundColor: "#0000003F"}}></hr>
          </>
        ))):(
        <><Post
            
          id={randomPost.post._id}
          title={randomPost.post.title}
          body={randomPost.post.body}
          user={randomPost.post.authorName}
          upvotes={randomPost.post.upvotes}
          downvotes={randomPost.post.downvotes}
          comments={randomPost.post.comments}
          content={randomPost.post.content}
        />
        <hr className='col-md-12 mb-3' style={{backgroundColor: "#0000003F"}}></hr>
        </>)}
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
        
      </div>
      <div className='d-flex justify-content-end ms-auto mb-4 fixed-container' style={{marginRight: "3rem", paddingTop: "1.2rem", height: "100vh", overflowY: "auto", width: "20%"}}>
          <RecentPosts />
          <BackToTheTopButton/>

      </div>
    
    </>
  )
}

export default Home
