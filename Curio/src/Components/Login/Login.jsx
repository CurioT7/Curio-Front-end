import React, { useState } from 'react';
import './Login.css';
import './Login.jsx';
import Google from '../../styles/icons/Google.jsx';
import  './LoginEndpoints';


function Login({ forgotUser, setForgotUser, forgotPass, setForgotPass }){
  

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const responseData = await loginUser(username, password);
      console.log('Correct Credentials');
    } catch (error) {
      console.error('Failed to login:', error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await verifyUsername(email);
      console.log('Success:', response);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const handleClose = () => {
    setIsOpen= false;
  };
    return (
      <div className="modalParent">
      <div className="loginBox">
        <form action=""  form onSubmit={handleSubmit}>
          <h1>Log In</h1>
          <p>
            By continuing, you agree to our{' '}
            <a href="https://www.redditinc.com/policies/user-agreement">
              User Agreement
            </a>{' '}
            and <br />
            acknowledge that you understand the{' '}
            <a href="https://www.reddit.com/policies/privacy-policy">
              {' '}
              Privacy Policy{' '}
            </a>
          </p>

          <div >
    <button className='continue-with-google p-2 d-flex justify-content-between align-items-center align-content-center' >
       <div className="logintext">
       Continue with Google

       </div>
        <div className="loginGoogle">
        <Google />
        </div>
    </button>
</div>

<h6 className='or'>
  <hr />
     OR  
    <hr />
</h6>            
          <div className="loginInput">
            <input type="text" placeholder="Username *" required  onChange={(e) => setUsername(e.target.value)}/>
          </div>
          <div className="loginInput">
            <input type="password" placeholder="Password *" required  onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className="forgot">
            <b>Forgot your </b>
            <a href="#" onClick={() => setForgotUser(true)}>
              username
            </a>{' '}
            <b>or</b>{' '}
            <a href="#" onClick={() => setForgotPass(true)}>
              password
            </a>
            <b>?</b>
          </div>

          <div className="sign-up">
            <b>New to Reddit? </b>
            <a href="#">Sign up</a>
          </div>
        </form>
      </div>
      <div className="submit">
        <button type="submit" className="login_buttons" onClick={handleLogin} >
          Login
        </button>
      </div>
    </div>
   );
}

export default Login;