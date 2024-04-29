import React, {useState, useEffect} from "react";
import "./Navbar.css";
import Signup from "../../styles/icons/Signup";
import Advertisement from "../../styles/icons/Ad";
import { NavDropdown } from "react-bootstrap";
import Dots from "../../styles/icons/Dots";
import SignupInfo from "../Signup/SignupInfo";
import UsernameInfo from "../Signup/UsernameInfo";
import Gender from "../Signup/Gender";
import Preferences from "../Signup/Preferences";
import Shop from "../../styles/icons/Shop";
import { signup } from "../Signup/SignupEndpoints";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

function LoggedOutHandler() {


  const [isSignupInfoModalOpen, setSignupInfoModalOpen] = useState(false);
  const [isUsernameInfoModalOpen, setUsernameInfoModalOpen] = useState(false);
  const [isGenderModal, setGenderModalOpen] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState('');
  const [username, setEnteredUsername] = useState('');
  const [password, setEnteredPassword] = useState('');
  const [enteredGender, setEnteredGender] = useState('');
  const [isPreferencesModalOpen, setPreferencesModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const toast = useToast();
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

  const handleSettingGender = (gender) => {
    setEnteredGender(gender);
  }

  const handleContinueToPreferences = () => {
    setGenderModalOpen(false);
    setPreferencesModalOpen(true);
  }

  const handleSignup = async () => {
    try{
      const response = await signup({username, email: enteredEmail, password, gender: enteredGender});
      console.log(response);
      if(response.status === 201){
        console.log('Signup successful');
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('username', username);
        console.log('Token:', response.data.accessToken);
        setIsAuthenticated(true);
        window.dispatchEvent(new Event("loginOrSignup"));
        toast({
          description: "Account Created Successfully!",
          status: "success",
          position: "bottom",
          isClosable: true,
          backgroundColor: "#55BD46",
          containerStyle: {
            width: "500px",
            backgroundColor: "#55BD46",
            fontWeight: "300",
            borderRadius: "20px",
          },
          height: "100%",
          duration: 3000
        });
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
    toast({
          description: "Logout Successful!",
          status: "success",
          position: "bottom",
          isClosable: true,
          backgroundColor: "#55BD46",
          containerStyle: {
            width: "500px",
            backgroundColor: "#55BD46",
            fontWeight: "300",
            borderRadius: "20px",
          },
          height: "100%",
          duration: 3000
        });
    window.dispatchEvent(new Event("loginOrSignup"));
    navigate("/");
  }

  return (
      <>
          <NavDropdown align={{ lg: 'end' }} style={{borderRadius: '999px!important', width:"20px!important"}} className="link-offcanvas logged-out-button signup-button mt-0 p-0 d-flex justify-content-center" title={<Dots />}>
              {!isAuthenticated && <NavDropdown.Item onClick={handleSignupInfoClick} className="d-flex signup-focus px-3 mt-2">
                <Signup />
                <span className="ms-3">
                  Login / Sign Up
                  </span>
                  </NavDropdown.Item>}
              {isAuthenticated && <NavDropdown.Item onClick={handleLogout} className="d-flex signup-button-item px-3"><Signup />
              <span className="ms-3">
                Logout
                </span>
              </NavDropdown.Item>}
          </NavDropdown>
          {isSignupInfoModalOpen && <SignupInfo show={isSignupInfoModalOpen} onHide={() => setSignupInfoModalOpen(false)} onContinue={handleOpenUsernameInfo} onEnteredEmail={handleEnteredEmail} enteredEmail={enteredEmail} />}
          {isUsernameInfoModalOpen && <UsernameInfo show={isUsernameInfoModalOpen} onHide={() => setUsernameInfoModalOpen(false)} onContinueToGender={handleContinueToGender} onEnteredUsername={handleEnteredUsername} onEnteredPassword={handleEnteredPassword} enteredUsername={username} enteredPassword={password} onBack={handleBackToSignupInfo} />}
          {isGenderModal && <Gender show={isGenderModal} handleEnteredGender={handleSettingGender} onHide={() => setGenderModalOpen(false)} onContinueToPreferences={handleContinueToPreferences} />}
          {isPreferencesModalOpen && <Preferences show={isPreferencesModalOpen} onHide={() => setPreferencesModalOpen(false)} onBackToGender={handleBackToGender} onSignup={handleSignup} />}
      </>
  );
}
export default LoggedOutHandler;