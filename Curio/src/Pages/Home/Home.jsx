import React from 'react'
import { useState } from 'react'
import "./Home.css"
import RecentPosts from '../../Components/RecentPosts/RecentPosts'
import Post from '../../Components/Post/Post'

function Home() {


  return (
    <>
    <div className='d-flex'>
      {/* Insert posts here (above recent posts) */}
      <div className='col-md-6 d-flex p-3 posts-container'>
         <Post
            user="Alice"
            title="Second Post"
            content="Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla facilisi. Vivamus id enim odio. Aliquam volutpat urna ac est pulvinar rhoncus."
            upvotes={10}
            downvotes={1}
            comments={[4, 5]} // Dummy array for comments
          />
      </div>
      <div className='d-flex justify-content-end ms-auto mb-4 fixed-container' style={{marginRight: "3rem", paddingTop: "1.2rem", height: "100vh", overflowY: "auto", width: "20%"}}>
          <RecentPosts />
      </div>
    </div>
    </>
  )
}

export default Home
