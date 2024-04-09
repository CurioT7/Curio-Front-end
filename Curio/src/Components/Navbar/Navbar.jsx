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
// import Avatar from '../../styles/icons/Avatar';
import SearchInput from "./SearchInput"

function NavbarComponent() {
  // const username = localStorage.getItem('username');
  // return (
  //   <>
  //     {['lg'].map((expand) => (
  //       <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3" style={{zIndex:"1000"}}>
  //         <Container fluid>
  //           <Navbar.Brand href="/"><img src={logo} alt="logo" className="d-inline-block align-text-middle"/> Curio</Navbar.Brand>
  //           <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
  //           <Navbar.Offcanvas
  //             id={`offcanvasNavbar-expand-${expand}`}
  //             aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
  //             placement="end"
  //           >
  //             <Offcanvas.Header closeButton>
  //               <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
  //                 Offcanvas
  //               </Offcanvas.Title>
  //             </Offcanvas.Header>
  //             <Offcanvas.Body className='d-flex justify-content-center'>
  //               <Nav className='d-flex justify-content-end search-offcanvas w-100'>
  //                   <Form className="d-flex mt-1">
  //                     <SearchInput/>
  //                   </Form>
  //               </Nav>
  //               <Nav className="d-flex ms-auto flex-grow-1 w-50">
  //                 <Nav.Link style={{height: "30px", marginTop: "10px"}} className='ms-auto d-flex align-items-center me-2 link-offcanvas' href="#action3"><img src={openchat} alt="profile" className='inbox-icon' /></Nav.Link>
  //                 <Nav.Link style={{height: "40px"}} className='mt-2 me-2 link-offcanvas' href="#action3"><img src={inbox} alt="profile" className='inbox-icon' /></Nav.Link>
  //                 <Nav.Link style={{ height: "40px", display: "flex", alignItems: "center" }} className='mt-2 me-2 link-offcanvas'>
  //                     <Link to={'user/CreatePost/'} style={{ display: "flex", alignItems: "center" }}>
  //                         <img src={plus} alt="profile" className='inbox-icon' style={{ marginRight: "5px" }} />
  //                         Create
  //                     </Link>
  //                 </Nav.Link>
  //                 <NavDropdown align={{ lg: 'end' }} style={{borderRadius: '999px!important', backgroundColor: "#ffffff!important", color:"#000000!important"}} className="signup-button px-2 me-4 ms-3 d-flex justify-content-center col-md-1 col-xs-1 link-offcanvas" title="Profile">
  //                   <NavDropdown.Item className="d-flex signup-button-item px-3"><span className="ms-3"> <Link style={{color: "#000000!important"}} className='settings' to={`user/${username}`} > View Profile </Link> </span></NavDropdown.Item>
  //                   <NavDropdown.Item style={{height: "50px", color: "#000000!important"}} className="d-flex align-items-center signup-button-item px-2 link-offcanvas"><Link style={{color: "#000000!important"}} className='settings' to={'settings/account'}><div style={{backgroundColor: "#f2f4f5!important"}} className='d-flex'><img style={{height: "20px"}} src={setting} alt="setting" className="settings-offcanvas align-text-middle mx-2"/><span>View Settings</span></div></Link></NavDropdown.Item>
  //                 </NavDropdown>
  //                 <div className='d-flex align-items-center'>
  //                   <SignupHandler/>
  //                 </div>
  //               </Nav>         
  //             </Offcanvas.Body>
  //           </Navbar.Offcanvas>
  //         </Container>
  //       </Navbar>
  //     ))}
  //   </>
  // );
  let subMenu = document.getElementById("subMenu");
  function toggleMenu(){
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
            <button type="submit"><i class="search-icon fa fa-search" aria-hidden="true"></i></button>
          </form>
        </div>
        <ul className='right-section-navbar'>
          <li className='sub-right-navbar'>
            <a href="#" style={{ display: "flex" }}><img src={advertise} alt="advertise"/></a>
          </li>
          <li className='sub-right-navbar'><a href="#" style={{ display: "flex" }}><img src={openchat} alt="logo"/></a></li>
          <li className='sub-right-navbar'>
          <Link to={'user/CreatePost/'} className='create-icon' style={{ display: "flex" }}>
            <img src={plus} alt="profile" style={{ marginRight: "5px" }} />
            Create
          </Link>
          </li>

          <li className='sub-right-navbar'><a href="#" style={{ display: "flex" }}><img src={inbox} alt="logo"/></a></li>
          <li className='sub-right-navbar'><a href="#" style={{ display: "flex" , flexDirection: "column"}}><img src={profile} alt="logo" onClick={toggleMenu}/></a></li>
          <div className="sub-menu-wrap" id='subMenu'>
            <div className="sub-menu">
              <div className="user-info">
                <img src={profile} alt="logo"/>
                <h6>View Profile</h6>
              </div>
              <hr />
              <Link to={'settings/account'} className="sub-menu-link">
                <img src={setting} alt="setting" />
                <p>Settings</p>
              </Link>
            </div>
          </div>
        </ul>
        <div className="menu">
          <label htmlFor="chk1">
            <i class="fa fa-bars" aria-hidden="true"></i>
          </label>
        </div>
        <div style={{color: "#000000!important"}}>
          <SignupHandler/>
        </div>
      </nav>

    );
}

export default NavbarComponent;
