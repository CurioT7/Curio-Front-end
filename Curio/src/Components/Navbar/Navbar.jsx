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
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container-fluid">
        <div className="row align-items-start">
          {/* <!-- Left Section --> */}
          <div className="col mr-auto">
            <Link className="navbar-brand" to="#">
                <img src={logo} alt="Curio logo" width="50" height="auto" className="d-inline-block align-text-middle"/>
                Curio
            </Link>
          </div>
          {/* <!-- Center Section --> */}
          <div className="center-section col">
            <form action="">
              <button><img src={search_icon} alt="search_icon" /></button>
              <input type="text" name="" id="" placeholder='Search'/>
            </form>
          </div>
          {/* <!-- Right Section --> */}
          <div className="right-section col">
            <a href="#">
                <img src={advertise} alt="advertise_icon" />
            </a>
            <a href="#">
                <img src={openchat} alt="openchat_icon" />
            </a>
            <a href="#" className='profile-item'>
                <img src={plus} alt="profile" height="auto" className="d-inline-block align-text-middle"/> Create
            </a>
            <a href="#">
                <img src={inbox} alt="profile" className='inbox-icon' />
            </a>
            <div className="dropdown">
              <a href="#" className="nav-link dropdown-toggle nav-item dropdown" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img src={profile} alt="profile" className='user-icon' />
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                <li><a className="dropdown-item" type="button">Action</a></li>
                <li><a className="dropdown-item" type="button">Another action</a></li>
                <li><Link to={'settings/profile'} type="button" className="dropdown-item">Settings</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
