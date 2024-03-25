import React, { useState, useEffect } from 'react';
import '../Login/Login.css';
import { resetPassword } from '../Login/LoginEndpoints';
import SignupHandlerForLogin from '../Login/SignupHandlerForLogin.jsx';

function ForgotPass({ setForgotPass, forgotPass, setChangePass }) {
  const [username, setUsername] = useState(''); 
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
      setEmailError('');
    } else if (!emailRegex.test(email)) {
      setEmailError('Enter a valid email address.');
    } else {
      setEmailError('');
    }
  }, [email]);

  const handleReset = async (event) => {
    event.preventDefault();

    
    if (emailError || username === '') {
      return;
    }

    try {
      const response = await resetPassword(username, email);
      console.log('Success:', response);
      setChangePass(true);
      setForgotPass(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <button className="backButton" onClick={() => setForgotPass(false)}>
        <svg
          rpl=""
          fill="currentColor"
          height="20"
          icon-name="back-outline"
          viewBox="0 0 20 20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19 9.375H2.51l7.932-7.933-.884-.884-9 9a.625.625 0 0 0 0 .884l9 9 .884-.884-7.933-7.933H19v-1.25Z"></path>
        </svg>
      </button>
      <div className="loginBox">
        <h1>Reset your password</h1>
        <p>
          Tell us the username and email address associated with your Reddit
          account, <br />
          and we’ll send you an email with a link to reset your password.
        </p>
        <form className="myForm">
          <div className="loginInput">
            <input
              type="text"
              placeholder="Username *"
              required
              onChange={(e) => setUsername(e.target.value)} // Update username when the input changes
            />
          </div>
          <div className="loginInput">
            <input
              type="text"
              placeholder="Email *"
              required
              onChange={(e) => setEmail(e.target.value)} // Update email when the input changes
            />
          </div>
          {emailError && <div className="loginError">{emailError}</div>}
          <p>
            Don't have an email or need assistance logging in?{' '}
            <a href="https://support.reddithelp.com/hc/en-us/sections/360008917491-Account-Security">
              Get Help
            </a>
          </p>
          <SignupHandlerForLogin/><a href="Login"> • Log In</a>
        </form>
      </div>
      <div className="submit">
        <button
          type="submit"
          className="login_buttons"
          onClick={(event) => {
            handleReset(event);
          }}
        >
          Reset Password
        </button>
      </div>
    </>
  );
}

export default ForgotPass;
