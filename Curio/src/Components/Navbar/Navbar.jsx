import React from 'react';
import "./Navbar.css"; 
import logo from "../../assets/Curio_logo.png";
import advertise from "../../assets/Advertise_navbar.png";
import openchat from "../../assets/Chat_navbar.png";
import plus from "../../assets/Plus_navbar.png";
import inbox from "../../assets/Inbox_navbar.png";
import profile from "../../assets/Profile_navbar.png";
import setting from "../../assets/Setting_navbar.png";
import search_icon from "../../assets/search_icon.png"
import { Link } from 'react-router-dom';
import SignupHandler from './SignupHandler';
import { Navbar, Container, Nav, NavDropdown, Form, Button, Offcanvas } from 'react-bootstrap';
import Avatar from '../../styles/icons/Avatar';
import SearchInput from "./SearchInput"

function NavbarComponent() {
  const username = localStorage.getItem('username');
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
              <a href="#" style={{ display: "flex" }}>
                <img src={advertise} alt="advertise" />
              </a>
            </Tooltip>
          </li>
        }
        {isAuthenticated && 
          <li className='sub-right-navbar'>
            <Tooltip label="Open chat">
              <a href="#" style={{ display: "flex" }}>
                <img src={openchat} alt="logo"/>
              </a>
            </Tooltip>
          </li>
        }
        {isAuthenticated && 
          <li className='sub-right-navbar'>
            <Tooltip label="Create post">
              <Link to={'user/CreatePost/'} className='create-icon' style={{ display: "flex" }}>
                <img src={plus} alt="profile" style={{ marginRight: "5px" }} />
                Create
              </Link>
            </Tooltip>
          </li>
        }
        {isAuthenticated && 
          <li className='sub-right-navbar'>
            <Tooltip label="Open inbox">
              <a href="#" style={{ display: "flex" }}>
                <img src={inbox} alt="logo"/>
              </a>
            </Tooltip>
          </li>
        }
        {isAuthenticated && 
          <li className='sub-right-navbar' onClick={toggleMenu}>
            <Tooltip label="Open profile menu">
              <a href="#" style={{ display: "flex" , flexDirection: "column"}} onClick={(e) => e.preventDefault()}>
                <img src={profile} alt="logo"/>
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
            <Tooltip label="Open settings menu">
              <div>
                <LoggedOutHandler />
              </div>
            </Tooltip>
          </div>
        }
      </ul>
      <div className="sub-menu-wrap" id='subMenu'>
        <div className="sub-menu">
          <Link to={`profile/${username}`} className="user-info" onClick={toggleMenu}>
            <img src={profile} alt="logo"/>
            <h6>View Profile</h6>
          </Link>
          <hr />
          <Link to={'settings/account'} className="sub-menu-link" onClick={toggleMenu}> 
            <img src={setting} alt="setting" />
            <p>Settings</p>
          </Link>
          <hr />
          <div className="user-info sub-menu-link" onClick={toggleMenu}>
            <SignupHandler/>
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
