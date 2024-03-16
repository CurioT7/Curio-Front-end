import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ReportPopup.css';


function ReportPopup(props) {
  const [selectedOption, setSelectedOption] = useState(null)
  const [showSecondModal, setShowSecondModal] = useState(false)
  const [reportReason, setReportReason] = useState('')
  const [description, setDescription] = useState('')


  const handleDescriptionChange = (desc) => {
    setDescription(desc)
  };

  const handleRadioChange = (event) => {
      setSelectedOption(event.target.value)
  };

  const handleNextClick = () => {
      props.onHide()
      setShowSecondModal(true)
  };

  const handleOptionClick = (reason) => {
    if (reportReason === reason) {
      setReportReason('')
    } else {
      setReportReason(reason)
    }
  };

  return (
      <>
          <Modal
              {...props}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
          >
              <Modal.Header closeButton>
                  <h6 className='header-text'>Submit a report</h6>
              </Modal.Header>
              <Modal.Body>
                  <p className='body-text'>
                      What do you want to report?
                  </p>
                  <div className='radio-container'>
                      <input
                          type="radio"
                          name="reportType"
                          value="username"
                          className='input'
                          onChange={handleRadioChange}
                      />
                      Username
                  </div>
                  <div className='radio-container'>
                      <input
                          type="radio"
                          name="reportType"
                          value="avatar"
                          className='input'
                          onChange={handleRadioChange}
                      />
                      Avatar/profile image
                  </div>
              </Modal.Body>
              <Modal.Footer>
                  <Button onClick={handleNextClick} disabled={!selectedOption}>Next</Button>
              </Modal.Footer>
          </Modal>
          {showSecondModal && (
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={showSecondModal}
          onHide={() => setShowSecondModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter" className='header-text'>Submit a report</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className='body-text'>What rule is this breaking?</p>
            <div className="flex-container">
              <button
                className={`option-button ${reportReason === 'Harassment' ? 'selected' : ''}`}
                onClick={() => { handleOptionClick('Harassment'); handleDescriptionChange('Harassment'); }}
              >
                Harassment
              </button>
              <button
                className={`option-button ${reportReason === 'Threatening violence' ? 'selected' : ''}`}
                onClick={() => { handleOptionClick('Threatening violence'); handleDescriptionChange('Threatening violence'); }}
              >
                Threatening violence
              </button>
              <button
                className={`option-button ${reportReason === 'Hate' ? 'selected' : ''}`}
                onClick={() => { handleOptionClick('Hate'); handleDescriptionChange('Hate'); }}
              >
                Hate
              </button>
              <button
                className={`option-button ${reportReason === 'Minor abuse or sexualization' ? 'selected' : ''}`}
                onClick={() => { handleOptionClick('Minor abuse or sexualization'); handleDescriptionChange('Minor abuse or sexualization'); }}
              >
                Minor abuse or sexualization
              </button>
              <button
                className={`option-button ${reportReason === 'Sharing personal information' ? 'selected' : ''}`}
                onClick={() => { handleOptionClick('Sharing personal information'); handleDescriptionChange('Sharing personal information'); }}
              >
                Sharing personal information
              </button>
              <button
                className={`option-button ${reportReason === 'Non-consensual intimate media' ? 'selected' : ''}`}
                onClick={() => { handleOptionClick('Non-consensual intimate media'); handleDescriptionChange('Non-consensual intimate media'); }}
              >
                Non-consensual intimate media
              </button>
              <button
                className={`option-button ${reportReason === 'Prohibited transaction' ? 'selected' : ''}`}
                onClick={() => { handleOptionClick('Prohibited transaction'); handleDescriptionChange('Prohibited transaction'); }}
              >
                Prohibited transaction
              </button>
              <button
                className={`option-button ${reportReason === 'Impersonation' ? 'selected' : ''}`}
                onClick={() => { handleOptionClick('Impersonation'); handleDescriptionChange('Impersonation'); }}
              >
                Impersonation
              </button>
              <button
                className={`option-button ${reportReason === 'Copyright violation' ? 'selected' : ''}`}
                onClick={() => { handleOptionClick('Copyright violation'); handleDescriptionChange('Copyright violation'); }}
              >
                Copyright violation
              </button>
              <button
                className={`option-button ${reportReason === 'Trademark violation' ? 'selected' : ''}`}
                onClick={() => { handleOptionClick('Trademark violation'); handleDescriptionChange('Trademark violation'); }}
              >
                Trademark violation
              </button>
              <button
                className={`option-button ${reportReason === 'Self-harm or suicide' ? 'selected' : ''}`}
                onClick={() => { handleOptionClick('Self-harm or suicide'); handleDescriptionChange('Self-harm or suicide'); }}
              >
                Self-harm or suicide
              </button>
              <button
                className={`option-button ${reportReason === 'Spam' ? 'selected' : ''}`}
                onClick={() => { handleOptionClick('Spam'); handleDescriptionChange('Spam'); }}
              >
                Spam
              </button>
            </div>
          </Modal.Body>
          <Modal.Footer>
          <div className="flex-foot-container">
            <div className="description">
            {description && <p className='description-text'>{description}</p>}
            </div>
            <div className='submit-btn-container'>
            <Button onClick={() => setShowSecondModal(false)}>Submit</Button>
            </div>
          </div>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default ReportPopup;