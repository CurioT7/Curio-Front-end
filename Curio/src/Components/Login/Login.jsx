import React, { useState } from 'react';
import Modal from 'react-modal';
import './Login.css';

Modal.setAppElement('#root'); 

function Login() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>Login</button>

      <Modal 
        className="loginModal"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Login Modal"
      >
        <div className="loginBox">
          <form action=" ">
            <h2>Login</h2>
            <div className='loginInput'> 
              <input type="text" placeholder='Username *' required />
            </div>
            <div className='loginInput'>
              <input type="password" placeholder='Password *' required />
            </div>
            <div className='forgot'>
              <b>Forgot your </b><a href="/forgotuser">username</a> <b>or</b> <a href="#">password</a>
            </div>

            <div className='sign-up'>
              <b>New to Reddit? </b><a href="#">Sign up</a>
            </div>
            
            <button type="submit">Login</button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Login;