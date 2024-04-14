import React, { useState, useRef, useEffect } from 'react';
import './Login.css';
import Google from '../../styles/icons/Google.jsx';
import './LoginEndpoints';
import { loginUser } from './LoginEndpoints'; 
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SignupHandlerForLogin from './SignupHandlerForLogin.jsx';
import { useToast } from '@chakra-ui/react';


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
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState(''); 
  const formRef = useRef();
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
    } else {
      setPasswordError('');
    }
  }, [username, password]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (usernameError || passwordError) {
      return;
    }

    try {
      const responseData = await loginUser(username, password);
      console.log('Correct Credentials');
      console.log(responseData);
      let access_token = responseData.accessToken;
      localStorage.setItem('token', access_token);
      window.dispatchEvent(new Event('loginOrSignup'));
      localStorage.setItem('username', username);
      navigate('/');
    } catch (error) {
      console.error('Failed to login:', error);
      setLoginError('Wrong credentials'); 
    }
  };

  const handleGoogleSigninResponse = async (response) => {
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
      navigate('/');
    }
  }

  const login = useGoogleLogin({
    onSuccess: codeResponse => handleGoogleSigninResponse(codeResponse),
  });

  return (

    <>
    
    <div className="loginBox">
      <div className="myForm">
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
            onClick={login}
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
        {loginError && <div className="loginError">{loginError}</div>}{' '}
        {passwordError && <div className="loginError">{passwordError}</div>}
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
        <div className="sign-up">
          <b>New to Reddit? </b>
          <SignupHandlerForLogin />
         </div>
      </div>
      <div className="submit">
        <button type="submit" className="login_buttons" onClick={handleSubmit} >
          Login
        </button>
      </div>
    </div>

      </>
  );
}

export default Login;
