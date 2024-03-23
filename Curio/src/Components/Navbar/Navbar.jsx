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
                      <SearchInput/>
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
  );
}

export default NavbarComponent;
