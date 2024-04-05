import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import BackButton from '../../styles/icons/BackButton';
import generateRandomUsername from './GenerateUsername';
import Shuffle from '../../styles/icons/Shuffle';
import {checkUsernameAvailability} from './SignupEndpoints.js';

function UsernameInfo(props) {


  const [username, setUsername] = useState(props.enteredUsername || generateRandomUsername());
  const [password, setPassword] = useState(props.enteredPassword || '');
  const [isUsernameValid, setIsUsernameValid] = useState(0);
  const [isPasswordValid, setIsPasswordValid] = useState(0);
  const [usernameErrorMsg, setUsernameErrorMsg] = useState('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');

  const handleBackButton = () => {
    props.onEnteredUsername(username);
    props.onEnteredPassword(password);
    props.onBack();
  }

  const handlePassword = (e) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const password = e.target.value;
    if (password === ""){
      setPasswordErrorMsg("Please fill out this field.");
      setIsPasswordValid(1);
      return;
    }
    if (password.length < 8){
      setPasswordErrorMsg(`Please lengthen this text to 8 characters or more (you are currently using ${password.length} characters).`);
      setIsPasswordValid(1);
      return;
    }
    if (!passwordRegex.test(password)){
      setPasswordErrorMsg("Password must contain at least one letter and one number.");
      setIsPasswordValid(1);
      return;
    }
    setPassword(password);
    setPasswordErrorMsg("");
    setIsPasswordValid(2);
  }

  const handleUsername = async (e) => {
    const username = e.target.value;
    if (username === ""){
      setUsernameErrorMsg("Please fill out this field.");
      setIsUsernameValid(1);
      return;
    }
    if (username.length < 3){
      setUsernameErrorMsg(`Please lengthen this text to 3 characters or more (you are currently using ${username.length} characters).`);
      setIsUsernameValid(1);
      return;
    }
    const usernameAvailability = await checkUsernameAvailability(username);
    if (usernameAvailability.status === 409){
      setUsernameErrorMsg("That username is already taken");
      setIsUsernameValid(1);
      return;
    }
    setUsername(username);
    setUsernameErrorMsg("Nice! Username Available");
    setIsUsernameValid(2);
  }

  const handleShuffle = () => {
    setUsername(generateRandomUsername());
  }

  const handleContinue = async () => {
    if(username === '' || password === '' || username.length < 3 || password.length < 8){
      return;
    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)){
      setPasswordErrorMsg("Password must contain at least one letter and one number.");
      setIsPasswordValid(1);
      return;
    }
    const usernameAvailability = await checkUsernameAvailability(username);
    if (usernameAvailability.status === 409){
      setUsernameErrorMsg("That username is already taken");
      setIsUsernameValid(1);
      return;
    }
    props.onEnteredUsername(username);
    props.onEnteredPassword(password);
    props.onContinueToGender();
  }




  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      contentClassName='signup-modal'
    >
      <Modal.Header className='border-0 pt-3'>
        <Modal.Title id="contained-modal-title-vcenter" className='p-3'>
          <button onClick={handleBackButton} className='signup-back-button me-auto d-flex justify-content-center align-items-center'><BackButton /></button>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='pt-0 d-flex flex-column'>
        <div className="pt-0" style={{paddingLeft: '80px', paddingRight: '80px'}}>
          <h1 className='signup-header'>Create your username and password</h1>
          <p className='username-alert'>
            Reddit is anonymous, so your username is what you’ll go by here. Choose wisely—because once you get a name, you can’t change it.
          </p>
        </div>
        <div style={{paddingLeft: '80px', paddingRight: '80px', position: 'relative'}}>
          <div className='d-flex flex-column align-items-start mt-4' style={{position: 'relative'}}>
            <div className='d-flex flex-column position-relative w-100'>
              <input data-testid="username" value={username} onChange={(e) => setUsername(e.target.value)} onBlur={handleUsername} id="floatingInput" className='form-control signup-email-input w-100' type='text' placeholder=' ' />
              <label htmlFor="floatingInput" className="position-absolute h-100 d-flex align-items-center ms-4 my-floating">Username<span style={{color: '#a50016'}}>*</span></label>
            </div>
              {isUsernameValid == 2 && (
                <span className="tick-icon position-absolute top-50 end-0 custom-translate-username-field">
                  <svg rpl="" className="trailing-icon valid" fill="#0e8a00" height="20" icon-name="checkmark-fill" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 15.958a1.102 1.102 0 0 1-.778-.322l-5.429-5.429 1.414-1.414L7.5 13.586 17.793 3.293l1.414 1.414L8.278 15.636a1.101 1.101 0 0 1-.778.322Z"></path>
                  </svg>
                </span>
              )}
              {isUsernameValid == 1 && (
                <span className="tick-icon position-absolute top-50 end-0 py-1 custom-translate-username-field-error">
                  <svg rpl="" className="trailing-icon invalid" fill="#a50016" height="20" icon-name="error-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 20a10 10 0 1 1 10-10 10.011 10.011 0 0 1-10 10Zm0-18.75A8.75 8.75 0 1 0 18.75 10 8.76 8.76 0 0 0 10 1.25Zm-.533 13.716a1.077 1.077 0 0 1-.53-.92 1.058 1.058 0 0 1 .53-.919c.16-.096.343-.146.53-.144a1.056 1.056 0 0 1 .926.527 1.045 1.045 0 0 1 0 1.069c-.096.16-.23.293-.39.387a1.03 1.03 0 0 1-.536.143 1.016 1.016 0 0 1-.53-.143Zm-.14-3.329-.192-6.613h1.73l-.192 6.613H9.327Z">
                    </path>
                  </svg>
                </span>
              )}
              <span className="tick-icon position-absolute top-50 end-0 shuffle-button" onClick={handleShuffle}>
                <svg rpl="" fill="currentColor" height="20" icon-name="rotate-fill" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.2 15.376a1 1 0 0 1 0 1.25l-2.4 2.999a1 1 0 0 1-1.112.318 1 1 0 0 1-.673-.943v-2H7.8A5.8 5.8 0 0 1 2 11.206V9.001h2v2.205a3.8 3.8 0 0 0 3.8 3.795h2.22v-2a1 1 0 0 1 1.781-.625l2.399 3ZM12.205 3.002h-2.22v-2A1 1 0 0 0 8.2.38l-2.4 3a1 1 0 0 0 0 1.25l2.4 3a1 1 0 0 0 1.116.315 1 1 0 0 0 .669-.943v-2h2.22A3.8 3.8 0 0 1 16 8.802v2.2h2v-2.2a5.8 5.8 0 0 0-5.795-5.8Z"></path>
                </svg>
              </span>
          </div>
          <div className='mb-3'>
            <span className='p-2 py-2' style={{color: isUsernameValid===1 ? "#a50016" : "#0e8a00", fontSize: "0.875rem"}}>{usernameErrorMsg}</span>
          </div>
          <div className='d-flex flex-column align-items-start mt-4' style={{position: 'relative'}}>
            <div className='d-flex flex-column position-relative w-100'>
              <input data-testid="password" className='form-control signup-email-input w-100 my-input' value={password} onChange={(e) => setPassword(e.target.value)} onBlur={handlePassword} type='password' placeholder=' ' style={{border: isPasswordValid===1 ? "2px solid #a50016" : "", paddingLeft: '20px', borderRadius: '30px'}} />
              <label htmlFor="floatingInput" className="position-absolute h-100 d-flex align-items-center ms-4 my-floating">Password<span style={{color: '#a50016'}}>*</span></label>
            </div>
              {isPasswordValid == 2 && (
                <span className="tick-icon position-absolute top-50 end-0 custom-translate-username-modal">
                  <svg rpl="" className="trailing-icon valid" fill="#0e8a00" height="20" icon-name="checkmark-fill" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 15.958a1.102 1.102 0 0 1-.778-.322l-5.429-5.429 1.414-1.414L7.5 13.586 17.793 3.293l1.414 1.414L8.278 15.636a1.101 1.101 0 0 1-.778.322Z"></path>
                  </svg>
                </span>
              )}
              {isPasswordValid == 1 && (
                <span className="tick-icon position-absolute top-50 end-0 py-1 custom-translate-username-modal-error">
                  <svg rpl="" className="trailing-icon invalid" fill="#a50016" height="20" icon-name="error-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 20a10 10 0 1 1 10-10 10.011 10.011 0 0 1-10 10Zm0-18.75A8.75 8.75 0 1 0 18.75 10 8.76 8.76 0 0 0 10 1.25Zm-.533 13.716a1.077 1.077 0 0 1-.53-.92 1.058 1.058 0 0 1 .53-.919c.16-.096.343-.146.53-.144a1.056 1.056 0 0 1 .926.527 1.045 1.045 0 0 1 0 1.069c-.096.16-.23.293-.39.387a1.03 1.03 0 0 1-.536.143 1.016 1.016 0 0 1-.53-.143Zm-.14-3.329-.192-6.613h1.73l-.192 6.613H9.327Z">
                    </path>
                  </svg>
                </span>
              )}
          </div>
        </div>
          <div className='mb-3' style={{paddingLeft: '80px', paddingRight: '80px'}}>
            <span className='p-2 py-2' style={{color: isPasswordValid===1 ? "#a50016" : "#0e8a00", fontSize: "0.875rem"}}>{passwordErrorMsg}</span>
          </div>
      </Modal.Body>
      <Modal.Footer className='border-0 pb-4' style={{paddingLeft: '80px', paddingRight: '80px'}}>
        <Button disabled={isUsernameValid === 1 || isPasswordValid === 1} className = {(isUsernameValid===1 || isPasswordValid===1) ? "continue-button-disabled w-100" : "w-100 continue-button"} onClick={handleContinue}>Continue</Button>
      </Modal.Footer>
    </Modal>
  );
}



export default UsernameInfo;