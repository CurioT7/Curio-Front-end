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

function NavbarComponent() {
  return (
    <>
      {['lg'].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3" style={{zIndex:"1000"}}>
          <Container fluid>
            <Navbar.Brand href="#"><img src={logo} alt="logo" className="d-inline-block align-text-middle"/> Curio</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className='d-flex justify-content-center'>
                <Nav className='d-flex justify-content-end search-offcanvas w-100'>
                    <Form className="d-flex mt-1">
                        <button className="btn btn-outline-success" type="submit"><img className='offcanvas-image' src={search_icon} alt="search_icon" /></button>
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                    </Form>
                </Nav>
                <Nav className="d-flex ms-auto flex-grow-1 w-50">
                  <Nav.Link style={{height: "30px", marginTop: "10px"}} className='ms-auto d-flex align-items-center me-2 link-offcanvas' href="#action3"><img src={openchat} alt="profile" className='inbox-icon' /></Nav.Link>
                  <Nav.Link style={{height: "40px"}} className='mt-2 me-2 link-offcanvas' href="#action3"><img src={inbox} alt="profile" className='inbox-icon' /></Nav.Link>
                  <NavDropdown align={{ lg: 'end' }} style={{borderRadius: '999px!important', backgroundColor: "#ffffff!important", color:"#000000!important"}} className="signup-button px-2 me-4 ms-3 d-flex justify-content-center col-md-1 col-xs-1 link-offcanvas" title="Profile">
                    <NavDropdown.Item className="d-flex signup-button-item px-3"><span className="ms-3">View Profile</span></NavDropdown.Item>
                    <NavDropdown.Item style={{height: "50px", color: "#000000!important"}} className="d-flex align-items-center signup-button-item px-2 link-offcanvas"><Link style={{color: "#000000!important"}} className='settings' to={'settings/profile'}><div style={{backgroundColor: "#f2f4f5!important"}} className='d-flex'><img style={{height: "20px"}} src={setting} alt="setting" className="settings-offcanvas align-text-middle mx-2"/><span>View Settings</span></div></Link></NavDropdown.Item>
                  </NavDropdown>
                  <div className='d-flex align-items-center'>
                    <SignupHandler/>
                  </div>
                </Nav>         
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
    // <nav class="navbar navbar-expand-lg navbar-light bg-light" style={{zIndex:"1000"}}>
    //     <div class="container-fluid">
    //         <a class="navbar-brand" href="#"><img src={logo} alt="logo" className="d-inline-block align-text-middle"/> Curio</a>
    //         <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    //         <span class="navbar-toggler-icon"></span>
    //         </button>
    //         <div class="collapse navbar-collapse" id="navbarSupportedContent">
    //         <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
    //         <form class="d-flex ms-auto">
    //             <button className="btn btn-outline-success" type="submit"><img src={search_icon} alt="search_icon" /></button>
    //             <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
    //         </form>
    //         </ul>

    //         <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
                
    //             <li className="nav-item">
    //             <a className="nav-link active" aria-current="page" href="#"><img src={advertise} alt="advertise_icon" /></a>
    //             </li>
    //             <li className="nav-item">
    //             <a className="nav-link active" href="#"><img src={openchat} alt="openchat_icon" /></a>
    //             </li>
    //             <li className="nav-item">
    //             <a className="nav-link active" href="#"><img src={plus} alt="profile" height="auto" className="d-inline-block align-text-middle"/> Create</a>
    //             </li>
    //             <li className="nav-item">
    //             <a className="nav-link active" href="#"><img src={inbox} alt="profile" className='inbox-icon' /></a>
    //             </li>
    //             <li className="nav-item dropdown">
    //             <a className="nav-link dropdown-toggle active" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    //             <img src={profile} alt="profile" classNameName='user-icon' />
    //             </a>
    //             <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
    //                 <li><a className="dropdown-item" href="#">View Profile</a></li>
    //                 <li><hr className="dropdown-divider"/></li>
    //                 <li><Link to={'settings/profile'} className="dropdown-item"> <img src={setting} alt="setting" className="d-inline-block align-text-middle mx-2"/>Settings</Link></li>
    //             </ul>
    //             </li>
    //             <SignupHandler/>
    //         </ul>
    //         </div>
    //     </div>
    // </nav>
  );
}

export default NavbarComponent;
