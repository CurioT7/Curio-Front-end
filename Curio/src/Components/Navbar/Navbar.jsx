import React, { useState, useEffect,useRef } from 'react';
import "./Navbar.css"; 
import logo from "../../assets/Curio_logo.png";
import openchat from "../../assets/Chat_navbar.png";
import plus from "../../assets/Plus_navbar.png";
import inbox from "../../assets/Inbox_navbar.png";
import profile from "../../assets/avatar_default_6.png";
import Settings from '../../styles/icons/Settings';
import { Link } from 'react-router-dom';
import SignupHandler from './SignupHandler';
import LoggedOutHandler from './LoggedOutHandler';
import { useNavigate } from 'react-router-dom';
import Notifications_Dropdown from "../Notifications_Dropdown/Notifications_Dropdown";
import { BsArrowUpRightCircle } from "react-icons/bs";
import { Menu, MenuButton, MenuList, Tooltip } from '@chakra-ui/react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from '@chakra-ui/react'
import { CiSearch } from "react-icons/ci";
import { getTrending,getSearchPeople,getSearchSubreddits } from './SearchingEndPoints';
import { getUnreadNotifications, getAllNotifications } from '../Notifications_Dropdown/NotificationsEndpoints';

import Trending from './Trending';
import SearchBy from './SearchBy';



function NavbarComponent(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [trending, setTrending] = React.useState([]);
  const [searchCommunities, setSearchCommunities] = React.useState([]);
  const [searchPeople, setSearchPeople] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [unreadNotifications, setUnreadNotifications] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const navigate = useNavigate();
  const checkAuthentication = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  async function handleUnreadNotifications(){
    const unreadNotifications = await getUnreadNotifications();
    if(unreadNotifications){
      setUnreadNotifications(unreadNotifications.data.unreadCount);
    }
  }

  async function handleAllNotifications() {
    const response = await getAllNotifications();
    if(response) {
        setNotifications(response.data.notifications);
    }
}

  function handleOpenNotifications(){
    setUnreadNotifications(null);
    setIsNotificationsOpen(true);
    handleAllNotifications();
  }

  useEffect(() => {
    handleUnreadNotifications();
  }, []);




  const handleSearchChange = async (e) => {
    setSearchValue(e.target.value);
    const searchCommunitiesData = await getSearchSubreddits(searchValue);
    const searchPeopleData = await getSearchPeople(searchValue);
    if(searchCommunitiesData){
      setSearchCommunities(searchCommunitiesData.subreddits);
    }
    else{
      setSearchCommunities([]);
    }
    if(searchPeopleData){
      setSearchPeople(searchPeopleData.users);
    }
    else{
      setSearchPeople([]);
    }
  }
  const navigateToLogin = () => {
    navigate('/login');
  }

  const inputRef = useRef();
  const popoverRef = useRef();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search/${searchValue}`);
    setSearchValue('');
  }
  
  useEffect(() => {
    if (inputRef.current && popoverRef.current) {
      popoverRef.current.style.width = `${inputRef.current.offsetWidth}px`;
    }
  }, []);



  useEffect(() => {
    const token = localStorage.getItem("token");
    window.addEventListener("loginOrSignup", checkAuthentication);
    setIsAuthenticated(!!token);
    return () => {
      window.removeEventListener("loginOrSignup", checkAuthentication);
    };
  }, []);

  const username = localStorage.getItem('username');
  
  function toggleMenu(){
    let subMenu = document.getElementById("subMenu");
    subMenu.classList.toggle("open-menu");
    event.stopPropagation();
  }
  
  let subMenu = document.getElementById('subMenu');
  
  document.addEventListener('click', function(event) {
    if(subMenu){
    if (!subMenu.contains(event.target)) {
      subMenu.classList.remove("open-menu");
    }
  }
  });
    
  
  React.useEffect(() => {
      async function fetchData() {
          const trendingData = await getTrending();
          
          setTrending(trendingData.posts);
         

      }
      fetchData();
  }, []);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current !== event.target && 
        !popoverRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

 useEffect(() => {
  if (isOpen) {
    setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  }
}, [isOpen]);

if (!props.NavbarVisibility) {
  return null;
}

  return (
    <nav className='navbar-component'
    style={{
      visibility: props.NavbarVisibility ? 'visible' : 'hidden',
    }}>
      <input type="checkbox" name="" id="chk1"/>
      <div className="logo">
        <Link to={'/'} style={{ display: "flex" }}>
          <img src={logo} alt="logo" className="curio-logo"/>
          <h1 className='title-platform'>Curio</h1>
        </Link>
      </div>
      <div className="search-box">
        <form action="" onSubmit={handleSearch}>
            <Popover isOpen={isOpen} onClose={() => {}} closeOnBlur={false}>
              <PopoverTrigger>
                <input onChange={handleSearchChange} value={searchValue} onFocus={() => setIsOpen(true)}   ref={inputRef} type="text" name="search" id="srch" placeholder="Search Curio"/>
              </PopoverTrigger>
              <PopoverContent borderRadius='20px' ref={popoverRef}>
                <PopoverBody margin={0} padding={0} className="search-list">

                  { !searchValue&&
                  <div>
                   <div className='trending-header'><BsArrowUpRightCircle/> <span>TRENDING TODAY</span></div>
                  { trending.map((trend) => (
                    <Trending
                      key={trend._id}
                      title={trend.authorName}
                      description={trend.title}
                      subreddit={trend.subreddit}
                    />
                    ))
                  }
                  </div>}
                  { searchValue && <div>

                    {searchCommunities && <div>
                    <div className='searchBy-header'> Communities</div>
                    <SearchBy type="comm" avatar="" name="Search by title" description="Search for posts by title"/>
                    { searchCommunities.map((comm) => (
                      <SearchBy
                        key={comm._id}
                        type="comm"
                        avatar={comm.icon}
                        name={comm.name}
                        description={comm.members}
                      />
                      ))
                    }
                    </div>
                    }
                    {searchPeople && <div>
                    <div className='searchBy-header'>People</div>
                    <SearchBy type="user" avatar="" name="Search by title" description="Search for posts by title"/>
                    { searchPeople.map((user) => (
                      <SearchBy
                        key={user._id}
                        type="user"
                        avatar={user.profilePicture}
                        name={user.username}
                        description={user.karma}
                      />
                      ))
                    }
                     
                    
                    </div>
                    }
                    <div className='search-footer'> <CiSearch className='search-icon'/> <span> Search by  "{searchValue}"</span>
                    </div>
                  </div>}
                  
                </PopoverBody>
              </PopoverContent>
            </Popover>
          <button type="submit"><i className="search-icon fa fa-search" aria-hidden="true"></i></button>
        </form>
      </div>
      <ul className='right-section-navbar'>
        {isAuthenticated && 
        <>
          <Tooltip label="Open chat">
            <Link to={'/room/create'} className='sub-right-navbar'>
              <li className='right-item-option' style={{ display: "flex" }}>
                    <img className='navImg' src={openchat} alt="logo"/>
              </li>
            </Link>
          </Tooltip>
          <Tooltip label="Create post">
            <Link to={'/user/CreatePost'} className='sub-right-navbar'>
              <li className='create-icon' style={{ display: "flex" }}>
                <img className='navImg' src={plus} alt="profile" style={{ marginRight: "5px" }} />
                Create
              </li>
            </Link>
          </Tooltip>
          <Tooltip label="Open inbox">
            <a className='sub-right-navbar' style={{position: 'relative'}} onClick={handleOpenNotifications}>
              <li className='right-item-option' style={{ display: "flex" }}>
                  <Menu>
                    <MenuButton>
                      <img className='navImg notificimg' src={inbox} alt="logo"/>
                      <span className='unread-notifs'>{unreadNotifications}</span>

                    </MenuButton>
                    <MenuList 
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      boxShadow: 'none', 
                    }}>
                      <Notifications_Dropdown notifications={notifications}/>
                    </MenuList>
                  </Menu>
              </li>
            </a>
          </Tooltip>
          <li className='sub-right-navbar' onClick={(e) => {toggleMenu()}}>
            <Tooltip label="Open profile menu">
              <a href="#" className='right-item-option' style={{ display: "flex" , flexDirection: "column"}} onClick={(e) => e.preventDefault()}>
                <img className='profileImg' src={profile} alt="logo"/>
              </a>
            </Tooltip>
          </li>
          </>
        }
        {!isAuthenticated &&
          <div className='d-flex ms-auto'>
            <Tooltip label="Log in to Reddit">
              <div onClick={navigateToLogin} className='d-flex align-items-center me-2 mt-0'>
                <button className='logged-out-login-button p-2 px-3'>Log in</button>
              </div>
            </Tooltip>
            <Tooltip>
              <div>
                <LoggedOutHandler />
              </div>
            </Tooltip>
          </div>
        }
      </ul>
      <div className="sub-menu-wrap" id='subMenu'>
        <div className="sub-menu">
          <Link to={`profile/${username}`} className="d-flex align-items-center pt-3 viewProfile" onClick={toggleMenu}>
            <img className='profileImg' src={profile} alt="logo"/>
            <div className="d-flex flex-column">
              <span className="drop-down-profile-description">View Profile</span>
                <div className='d-flex flex-start align-items-center ArrowandNumber'>
                <span className='usernameText'>u/{username}</span>
                </div>
            </div>
          </Link>
          <div className="d-flex align-items-center sub-menu-link" onClick={toggleMenu}>
            <SignupHandler />
          </div>
          <hr />
          <Link to={'settings/account'} className="d-flex align-items-center sub-menu-link" onClick={toggleMenu}> 
            <Settings />
            <span className="drop-down-description">Settings</span>
          </Link>
        </div>
      </div>
      <div className="menu">
        <label htmlFor="chk1">
          <i className="fa fa-bars" aria-hidden="true"></i>
        </label>
      </div>
    </nav>
  );
}

export default NavbarComponent;
