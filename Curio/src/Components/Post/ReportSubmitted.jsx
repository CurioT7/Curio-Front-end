import React from "react";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CloseButton from '../../styles/icons/CloseButton.jsx';
import ReportIcon from "../../styles/icons/ReportIcon.jsx";
import axios from "axios";
import { useToast } from '@chakra-ui/react'
import './ReportModals.css';

function ReportSubmitted(props) {
  const toast = useToast();
  const handleBlock = async (event) => {
    const isChecked = event.target.checked;
    const hostUrl = import.meta.env.VITE_SERVER_HOST;
    if (isChecked) {
      try {
        const response = await axios.post(`${hostUrl}/api/User/block`, {
          usernameToBlock: props.username
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.status === 200) {
        }
        if (response.status === 403) {
          toast({
            description: "You can't block the user for 24 hours after unblocking them",
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        }
      }
      catch (err) {
        console.error(err);
        if (err.response.status === 403) {
          toast({
            description: "You can't block the user for 24 hours after unblocking them",
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        } else {
          toast({
              description: "Server Error. Please try again later.",
              status: 'error',
              duration: 5000,
              isClosable: true,
            })
        }
      }
    } else {
      try {
        const response = await axios.post(`${hostUrl}/api/User/unblock`, {
          usernameToUnblock: props.username
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.status === 200) {
          console.error('Unblocked');
        }
      }
      catch (err) {
        if (err.response.status === 409) {
          toast({
            description: "User already blocked.",
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        }
        else {
          toast({
              description: "Server Error. Please try again later.",
              status: 'error',
              duration: 5000,
              isClosable: true,
            })
        }
      }
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      contentClassName="report-div-modal"
      centered
    >
      <Modal.Header className="border-0 pb-0" style={{marginBottom: "10rem"}}>
        <Modal.Title className="d-flex flex-column w-100" id="contained-modal-title-vcenter">
          <div className="d-flex w-100">
            <h2 className="submit-a-report-header">Report Submitted</h2>
            <button className='signup-close-button ms-auto d-flex justify-content-center align-items-center' onClick={props.onHide}><CloseButton /></button>
          </div>
          <div>
            <p style={{fontWeight: 500}} className="report-reason-paragraph">Thanks for your report. </p>
          </div>
          <div>
            <p className="report-reason-paragraph">Thanks for looking out for yourself and your fellow redditors by reporting things that break the rules. Let us know what's happening, and we'll look into it. </p>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer className="d-flex flex-column border-0 mt-5">
        <div className="d-flex w-100 d-flex flex-column">
          <div className="d-flex w-100 mb-3">
            <h2 style={{fontSize: "1rem"}} className="submit-a-report-header d-flex align-items-center">Block {props.username}</h2>
            <div className='form-check form-switch d-flex align-items-center ms-auto'>
                <input style={{ transform: 'scale(1.5)' }} onChange={handleBlock} className='form-check-input ms-auto me-3' type="checkbox" id="mature" role="switch" name="mature" value="mature" />
            </div>
          </div>
          <div>
            <p className="block-warning-secondary">You won't be able to send direct messages or chat requests to each other.</p>
          </div>
          <div className="ms-auto">
            <button
             className="report-reason-next-button-enabled"
              onClick={props.onHide}
            >Done</button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
export default ReportSubmitted;