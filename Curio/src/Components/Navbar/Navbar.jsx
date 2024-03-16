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

function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#"><img src={logo} alt="logo" className="d-inline-block align-text-middle"/> Curio</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <form class="d-flex ms-auto">
                <button className="btn btn-outline-success" type="submit"><img src={search_icon} alt="search_icon" /></button>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            </form>
            </ul>

            <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
                
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#"><img src={advertise} alt="advertise_icon" /></a>
                </li>
                <li className="nav-item">
                <a className="nav-link active" href="#"><img src={openchat} alt="openchat_icon" /></a>
                </li>
                <li className="nav-item">
                <a className="nav-link active" href="#"><img src={plus} alt="profile" height="auto" className="d-inline-block align-text-middle"/> Create</a>
                </li>
                <li className="nav-item">
                <a className="nav-link active" href="#"><img src={inbox} alt="profile" className='inbox-icon' /></a>
                </li>
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle active" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img src={profile} alt="profile" classNameName='user-icon' />
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                    <li><a className="dropdown-item" href="#">View Profile</a></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><Link to={'settings/profile'} className="dropdown-item"> <img src={setting} alt="setting" className="d-inline-block align-text-middle mx-2"/>Settings</Link></li>
                </ul>
                </li>
                <SignupHandler/>
            </ul>
            </div>
        </div>
    </nav>
  );
}

export default Navbar;
