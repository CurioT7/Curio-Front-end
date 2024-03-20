import React, {useState, useEffect} from "react";
import "./Navbar.css";
import Signup from "../../styles/icons/Signup";
import { NavDropdown } from "react-bootstrap";
import Dots from "../../styles/icons/Dots";
import SignupInfo from "../Signup/SignupInfo";
import UsernameInfo from "../Signup/UsernameInfo";
import Gender from "../Signup/Gender";
import Preferences from "../Signup/Preferences";
import {signup} from "../Signup/SignupEndpoints";

function SignupHandler() {


  const [isSignupInfoModalOpen, setSignupInfoModalOpen] = useState(false);
  const [isUsernameInfoModalOpen, setUsernameInfoModalOpen] = useState(false);
  const [isGenderModal, setGenderModalOpen] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState('');
  const [username, setEnteredUsername] = useState('');
  const [password, setEnteredPassword] = useState('');
  const [isPreferencesModalOpen, setPreferencesModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);




  const checkAuthentication = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);


  const handleSignupInfoClick = () => {
    setSignupInfoModalOpen(true);
  }

  const handleOpenUsernameInfo = () => {
    setSignupInfoModalOpen(false); 
    setUsernameInfoModalOpen(true); 
  }

  const handleBackToSignupInfo = () => {
    setSignupInfoModalOpen(true);
    setUsernameInfoModalOpen(false);
  }

  const handleEnteredEmail = (email) => {
    setEnteredEmail(email);
  }

  const handleContinueToGender = () => {
    setUsernameInfoModalOpen(false);
    setGenderModalOpen(true);
  }

  const handleEnteredUsername = (username) => {
    setEnteredUsername(username);
  }

  const handleEnteredPassword = (password) => {
    setEnteredPassword(password);
  }

  const handleBackToGender = () => {
    setGenderModalOpen(true);
    setPreferencesModalOpen(false);
  }

  const handleContinueToPreferences = () => {
    setGenderModalOpen(false);
    setPreferencesModalOpen(true);
  }

  const handleSignup = async () => {
    try{
      const response = await signup({username, email: enteredEmail, password});
      console.log(response);
      if(response.status === 201){
        console.log('Signup successful');
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('username', username);
        setIsAuthenticated(true);
        window.dispatchEvent(new Event("loginOrSignup"));
      }
      else{
        console.log('Signup failed');
      }
    }
    catch(err){
      console.log(err);
    }
  }



  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    window.dispatchEvent(new Event("loginOrSignup"));
  }

    return (
        <>
            <NavDropdown style={{borderRadius: '999px!important'}} className="signup-button mt-0 d-flex justify-content-center col-md-1 col-xs-1" title={<Dots />}>
                {!isAuthenticated && <NavDropdown.Item onClick={handleSignupInfoClick} className="d-flex signup-button-item px-3"><Signup /><span className="ms-3">Login / Register</span></NavDropdown.Item>}
                {isAuthenticated && <NavDropdown.Item onClick={handleLogout} className="d-flex signup-button-item px-3"><Signup /><span className="ms-3">Logout</span></NavDropdown.Item>}
            </NavDropdown>
            {isSignupInfoModalOpen && <SignupInfo show={isSignupInfoModalOpen} onHide={() => setSignupInfoModalOpen(false)} onContinue={handleOpenUsernameInfo} onEnteredEmail={handleEnteredEmail} enteredEmail={enteredEmail} />}
            {isUsernameInfoModalOpen && <UsernameInfo show={isUsernameInfoModalOpen} onHide={() => setUsernameInfoModalOpen(false)} onContinueToGender={handleContinueToGender} onEnteredUsername={handleEnteredUsername} onEnteredPassword={handleEnteredPassword} enteredUsername={username} enteredPassword={password} onBack={handleBackToSignupInfo} />}
            {isGenderModal && <Gender show={isGenderModal} onHide={() => setGenderModalOpen(false)} onContinueToPreferences={handleContinueToPreferences} />}
            {isPreferencesModalOpen && <Preferences show={isPreferencesModalOpen} onHide={() => setPreferencesModalOpen(false)} onBackToGender={handleBackToGender} onSignup={handleSignup} />}
        </>
    );
}
export default SignupHandler;