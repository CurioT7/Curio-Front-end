import React from 'react'
import "./Home.css"
import RecentPosts from '../../Components/RecentPosts/RecentPosts'
import Listing from '../../Components/CommunitiesListing/Listing'
import Post from '../../Components/Post/Post'
import CommunityInfo from '../../Components/CommunitiesListing/CommunityInfo'
function Home() {


  return (
    <>
    <div className='d-flex justify-content-center'>
      {/* Insert posts here (above recent posts) */}
      <div className="home-body">
        <div className=" home-list mb-3">
          <Listing />
          
        </div>
        <h3 className="headings-titles text-uppercase fw-bold mb-1"></h3>

        <div className="home-post">
        <CommunityInfo />
        </div>
      </div>
      <h3 className="headings-titles text-uppercase fw-bold mb-1"></h3>
      <div className='d-flex justify-content-end ms-auto mb-4 fixed-container' style={{marginRight: "3rem", paddingTop: "1.2rem", height: "100vh", overflowY: "auto", width: "20%"}}>
          <RecentPosts />
      </div>
    </div>
    </>
  )
}

export default Home
