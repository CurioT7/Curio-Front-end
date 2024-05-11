import React, { useState } from 'react';
import '../Login/Login.css';
import { verifyUsername } from '../Login/LoginEndpoints.js'; 
import SignupHandlerForLogin from '../Login/SignupHandlerForLogin.jsx';

/**
 * Component for recovering a user's username.
 *
 * @param {Object} props - The component props.
 * @param {function} props.setForgotUser - Function to set the state of ForgotUser.
 * @param {boolean} props.ForgotUser - State indicating whether ForgotUser is active.
 * @module The ForgotUser component.
 */
function ForgotUser({ setForgotUser, ForgotUser }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(''); 

  const handleVerify = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Enter a valid email address.');
      return;
    }

    try {
      const response = await verifyUsername(email);
      console.log('Success:', response);
      setError(''); 
    } catch (error) {
      console.error('Error:', error);
      setError('User does not exist'); 
    }
  };

  return (
    <>
      <button className="backButton" onClick={() => setForgotUser(false)}>
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
        <h1>Recover your username</h1>
        <p>
          Tell us the email address associated with your Curio account,
          <br /> and we’ll send you an email with your username.
        </p>
        <div className="myForm">
          <div className="loginInput">
            <input
              type="text"
              placeholder="Email *"
              required
              onChange={(e) => setEmail(e.target.value)} 
            />
            {error && <div className="loginError">{error}</div>}
          </div>
          <p>
            Don't have an email or need assistance logging in?{' '}
            <a href="https://support.reddithelp.com/hc/en-us/sections/360008917491-Account-Security">
              Get Help
            </a>
          </p>
          <SignupHandlerForLogin /> <a href="Login">• Log In</a>
        </div>
      </div>
      <div className="submit">
        <button type="submit" className="login_buttons" onClick={handleVerify}>
          Email Me
        </button>
      </div>
    </>
  );
}

export default ForgotUser;
