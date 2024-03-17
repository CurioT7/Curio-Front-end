import React, { useState } from 'react';
import Modal from 'react-modal';
import './Login.css';
import '../ForgotUser/ForgotUser.jsx';
import ForgotUser from '../ForgotUser/ForgotUser.jsx';
import ForgotPass from '../ForgotPass/ForgotPass.jsx';
import Google from '../../styles/icons/Google.jsx';
import CloseButton from '../../styles/icons/CloseButton.jsx';
import ModalBody from 'react-bootstrap/esm/ModalBody.js';



Modal.setAppElement('#root');

function Login() {
  const [forgotUser, setForgotUser] = useState(false);
  const [forgotPass, setForgotPass] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen= false;
  };

  return (
    <div>
      <Modal className="loginModal" isOpen={true} contentLabel="Login Modal"  >
      {/* <Modal.Header className='border-0'>
      <div>
        <button onClick={handleClose}>  <CloseButton /> </button>  
      </div>     
        </Modal.Header> */}

        <div className="modalParent">
          {!forgotUser && !forgotPass && (
            <div className="modalParent">
              <div className="loginBox">
                <form action="">
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
            <button className='continue-with-google p-3 d-flex justify-content-between align-items-center align-content-center' >
                Continue with Google
                <div className="loginGoogle">
                <Google />
                </div>
            </button>
        </div>

                  <div className="loginInput">
                    <input type="text" placeholder="Username *" required />
                  </div>
                  <div className="loginInput">
                    <input type="password" placeholder="Password *" required />
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
                <button type="submit" className="login_buttons">
                  Login
                </button>
              </div>
            </div>
          )}

          {forgotUser && <ForgotUser />}
          {forgotPass && <ForgotPass />}
        </div>
      </Modal>
    </div>
  );
}

export default Login;
