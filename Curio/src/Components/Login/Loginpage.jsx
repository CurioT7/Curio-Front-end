import React, { useState } from "react";
import Modal from "react-modal";
import "./Login.css";
import "../ForgotUser/ForgotUser.jsx";
import ForgotUser from "../ForgotUser/ForgotUser.jsx";
import ForgotPass from "../ForgotPass/ForgotPass.jsx";
import ChangePass from "../ForgotPass/ChangePass.jsx";

import Login from "./Login.jsx";

Modal.setAppElement("#root");

function LoginPage() {
  const [forgotUser, setForgotUser] = useState(false);
  const [forgotPass, setForgotPass] = useState(false);
  const [changePass, setChangePass] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <Modal className="loginModal" isOpen={true} contentLabel="Login Modal">
        <div className="modalParent">
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
        </div>
      </Modal>
    </div>
  );
}

export default LoginPage;
