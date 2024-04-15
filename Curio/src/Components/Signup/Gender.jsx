import React from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

function Gender(props){
  
  const [gender, setGender] = useState(0);

  const handleGender = (e) => {
    const gender = e.target.value;
    setGender(gender);
    props.onContinueToPreferences();
  }

  const handleSkipButton = () => {
    props.onContinueToPreferences();
  }


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      contentClassName='signup-modal'
    >
      <Modal.Header className='border-0 pt-3 w-100'>
        <Modal.Title id="contained-modal-title-vcenter" className='p-3 w-100'>
          <button onClick={handleSkipButton} className='skip-button btn border-0 ms-auto d-flex'>Skip</button>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='pt-0 d-flex flex-column'>
        <div className="pt-0 mb-4" style={{paddingLeft: '80px', paddingRight: '80px'}}>
          <h1 className='signup-header'>About you</h1>
          <p className='username-alert'>
            Tell us about yourself to start building your home feed.
          </p>
        </div>
        <div className="d-flex flex-column align-items-center align-content-center justify-content-center mt-4" style={{paddingLeft: '80px', paddingRight: '80px'}}>
            <p className="identify-text">How do you identify?</p>
            <button className="btn w-100 mb-2 gender-button p-3" onClick={handleGender}>Woman</button>
            <button className="btn w-100 mb-2 gender-button p-3" onClick={handleGender}>Man</button>
            <button className="btn w-100 mb-2 gender-button p-3" onClick={handleGender}>Non-binary</button>
            <button className="btn w-100 mb-2 gender-button p-3" onClick={handleGender}>I prefer not to say</button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
export default Gender;