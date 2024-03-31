import React, {useState, useEffect} from "react";
import Signup from "../../styles/icons/Signup";
import { NavDropdown } from "react-bootstrap";
import Dots from "../../styles/icons/Dots";
import SignupInfo from "../Signup/SignupInfo";
import UsernameInfo from "../Signup/UsernameInfo";
import Gender from "../Signup/Gender";
import Preferences from "../Signup/Preferences";
import { signup } from "../Signup/SignupEndpoints";
import { useNavigate } from "react-router-dom";

function SignupHandlerForLogin() {


  const [isSignupInfoModalOpen, setSignupInfoModalOpen] = useState(false);
  const [isUsernameInfoModalOpen, setUsernameInfoModalOpen] = useState(false);
  const [isGenderModal, setGenderModalOpen] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState('');
  const [username, setEnteredUsername] = useState('');
  const [password, setEnteredPassword] = useState('');
  const [isPreferencesModalOpen, setPreferencesModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthentication();
    window.addEventListener("loginOrSignup", checkAuthentication);
    return () => {
      window.removeEventListener("loginOrSignup", checkAuthentication);
    };
  }, []); 

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
        console.log('Token:', response.data.accessToken);
        setIsAuthenticated(true);
        window.dispatchEvent(new Event("loginOrSignup"));
        navigate("/");
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
    navigate("/");
  }

    return (
        <>
            <button style={{color: "#0045ac"}} onClick={handleSignupInfoClick}>Signup</button>
            {isSignupInfoModalOpen && <SignupInfo show={isSignupInfoModalOpen} onHide={() => setSignupInfoModalOpen(false)} onContinue={handleOpenUsernameInfo} onEnteredEmail={handleEnteredEmail} enteredEmail={enteredEmail} />}
            {isUsernameInfoModalOpen && <UsernameInfo show={isUsernameInfoModalOpen} onHide={() => setUsernameInfoModalOpen(false)} onContinueToGender={handleContinueToGender} onEnteredUsername={handleEnteredUsername} onEnteredPassword={handleEnteredPassword} enteredUsername={username} enteredPassword={password} onBack={handleBackToSignupInfo} />}
            {isGenderModal && <Gender show={isGenderModal} onHide={() => setGenderModalOpen(false)} onContinueToPreferences={handleContinueToPreferences} />}
            {isPreferencesModalOpen && <Preferences show={isPreferencesModalOpen} onHide={() => setPreferencesModalOpen(false)} onBackToGender={handleBackToGender} onSignup={handleSignup} />}
        </>
    );
}
export default SignupHandlerForLogin;