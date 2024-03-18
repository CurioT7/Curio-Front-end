import React, { useState } from 'react';
import Modal from 'react-modal';
import './Login.css';
import '../ForgotUser/ForgotUser.jsx';
import ForgotUser from '../ForgotUser/ForgotUser.jsx';
import ForgotPass from '../ForgotPass/ForgotPass.jsx';

import Login from './Login.jsx';



Modal.setAppElement('#root');

function LoginPage() {

  const [forgotUser, setForgotUser] = useState(false);
  const [forgotPass, setForgotPass] = useState(false);
  const [isOpen, setIsOpen] = useState(true);


  return (
    <div>
      <Modal className="loginModal" isOpen={true} contentLabel="Login Modal"  >
      

        <div className="modalParent">
          {!forgotUser && !forgotPass && 
          <Login  forgotUser={forgotUser} 
          setForgotUser={setForgotUser} 
          forgotPass={forgotPass} 
          setForgotPass={setForgotPass}/>
          }

          {forgotUser && !forgotPass && <ForgotUser forgotUser={forgotUser} setForgotUser={setForgotUser} />}
          {forgotPass && !forgotUser && <ForgotPass forgotPass={forgotPass} setForgotPass={setForgotPass} />}
        </div>
      </Modal>
    </div>
  );
}

export default LoginPage;