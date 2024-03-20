import React, { useState, useRef } from 'react';
import './Login.css';
import Google from '../../styles/icons/Google.jsx';
import './LoginEndpoints';
import { loginUser, getGoogleToken } from './LoginEndpoints'; // Import the missing 'loginUser' function

function Login({
  forgotUser,
  setForgotUser,
  forgotPass,
  setForgotPass,
  isOpen,
  setIsOpen,
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const formRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const responseData = await loginUser(username, password);
      console.log('Correct Credentials');
      console.log(responseData);
      // TODO: redirect to home page, integrate with yehya
      // TODO: store access token in local storage done
      let access_token = responseData.accessToken;
      localStorage.setItem('access_token', access_token);
      // setIsOpen(false);
    } catch (error) {
      console.error('Failed to login:', error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const token = await getGoogleToken();
      // Use the token here. For example, you can store it in the state or in a cookie.
      console.log('Google token:', token);
    } catch (error) {
      console.error('Failed to login with Google:', error);
    }
  };

  return (
    <div className="modalParent">
      <div className="loginBox">
        <form action="" onSubmit={handleSubmit} ref={formRef}>
          <h1>Log In</h1>
          <p>
            By continuing, you agree to our
            <a href="https://www.redditinc.com/policies/user-agreement">
              {' '}
              User Agreement{' '}
            </a>
            and <br />
            acknowledge that you understand the
            <a href="https://www.reddit.com/policies/privacy-policy">
              {' '}
              Privacy Policy.
            </a>
          </p>

          <div>
            <button
              className="continue-with-google p-2 d-flex justify-content-between align-items-center align-content-center"
              type="button"
              onClick={handleGoogleLogin}
            >
              <div className="logintext">Continue with Google</div>
              <div className="loginGoogle">
                <Google />
              </div>
            </button>
          </div>

          <h6 className="or">
            <hr />
            OR
            <hr />
          </h6>
          <div className="loginInput">
            <input
              type="text"
              placeholder="Username *"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="loginInput">
            <input
              type="password"
              placeholder="Password *"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="forgot">
            <b>Forgot your </b>
            <a href="#" onClick={() => setForgotUser(true)}>
              username{' '}
            </a>
            <b>or</b>
            <a href="#" onClick={() => setForgotPass(true)}>
              {' '}
              password
            </a>
            <b>?</b>
          </div>
          {/* TODO: integrate with yehya */}
          <div className="sign-up">
            <b>New to Reddit? </b>
            <a href="#">Sign up</a>
          </div>
          <div className="submit">
            <button
              type="submit"
              className="login_buttons"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
