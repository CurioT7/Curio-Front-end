import React, {useState} from "react";
import "./Navbar.css";
import Signup from "../../styles/icons/Signup";
import { NavDropdown } from "react-bootstrap";
import Dots from "../../styles/icons/Dots";
import SignupInfo from "../Signup/SignupInfo";
import UsernameInfo from "../Signup/UsernameInfo";
import Gender from "../Signup/Gender";
import Preferences from "../Signup/Preferences";
import signup from "../Signup/SignupEndpoints";

function SignupHandler() {


  const [isSignupInfoModalOpen, setSignupInfoModalOpen] = useState(false);
  const [isUsernameInfoModalOpen, setUsernameInfoModalOpen] = useState(false);
  const [isGenderModal, setGenderModalOpen] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState('');
  const [username, setEnteredUsername] = useState('');
  const [password, setEnteredPassword] = useState('');
  const [isPreferencesModalOpen, setPreferencesModalOpen] = useState(false);



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
      if(response.status === 200){
        console.log('Signup successful');
      }
      else{
        console.log('Signup failed');
      }
    }
    catch(err){
      console.log(err);
    }
  }

    return (
        <>
            <NavDropdown style={{borderRadius: '999px!important'}} className="signup-button mt-0 d-flex justify-content-center col-md-1 col-xs-1" title={<Dots />}>
                <NavDropdown.Item onClick={handleSignupInfoClick} className="d-flex signup-button-item px-3" href="#action/3.1"><Signup /><span className="ms-3">Login / Register</span></NavDropdown.Item>  
            </NavDropdown>
            {isSignupInfoModalOpen && <SignupInfo show={isSignupInfoModalOpen} onHide={() => setSignupInfoModalOpen(false)} onContinue={handleOpenUsernameInfo} onEnteredEmail={handleEnteredEmail} enteredEmail={enteredEmail} />}
            {isUsernameInfoModalOpen && <UsernameInfo show={isUsernameInfoModalOpen} onHide={() => setUsernameInfoModalOpen(false)} onContinueToGender={handleContinueToGender} onEnteredUsername={handleEnteredUsername} onEnteredPassword={handleEnteredPassword} enteredUsername={username} enteredPassword={password} onBack={handleBackToSignupInfo} />}
            {isGenderModal && <Gender show={isGenderModal} onHide={() => setGenderModalOpen(false)} onContinueToPreferences={handleContinueToPreferences} />}
            {isPreferencesModalOpen && <Preferences show={isPreferencesModalOpen} onHide={() => setPreferencesModalOpen(false)} onBackToGender={handleBackToGender} onSignup={handleSignup} />}
        </>
    );
}
export default SignupHandler;