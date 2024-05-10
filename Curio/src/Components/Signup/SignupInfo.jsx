import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CloseButton from '../../styles/icons/CloseButton.jsx';
import './Signup.css';
import Google from '../../styles/icons/Google.jsx';
import UsernameInfo from './UsernameInfo.jsx';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { useToast } from '@chakra-ui/react';

/**
 * SignupInfo component displays a modal for user signup.
 * @component
 * @param {object} props - The props for the SignupInfo component.
 * @param {boolean} props.show - Boolean indicating whether the modal should be shown.
 * @param {Function} props.onHide - Function to handle modal close event.
 * @param {string} props.enteredEmail - Initial value for the entered email.
 * @param {Function} props.onEnteredEmail - Function to handle the entered email.
 * @param {Function} props.onContinue - Function to handle the continue button click.
 * @module SignupInfo
 * @returns {JSX.Element} SignupInfo JSX element.
 * @example
 * // Example usage of SignupInfo component:
 * <SignupInfo
 *   show={true}
 *   onHide={() => setShowModal(false)}
 *   enteredEmail=""
 *   onEnteredEmail={(email) => setEmail(email)}
 *   onContinue={() => handleContinue()}
 * />
 */

function SignupInfo(props) {

  const navigate = useNavigate();
  const toast = useToast();
  const handleGoogleSignupResponse = async (response) => {
    console.log(response);
    const hostUrl = import.meta.env.VITE_SERVER_HOST;
    const serverResponse = await axios.post(`${hostUrl}/api/auth/google`,{
      token: response.access_token
    });
    if(serverResponse.status === 200){
      const getUsername = await axios.get(`${hostUrl}/api/settings/v1/me`, {
          headers: {  
            Authorization: `Bearer ${serverResponse.data.accessToken}`
          }
      });
      if(getUsername.status === 200){
        localStorage.setItem('username', getUsername.data.username);
      }
      const token = serverResponse.data.accessToken;
      localStorage.setItem('token', token);
      window.dispatchEvent(new Event('loginOrSignup'));
      
      toast({
          description: "Connection succeeded",
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

      props.onHide();
      navigate('/');
    }
  }

  const login = useGoogleLogin({
    onSuccess: codeResponse => handleGoogleSignupResponse(codeResponse),
  });


  const [email, setEmail] = useState(props.enteredEmail || '');
  const [isEmailValid, setIsEmailValid] = useState(0);
  const [emailErrorMsg, setEmailErrorMsg] = useState('');

  const handleEmail = async (e) => {
    const email = e.target.value;
    setEmail(email);
    if (email.charAt(email.length - 1) === '@'){
        setEmailErrorMsg(`Please enter a part following '@'.'${email}' is incomplete.`);
        setIsEmailValid(1);
        return;
    }
    if(email.indexOf('@') === -1){
        setEmailErrorMsg(`Please include an '@' in the email address. '${email}' is missing an '@'.`);
        setIsEmailValid(1);
        return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        setEmailErrorMsg("that email is invalid");
        setIsEmailValid(1);
        return;
    }
    setEmailErrorMsg("");
    setIsEmailValid(2);
    props.onEnteredEmail(newEmail);
  }

  const handleContinue = () => {
    if(email === ''){
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        setEmailErrorMsg("that email is invalid");
        setIsEmailValid(1);
        return;
    }
    props.onEnteredEmail(email);
    props.onContinue();
  }

  const handleNavigateToLogin = () => {
    navigate('/login');
    props.onHide();
  }


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      contentClassName='signup-modal'
    >
      <Modal.Header className='border-0'>
        <Modal.Title id="contained-modal-title-vcenter" className='w-100'>
            <button className='signup-close-button ms-auto d-flex justify-content-center align-items-center' onClick={props.onHide}><CloseButton /></button>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='pt-0 d-flex flex-column'>
        <div className="pt-0" style={{paddingLeft: '80px', paddingRight: '80px'}}>
            <h1 className='signup-header'>Sign Up</h1>
            <p className='signup-info'>By continuing, you agree to our <a style={{color: "#0d6efd"}} href="https://www.redditinc.com/policies/user-agreement">User Agreement</a> and acknowledge that you understand the <a style={{color: "#0d6efd"}} href="https://www.reddit.com/policies/privacy-policy">Privacy Policy</a>.</p>
        </div>
        <div className="d-flex justify-content-center mb-3" style={{paddingLeft: '80px', paddingRight: '80px'}}>
            <button
              className="continue-with-google w-100 p-2 d-flex justify-content-between align-items-center align-content-center"
              type="button"
              onClick={login}
            >
              <div className="logintext">Continue with Google</div>
              <div className="loginGoogle">
                <Google />
              </div>
            </button>
        </div>
        <div className="d-flex justify-content-between align-items-center align-content-center mb-3 mt-3" style={{paddingLeft: '80px', paddingRight: '80px'}}>
            <hr className='w-50'></hr>
            <p style={{fontSize: '0.7rem'}} className='px-3 d-flex align-items-center'>OR</p>
            <hr className='w-50'></hr>
        </div>
        <div style={{borderRadius: '30px', paddingLeft: '80px', paddingRight: '80px', position: 'relative'}}>
              <div className='d-flex flex-column position-relative w-100'>
                <input data-testid="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={handleEmail} style={{border: isEmailValid===1 ? "2px solid #a50016" : "", paddingLeft: '20px', borderRadius: '30px'}} className="form-control signup-email-input w-100 my-input" id="floatingInput" placeholder=" " />
                <label htmlFor="floatingInput" className="create-community-name-label position-absolute h-100 d-flex align-items-center ms-4 my-floating">Email<span style={{color: '#a50016'}}>*</span></label>
              </div>
              {isEmailValid == 2 && (
                <span className="tick-icon position-absolute top-50 end-0 custom-translate">
                  <svg rpl="" className="trailing-icon valid" fill="#0e8a00" height="25" icon-name="checkmark-fill" viewBox="0 0 20 20" width="25" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 15.958a1.102 1.102 0 0 1-.778-.322l-5.429-5.429 1.414-1.414L7.5 13.586 17.793 3.293l1.414 1.414L8.278 15.636a1.101 1.101 0 0 1-.778.322Z"></path>
                  </svg>
                </span>
              )}
              {isEmailValid == 1 && (
                <span className="tick-icon position-absolute top-50 end-0 py-1 custom-translate">
                  <svg rpl="" className="trailing-icon invalid" fill="#a50016" height="25" icon-name="error-outline" viewBox="0 0 20 20" width="25" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 20a10 10 0 1 1 10-10 10.011 10.011 0 0 1-10 10Zm0-18.75A8.75 8.75 0 1 0 18.75 10 8.76 8.76 0 0 0 10 1.25Zm-.533 13.716a1.077 1.077 0 0 1-.53-.92 1.058 1.058 0 0 1 .53-.919c.16-.096.343-.146.53-.144a1.056 1.056 0 0 1 .926.527 1.045 1.045 0 0 1 0 1.069c-.096.16-.23.293-.39.387a1.03 1.03 0 0 1-.536.143 1.016 1.016 0 0 1-.53-.143Zm-.14-3.329-.192-6.613h1.73l-.192 6.613H9.327Z">
                    </path>
                  </svg>
                </span>
              )}
        </div>
        <div className='mb-3' style={{paddingLeft: '80px', paddingRight: '80px'}}>
          <span className='p-2 py-2' style={{color: isEmailValid===1 ? "#a50016" : "#0e8a00", fontSize: '0.875rem'}}>{emailErrorMsg}</span>
        </div>
        <div className='d-flex pb-5 mb-2' style={{paddingLeft: '80px', paddingRight: '80px', fontSize: '0.875rem'}}>
            <p className='me-2'>Already a redditor?</p> <a style={{color: "#0d6efd", cursor: "pointer"}} onClick={handleNavigateToLogin}>Log In</a>
        </div>
      </Modal.Body>
      <Modal.Footer className='border-0 pb-4 mb-4 d-flex justify-content-center' style={{paddingLeft: '80px', paddingRight: '80px'}}>
        <Button disabled={isEmailValid === 1} className = {(isEmailValid===1) ? "continue-button-disabled w-100" : "w-100 continue-button"} onClick={handleContinue}>Continue</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SignupInfo;