import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './Login.css';
import '../ForgotUser/ForgotUser.jsx';
import ForgotUser from '../ForgotUser/ForgotUser.jsx';
import ForgotPass from '../ForgotPass/ForgotPass.jsx';
import ChangePass from '../ForgotPass/ChangePass.jsx';
import Login from "./Login.jsx";

Modal.setAppElement('#root');

/**
 * Renders the login page component.
 *
 * @param {Object} props - The component props.
 *@module The rendered LoginPage component.
 */

function LoginPage(props) {
  const [forgotUser, setForgotUser] = useState(false);
  const [forgotPass, setForgotPass] = useState(false);
  const [changePass, setChangePass] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  
  useEffect(() => {
    props.hideSidebar();
    return () => {
      props.showSidebar();
    };
  }, []);

  return (
    <div>
      <Modal
        className="loginModal"
        isOpen={isOpen}
        contentLabel="Login Modal"
        onRequestClose={() => setIsOpen(false)}
      >
        {!forgotUser && !forgotPass && !changePass && (
          <Login
            forgotUser={forgotUser}
            setForgotUser={setForgotUser}
            forgotPass={forgotPass}
            setForgotPass={setForgotPass}
            changePass={changePass}
            setChangePass={setChangePass}
          />
        )}

        {forgotUser && !forgotPass && !changePass && (
          <ForgotUser forgotUser={forgotUser} setForgotUser={setForgotUser} />
        )}
        {forgotPass && !forgotUser && !changePass && (
          <ForgotPass
            setForgotPass={setForgotPass}
            forgotPass={forgotPass}
            setChangePass={setChangePass}
          />
        )}
        {changePass && !forgotUser && !forgotPass && (
          <ChangePass changePass={changePass} setChangePass={setChangePass} />
        )}
      </Modal>
    </div>
  );
}

export default LoginPage;
