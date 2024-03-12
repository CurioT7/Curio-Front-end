import React from "react";
import './Login.css';
import './Login.jsx';
import Login from "./Login.jsx";
import Navbar from "../Navbar/Navbar.jsx";

function LoginPage(){
    return (
        <div className="login-page">
            
      {Login()}
      <Navbar />
    </div>
   );
}

export default LoginPage;