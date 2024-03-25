import React from 'react'
import "./Home.css"
import RecentPosts from '../../Components/RecentPosts/RecentPosts'

function Home() {


  return (
    <>
    <div className='d-flex'>
      {/* Insert posts here (above recent posts) */}
      <div className='d-flex justify-content-end ms-auto mb-4 fixed-container' style={{marginRight: "3rem", paddingTop: "1.2rem", height: "100vh", overflowY: "auto", width: "20%"}}>
          <RecentPosts />
      </div>
    </div>
    </>
  )
}

export default Home
