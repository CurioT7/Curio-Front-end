import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home.jsx";
import CreatePost from "./Pages/Create_Post/Createpost.jsx";
import ProfSetting from "./Pages/ProfileSetting/ProfileSetting.jsx";
import SecurityPrivacy from "./Pages/SafetyPrivacySetting/SafetyPrivacy.jsx";
import NotificationSetting from "./Pages/NotificationSetting/NotificationSetting.jsx";
import ErrorPage from "./Components/Error/Error.jsx";
import AccSettings from "./Pages/accountSettings/AccountSettings.jsx";
import FeedingSettings from "./Pages/feedSettings/FeedingSettings.jsx";
import EmailSettings from "./Pages/emailSettings/EmailSettings.jsx";
import ChatAndMessagingSettings from "./Pages/ChatAndMassegingSettings/ChatAndMassegingSettings.jsx";
import SidebarComponent from "./Components/Sidebar/SidebarComponent.jsx";
import NavbarComponent from "./Components/Navbar/Navbar.jsx";
import ForgotUser from "./Components/ForgotUser/ForgotUser.jsx";
import LoginPage from "./Components/Login/Loginpage.jsx";
import UserPage from "./Pages/UserProfile/UserProfile.jsx";
import TestData from "./Components/TestingAPI/test_1.jsx";
import ResetPass from './Components/ForgotPass/ResetPass.jsx';
import CommuntiyPage from './Components/CommunitiesListing/CommunityPage.jsx';
import Top from './Pages/TopCommunityPage/TopCommunity.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import TopCommunities from './Components/TopCommunities/TopCommunities.jsx';
import ProfilePage from './Components/ProfilePage/ProfilePage.jsx';
import PostDetails from './Pages/PostDetails/PostDetails.jsx';
import ChangePassword from './Components/ForgotPass/ChangePassword.jsx';
import FollowersPage from "./Components/FollowersPage/FollowersPage.jsx";
import ShowPoll from "./Components/Poll/ShowPoll.jsx";
import Notifications from "./Pages/Notifications/Notifications.jsx";
import NewChat from "./Pages/Open_Chat_Page/Open_Chat_Page.jsx";
import SearchPage from "./Pages/Search/SearchPage.jsx";
import Private_Messages from "./Pages/Private_Messages/Private_Messages.jsx";
import MessagesInbox from "./Pages/InboxMessages/MessagesInbox.jsx";
import Sent_Messages from "./Pages/Sent_Messages/Sent_Messages.jsx";
import Moderation from "./Pages/Moderation/Moderation.jsx";
import UserName_Mentions from "./Pages/InboxMessages/UserName_Mentions/UserName_Mentions.jsx";
import Post_Replies from "./Pages/InboxMessages/Post_Replies/Post_Replies.jsx";
import AllInbox from "./Pages/InboxMessages/AllInbox.jsx";
import UnreadInbox from "./Pages/InboxMessages/UnreadInbox.jsx";
import ScheduledPosts from "./Components/ModerationComponents/ScheduledPosts/ScheduledPosts.jsx";
import UserManage from "./Components/ModerationComponents/UserManagement/UserManage.jsx";
import ContentControl from "./Components/ModerationComponents/ContentControl/ContentControl.jsx";
import ModSettings from "./Components/ModerationComponents/ModSettings/ModSettings.jsx";
import Rules from "./Components/ModerationComponents/Rules/Rules.jsx";
import UnreadMessages from "./Pages/InboxMessages/UnreadMessages.jsx";

function App() {
  const location = useLocation();
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [subreddit, setSubreddit] = useState(null);

  const handleHideSidebar = () => {
    setIsSidebarVisible(false);
  };

  const handleShowSidebar = () => {
    setIsSidebarVisible(true);
  };

  const handleHideNavbar = () => {
    setIsNavbarVisible(false);
  };

  const handleShowNavbar = () => {
    setIsNavbarVisible(true);
  };

    React.useEffect(() => {
    if (location.pathname !== '/user/CreatePost') {
      setSubreddit(null);
    }
  }, [location.pathname]);


  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
 
  return (
    <div>
      <div className="d-flex">
        <div style={{ position: "fixed", zIndex: "99" }}>
          <SidebarComponent sidebarVisibility={isSidebarVisible} />
        </div>
      </div>
      <ChakraProvider>
        <NavbarComponent NavbarVisibility={isNavbarVisible}/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/settings/profile" element={<ProfSetting hideSidebar={handleHideSidebar} showSidebar={handleShowSidebar}/>} /> 
          <Route path="/login" element={<LoginPage hideSidebar={handleHideSidebar} showSidebar={handleShowSidebar}/>} />
          <Route path="/resetpass/:token" element={<ResetPass hideSidebar={handleHideSidebar} showSidebar={handleShowSidebar}/>} />
          <Route path="/change_password" element={<ChangePassword hideSidebar={handleHideSidebar} showSidebar={handleShowSidebar}/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/" element={<Home/>} />
          <Route path="/Hot" element={<Home/>} />
          <Route path="/New" element={<Home/>} />
          <Route path="/Top" element={<Home/>} />
          <Route path="/Random" element={<Home/>} />
          <Route path="/Best" element={<Home/>} />
          <Route path="/settings/privacy" element={<SecurityPrivacy hideSidebar={handleHideSidebar} showSidebar={handleShowSidebar}/>} /> 
          <Route path='/settings/notifications' element={<NotificationSetting hideSidebar={handleHideSidebar} showSidebar={handleShowSidebar}/>} />
          <Route path='/settings/account' element={<AccSettings hideSidebar={handleHideSidebar} showSidebar={handleShowSidebar}/>} />
          <Route path='/settings/feeding' element={<FeedingSettings hideSidebar={handleHideSidebar} showSidebar={handleShowSidebar}/>}/>
          <Route path='/settings/email' element={<EmailSettings hideSidebar={handleHideSidebar} showSidebar={handleShowSidebar}/>}/>
          <Route path='/settings/chatandmasseging' element={<ChatAndMessagingSettings hideSidebar={handleHideSidebar} showSidebar={handleShowSidebar}/>}/>
          <Route path='/user/CreatePost' element={<CreatePost subreddit={subreddit} setSubreddit={setSubreddit} hideSidebar={handleHideSidebar} showSidebar={handleShowSidebar}/>} />
          <Route path='/r/:Community' element={<CommuntiyPage setSubreddit={setSubreddit}/>} />
          <Route path='/r/:Community/Hot' element={<CommuntiyPage setSubreddit={setSubreddit}/>} />
          <Route path='/r/:Community/New' element={<CommuntiyPage setSubreddit={setSubreddit}/>} />
          <Route path='/r/:Community/Top' element={<CommuntiyPage setSubreddit={setSubreddit}/>} />
          <Route path='/r/:Community/Random' element={<CommuntiyPage/>}/>
          <Route path='/profile/:username' element={<ProfilePage setSubreddit={setSubreddit}/>}/>
          <Route path='/post/post-details/:postID' element={<PostDetails/>}/>
          <Route path='/communities/best/:pagesIndex' element={<TopCommunities hideSidebar={handleHideSidebar} showSidebar={handleShowSidebar}/>} />
          <Route path='/user/:username' element={<UserPage hideSidebar={handleHideSidebar} showSidebar={handleShowSidebar}/>} />
          <Route path="/notifications" element={<Notifications/>}/>
          <Route path='/polls' element={<ShowPoll/>} />
          <Route path='/user/:username/followers' element={<FollowersPage hideSidebar={handleHideSidebar} showSidebar={handleShowSidebar}/>}/>
          <Route path='/room/create' element={<NewChat newPage='New Chat'hideSidebar={handleHideSidebar} showSidebar={handleShowSidebar} hideNavbar={handleHideNavbar} showNavbar={handleShowNavbar} />}/>
          <Route path='/threads' element={<NewChat newPage='Threads' hideSidebar={handleHideSidebar} showSidebar={handleShowSidebar} hideNavbar={handleHideNavbar} showNavbar={handleShowNavbar} />}/>
          <Route path='/chat/:username' element={<NewChat newPage='Chat' hideSidebar={handleHideSidebar} showSidebar={handleShowSidebar} hideNavbar={handleHideNavbar} showNavbar={handleShowNavbar} />}/>
          <Route path='/search/:searchTerm' element={<SearchPage />}></Route>
          <Route path='/message/compose' element={<Private_Messages hideSidebar={handleHideSidebar} showSidebar={handleShowSidebar}/>}/>
          <Route path='/message/inbox' element={<MessagesInbox hideSidebar={handleHideSidebar} showSidebar={handleShowSidebar} />}/>
          <Route path='/message/sent' element={<Sent_Messages hideSidebar={handleHideSidebar} showSidebar={handleShowSidebar}/>}/>
          <Route path='/r/:Community/about/modqueue' element={<Moderation hideSidebar={handleHideSidebar} showSidebar={handleShowSidebar}/>}/>
          <Route path='/r/:Community/about/scheduledposts' element={<ScheduledPosts hideSidebar={handleHideSidebar} showSidebar={handleShowSidebar}/>}/>
          <Route path='/r/:Community/about/usermanagement' element={<UserManage hideSidebar={handleHideSidebar} showSidebar={handleShowSidebar}/>}/>
          <Route path='/r/:Community/about/rules/contentcontrols' element={<ContentControl hideSidebar={handleHideSidebar} showSidebar={handleShowSidebar}/>}/>
          <Route path='/r/:Community/about/settings' element={<ModSettings hideSidebar={handleHideSidebar} showSidebar={handleShowSidebar}/>}/>
          <Route path='/r/:Community/about/rules' element={<Rules hideSidebar={handleHideSidebar} showSidebar={handleShowSidebar}/>}/>
          <Route path='/modqueue' element={<Moderation hideSidebar={handleHideSidebar} showSidebar={handleShowSidebar}/>}/>
          <Route path='/message/mentions' element={<UserName_Mentions hideSidebar={handleHideSidebar} showSidebar={handleShowSidebar}/>}/>
          <Route path='/message/selfreply' element={<Post_Replies hideSidebar={handleHideSidebar} showSidebar={handleShowSidebar}/>}/>
          <Route path="/message/messages" element={<MessagesInbox hideSidebar={handleHideSidebar} showSidebar={handleShowSidebar}/>}/>
          <Route path="/messages/all" element={<AllInbox hideSidebar={handleHideSidebar} showSidebar={handleShowSidebar}/>}/>
          <Route path="/messages/unread" element={<UnreadInbox hideSidebar={handleHideSidebar} showSidebar={handleShowSidebar}/>}/>
          <Route path="/message/unread" element={<UnreadMessages hideSidebar={handleHideSidebar} showSidebar={handleShowSidebar}/>}/>
        </Routes>
      </ChakraProvider>
    </div>
  );
}

export default App;