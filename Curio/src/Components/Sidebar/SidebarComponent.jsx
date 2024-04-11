import React, { useState } from 'react'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import Home from '../../styles/icons/Home.jsx';
import Popular from '../../styles/icons/Popular.jsx';
import All from '../../styles/icons/All.jsx';
import Add from '../../styles/icons/Add.jsx';
import AboutReddit from '../../styles/icons/AboutReddit.jsx';
import Advertise from '../../styles/icons/Advertise.jsx';
import Help from '../../styles/icons/Help.jsx';
import Blog from '../../styles/icons/Blog.jsx';
import Careers from '../../styles/icons/Careers.jsx';
import Press from '../../styles/icons/Press.jsx';
import Communities from '../../styles/icons/Communities.jsx';
import BestOfReddit from '../../styles/icons/BestOfReddit.jsx';
import Topics from '../../styles/icons/Topics.jsx';
import ContentPolicy from '../../styles/icons/ContentPolicy.jsx';
import PrivacyPolicy from '../../styles/icons/PrivacyPolicy.jsx';
import UserAgreement from '../../styles/icons/UserAgreement.jsx';
import DownArrow from '../../styles/icons/DownArrow.jsx';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import  FavouriteButton  from './FavouriteButton.jsx';
import CommunityImageSideBar from './CommunityImageSideBar.jsx';
import CreateCommunity from './CreateCommunity.jsx';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { textDecoration } from '@chakra-ui/react';
import axios from 'axios';



function SidebarComponent(props) {
  const [isCreateCommunityModalOpen, setCreateCommunityModalOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(window.innerWidth < 1200);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const navigate = useNavigate();

  const checkAuthentication = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  const getJoinedCommunities = async () => {
      try{
        const hostUrl = import.meta.env.VITE_SERVER_HOST;
        const response = await axios.get(`${hostUrl}/user/${localStorage.getItem("username")}/communities`);
        setJoinedCommunities(response.data.communities);
      }
      catch(error){
        console.log(error);
        return error;
      }
  }

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 1200);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    checkAuthentication();
    window.addEventListener("loginOrSignup", checkAuthentication);
    return () => {
      window.removeEventListener("loginOrSignup", checkAuthentication);
    };
  }, []);

  useEffect(() => { 
    window.addEventListener("communityCreated", getJoinedCommunities);   
    return () => {
      window.removeEventListener("communityCreated", getJoinedCommunities);
    }
  }, []);

  useEffect(() => {
    checkAuthentication();
    if(isAuthenticated){
      getJoinedCommunities();
    }
  }, [isAuthenticated]);

  const handleNavigation = (path) => {
    navigate(path);
  }


  const handleCreateCommunityClick = () => {
    setCreateCommunityModalOpen(true);
  };

  if (!props.sidebarVisibility) {
    return null;
  }


  return (
    <div>
      <Sidebar backgroundColor='#FFFFFF' collapsed={collapsed} collapsedWidth='60px' rootStyles={{
        paddingTop: '60px',
        color: '#000000',
        marginLeft: '20px',
        borderRadius: '0px',
        border: 'none',
        fontSize: '0.875rem',
        height: '100vh',
        overflowY: 'auto',
        visibility: props.sidebarVisibility ? 'visible' : 'hidden',
        borderRight: '1px solid #0000001a',
        '@media (max-width: 1200px)': {
          width: '30px',
        },
      }}>
      <Menu renderExpandIcon={({ open }) => <span>{open ? <KeyboardArrowUpIcon /> : <DownArrow />}</span>}
      menuItemStyles={{
        button: {
          [`&.active`]: {
            backgroundColor: '#EAEDEF',
          },
          [`&:hover`]: {
            backgroundColor: '#F2F4F5',
          },
          [`&:focus`]: {
            backgroundColor: '#EAEDEF',
          },
          borderRadius: '10px',
          padding: '20px',
        },
      }}>
        {isAuthenticated && <MenuItem component={<Link to="/" />} rootStyles={{paddingTop: '20px'}} icon={<Home />}> Home </MenuItem>}
        <MenuItem rootStyles={{marginTop: !isAuthenticated ? "20px" : ""}} icon={<Popular />}> Popular </MenuItem>
        <MenuItem icon={<All />}> All </MenuItem>
        {isAuthenticated && <MenuItem component={<Link to = "/user/CreatePost" />} icon={<Add />}> Create Post </MenuItem>}
        <hr className='mt-3 w-100'></hr>
        {isAuthenticated &&
          <SubMenu label="YOUR COMMUNITIES" rootStyles={{
              color: '#576F76',
              backgroundColor: '#FFFFFF',
              fontSize: '0.875rem',
            }} menuItemStyles={{
            button: {
              [`&.active`]: {
                backgroundColor: '#EAEDEF',
              },
              [`&:hover`]: {
                backgroundColor: '#F2F4F5',
              },
              borderRadius: '10px',
              paddingLeft: '10px',
            },
          }}>
            <MenuItem onClick={handleCreateCommunityClick} rootStyles={{backgroundColor: '#FFFFFF', color: '#000000', fontSize: '0.875rem'}} icon={<Add />}>Create a community</MenuItem>
            {joinedCommunities.map((community, index) => (
              <MenuItem key={index} onClick={() => handleNavigation(`/r/${community.name}`)} prefix={<CommunityImageSideBar imageUrl={"https://styles.redditmedia.com/t5_2s887/styles/communityIcon_px0xl1vnj0ka1.png"} />} suffix={<FavouriteButton />} rootStyles={{backgroundColor: '#FFFFFF', color: '#000000', fontSize: '0.875rem'}}>r/{community.name}</MenuItem>
            ))}
          </SubMenu>
        }
        {isAuthenticated && <hr className='mt-3 ps-5 w-100'></hr>}
        <SubMenu label="RESOURCES" rootStyles={{
          fontSize: '0.875rem',
          color: '#576F76',
          backgroundColor: '#FFFFFF',
        }} menuItemStyles={{
        button: {
          [`&.active`]: {
            backgroundColor: '#EAEDEF',
          },
          [`&:hover`]: {
            backgroundColor: '#F2F4F5',
          },
          borderRadius: '10px',
        },
      }}>
          <MenuItem href="https://www.redditinc.com/" icon={<AboutReddit />} rootStyles={{backgroundColor: '#FFFFFF', color: '#000000', fontSize: '0.875rem'}}>About Reddit</MenuItem>
          <MenuItem href="https://accounts.reddit.com/adsregister?dest=https%3A%2F%2Fads.reddit.com%2F&referrer=https%3A%2F%2Fads.reddit.com%2F&utm_source=web3x_consumer&utm_name=left_nav_cta" icon={<Advertise />} rootStyles={{backgroundColor: '#FFFFFF', color: '#000000', fontSize: '0.875rem'}}>Advertise</MenuItem>
          <MenuItem href="https://support.reddithelp.com/hc/en-us" icon={<Help />} rootStyles={{backgroundColor: '#FFFFFF', color: '#000000', fontSize: '0.875rem'}}>Help</MenuItem>
          <MenuItem href="https://www.redditinc.com/blog" icon={<Blog />} rootStyles={{backgroundColor: '#FFFFFF', color: '#000000', fontSize: '0.875rem'}}>Blog</MenuItem>
          <MenuItem href="https://www.redditinc.com/careers" icon={<Careers />}rootStyles={{backgroundColor: '#FFFFFF', color: '#000000', fontSize: '0.875rem'}}>Careers</MenuItem>
          <MenuItem href="https://www.redditinc.com/press" icon={<Press />} rootStyles={{backgroundColor: '#FFFFFF', color: '#000000', fontSize: '0.875rem'}}>Press</MenuItem>
          <div style={{height: '20px', backgroundColor: '#FFFFFF', margin: '0', display: 'flex', alignItems: 'center'}}>
            <div style={{width: '100%', height: '1px', backgroundColor: '#0000001a', padding: '0px'}}></div>
          </div>
          <Link to="/communities/best/1" style={{ textDecoration: 'none' }}>
          <MenuItem icon={<Communities />} rootStyles={{backgroundColor: '#FFFFFF', color: '#000000', fontSize: '0.875rem'}}>Communities</MenuItem>
          </Link>
          <MenuItem href="https://www.reddit.com/posts/2023/global/" icon={<BestOfReddit />} rootStyles={{backgroundColor: '#FFFFFF', color: '#000000', fontSize: '0.875rem'}}>Best of Reddit</MenuItem>
          <MenuItem href="https://www.reddit.com/topics/a-1/" icon={<Topics />} rootStyles={{backgroundColor: '#FFFFFF', color: '#000000', fontSize: '0.875rem'}}>Topics</MenuItem>
          <div style={{height: '20px', backgroundColor: '#FFFFFF', margin: '0', display: 'flex', alignItems: 'center'}}>
            <div style={{width: '100%', height: '1px', backgroundColor: '#0000001a', padding: '0px'}}></div>
          </div>
          <MenuItem href="https://www.redditinc.com/policies/content-policy" icon={<ContentPolicy />} rootStyles={{backgroundColor: '#FFFFFF', color: '#000000', fontSize: '0.875rem'}}>Content Policy</MenuItem>
          <MenuItem href="https://www.reddit.com/policies/privacy-policy" icon={<PrivacyPolicy />} rootStyles={{backgroundColor: '#FFFFFF', color: '#000000', fontSize: '0.875rem'}}>Privacy Policy</MenuItem>
          <MenuItem href="https://www.redditinc.com/policies/user-agreement" icon={<UserAgreement />} rootStyles={{backgroundColor: '#FFFFFF', color: '#000000', fontSize: '0.875rem'}}>User Agreement</MenuItem>
        </SubMenu>
      </Menu>
      <div className='mt-4 mb-2'>
        <a className='rights-reserved ms-4'>Reddit, Inc. © 2024. All rights reserved.</a>
      </div>
    </Sidebar>
    {isCreateCommunityModalOpen && <CreateCommunity show={isCreateCommunityModalOpen} onHide={() => setCreateCommunityModalOpen(false)} />}
    </div>

  )
}

export default SidebarComponent
