import React from "react";
import './ProfilePage.css';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Divider } from '@chakra-ui/react'


function ProfilePage(){

return(

<>
<div className="profileContainer">
<div className="mainComponent">
<div className="userInfo">
<img src="./src/assets/Curio_logo.png" alt="profile picture" className="profileAvatar" />
<h3 className="profileName">User</h3>
<h5 className="userName"> u/sad_p0tat0o </h5>
</div>

<div className="tableList">
<Tabs variant='soft-rounded' colorScheme='yellow'>
  <TabList>
    <Tab>Overview</Tab>
    <Tab>Posts</Tab>
    <Tab>Comments</Tab>
    <Tab>Saved</Tab>
    <Tab>Hidden</Tab>
    <Tab>Upvoted</Tab>
    <Tab>Downvoted</Tab>
  </TabList>
  <hr />
  <TabPanels className="profilePannels">
    <TabPanel>
      <p>u/sad_p0tat0o hasn't posted yet</p>
    </TabPanel>
    <TabPanel>
      <p>u/sad_p0tat0o hasn't posted yet</p>
    </TabPanel>
    <TabPanel>
      <p>u/sad_p0tat0o hasn't commented yet</p>
    </TabPanel>
    <TabPanel>
      <p>Looks like you haven't saved anything yet</p>
    </TabPanel>
    <TabPanel>
      <p>Looks like you haven't hidden anything yet</p>
    </TabPanel>
    <TabPanel>
      <p>Looks like you haven't upvoted anything yet</p>
    </TabPanel>
    <TabPanel>
      <p>Looks like you haven't downvoted anything yet</p>
    </TabPanel>
  </TabPanels>
</Tabs>
</div>

</div>

<div className="rightSideBar">
 <div className="gradient">
  <button>
  <svg rpl="" aria-hidden="true" fill="currentColor" height="16" icon-name="add-media-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.376 3.032h-2.355L13.8 1.446A1.155 1.155 0 0 0 12.892 1h-5.74a1.17 1.17 0 0 0-.923.454L5.014 3.031H2.625A2.629 2.629 0 0 0 0 5.656v9.719A2.63 2.63 0 0 0 2.625 18h14.75A2.63 2.63 0 0 0 20 15.375V5.657a2.627 2.627 0 0 0-2.624-2.625Zm1.374 12.343a1.377 1.377 0 0 1-1.375 1.375H2.625a1.377 1.377 0 0 1-1.375-1.375V5.656a1.377 1.377 0 0 1 1.375-1.375h3L7.152 2.25l5.657-.041 1.6 2.072h2.971a1.375 1.375 0 0 1 1.37 1.376v9.718Zm-8.125-6H14v1.25h-3.375V14h-1.25v-3.375H6v-1.25h3.375V6h1.25v3.375Z"></path>
    </svg>
  </button>
 </div>
 <br />
 <button className="shareButton">
  <svg rpl="" fill="currentColor" height="16" icon-name="share-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.942 7.058 12.8.912l-.883.883 5.079 5.08h-2.871A13.189 13.189 0 0 0 1.067 18h1.267a11.94 11.94 0 0 1 11.791-9.875h2.866l-5.079 5.08.883.883 6.147-6.146a.624.624 0 0 0 0-.884Z"></path>
    </svg>
     Share 
 </button>
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', rowGap: '0.3rem', columnGap: '1rem' }}>
  <div className="profilevalue">1</div>
  <div className="profilevalue">0</div>
  <div className="profileItem">Post Karma</div>
  <div className="profileItem">Comment Karma</div>
</div>
<br />
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridTemplateRows: 'repeat(2, 0.5fr)', rowGap: '0.3rem', columnGap: '1rem' }}>

  <div className="profilevalue">Mar 3, 2024</div>
  <div className="profilevalue">0</div>
  <div className="profileItem">Cake day</div>
  <div className="profileItem">Gold Received</div>
</div>
 <Divider orientation='horizontal' />
</div>
</div>    
</>
)

}

export default ProfilePage;