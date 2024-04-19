import React, { useState, useEffect } from 'react';
import "./Navbar.css"; 
import logo from "../../assets/Curio_logo.png";
import openchat from "../../assets/Chat_navbar.png";
import plus from "../../assets/Plus_navbar.png";
import inbox from "../../assets/Inbox_navbar.png";
import profile from "../../assets/avatar_default_6.png";
import Settings from '../../styles/icons/Settings';
import EditAvatar from '../../styles/icons/EditAvatar';
import ContProgram from '../../styles/icons/ContributorProgram';
import ModMode from '../../styles/icons/ModMode';
import DarkMode from '../../styles/icons/DarkMode';
import Advertisement from '../../styles/icons/Ad';
import Premium from '../../styles/icons/Premium';
import ContArrow from '../../styles/icons/ContArrow';
import { Link } from 'react-router-dom';
import SignupHandler from './SignupHandler';
import LoggedOutHandler from './LoggedOutHandler';
import { useNavigate } from 'react-router-dom';
import Notifications_Dropdown from "../Notifications_Dropdown/Notifications_Dropdown";
import { Switch, Menu, MenuButton, Stack, MenuList, Tooltip } from '@chakra-ui/react'


function NavbarComponent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const checkAuthentication = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  const navigateToLogin = () => {
    navigate('/login');
  }


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
  }

  return (
    <nav className='navbar-component'>
      <input type="checkbox" name="" id="chk1"/>
      <div className="logo">
        <Link to={'/'} style={{ display: "flex" }}>
          <img src={logo} alt="logo" className="curio-logo"/>
          <h1 className='title-platform'>Curio</h1>
        </Link>
      </div>
      <div className="search-box">
        <form action="">
          <input type="text" name="search" id="srch" placeholder="Search Curio"/>
          <button type="submit"><i className="search-icon fa fa-search" aria-hidden="true"></i></button>
        </form>
      </div>
      <ul className='right-section-navbar'>
        {isAuthenticated && 
          <li className='sub-right-navbar'>
            <Tooltip label="Advertise on Curio">
              <a href="#" style={{ display: "flex" }} className='right-item-option'>
                <Advertisement />
              </a>
            </Tooltip>
          </li>
        }
        {isAuthenticated && 
          <li className='sub-right-navbar'>
            <Tooltip label="Open chat">
              <a href="#" className='right-item-option' style={{ display: "flex" }}>
                <img className='navImg' src={openchat} alt="logo"/>
              </a>
            </Tooltip>
          </li>
        }
        {isAuthenticated && 
          <li className='sub-right-navbar'>
            <Tooltip label="Create post">
              <Link to={'user/CreatePost/'} className='create-icon' style={{ display: "flex" }}>
                <img className='navImg' src={plus} alt="profile" style={{ marginRight: "5px" }} />
                Create
              </Link>
            </Tooltip>
          </li>
        }
        {isAuthenticated && 
          <li className='sub-right-navbar'>
            <Tooltip label="Open inbox">
              <a style={{ display: "flex" }} className='right-item-option'>
              <Menu>
                <MenuButton>
                  <img className='navImg notificimg' src={inbox} alt="logo"/>
                </MenuButton>
                <MenuList 
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  boxShadow: 'none', 
                }}>
                  <Notifications_Dropdown/>
                </MenuList>
              </Menu>
              </a>
            </Tooltip>
          </li>
        }
        {isAuthenticated && 
          <li className='sub-right-navbar' onClick={(e) => {toggleMenu()}}>
            <Tooltip label="Open profile menu">
              <a href="#" className='right-item-option' style={{ display: "flex" , flexDirection: "column"}} onClick={(e) => e.preventDefault()}>
                <img className='profileImg' src={profile} alt="logo"/>
              </a>
            </Tooltip>
          </li>
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
          <div className="d-flex align-items-center sub-menu-link">
            <EditAvatar />
            <span className="drop-down-description">Edit Avatar</span>
          </div>
          <div className="d-flex align-items-center sub-menu-link">
          <ContProgram />
            <div className="d-flex flex-column">
            <span className="drop-down-description">Contributor Porgram</span>
              <div className='d-flex flex-start align-items-center ArrowandNumber'>
              <ContArrow />
              <span className='contribNumber'>0</span>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center sub-menu-link switchDiv">
            <ModMode />
            <span className="drop-down-description">Mod mode</span>
            <Stack align='center' direction='row' className='switchplacement'>
              <Switch size='lg' colorScheme='blue' />
            </Stack>
          </div>
          <div className="d-flex align-items-center sub-menu-link switchDiv">
            <DarkMode />
            <span className="drop-down-description">Dark mode</span>
            <Stack align='center' direction='row' className='switchplacement'>
              <Switch size='lg' colorScheme='blue' />
            </Stack>
          </div>
          <div className="d-flex align-items-center sub-menu-link" onClick={toggleMenu}>
            <SignupHandler/>
          </div>
          <hr />
          <div className="d-flex align-items-center sub-menu-link">
            <Advertisement />
            <span className="drop-down-description"> Advertise on reddit</span>
          </div>
          <hr />
          <Link to={'settings/account'} className="d-flex align-items-center sub-menu-link" onClick={toggleMenu}> 
            <Settings />
            <span className="drop-down-description">Settings</span>
          </Link>
          <hr />
          <div className="d-flex align-items-center last-item1">
            <Premium />
            <span className="drop-down-description"> Premium</span>
          </div>
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
