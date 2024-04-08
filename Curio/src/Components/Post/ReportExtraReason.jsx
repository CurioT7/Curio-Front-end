import React from "react";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CloseButton from '../../styles/icons/CloseButton.jsx';
import ReportIcon from "../../styles/icons/ReportIcon.jsx";
import axios from "axios";
import './ReportModals.css';

function ReportExtraReason(props){
    return (
        <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      contentClassName="report-div-modal"
      centered
    >
      <Modal.Header className="border-0 pb-0">
        <Modal.Title className="d-flex flex-column w-100" id="contained-modal-title-vcenter">
          <div className="d-flex w-100">
            <h2 className="submit-a-report-header">Submit a Report</h2>
            <button className='signup-close-button ms-auto d-flex justify-content-center align-items-center' onClick={props.onHide}><CloseButton /></button>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column pt-0">
            <div className="mb-2">
                {props.reportReason === "Harassment" && <h2 style={{fontWeight: 400}} className="submit-a-report-header">Who is the harassment towards?</h2>}
                {props.reportReason === "Threatening violence" && <h2 style={{fontWeight: 400}} className="submit-a-report-header">Who is the threat towards?</h2>}
                {props.reportReason === "Minor abuse or sexualization" && <h2 style={{fontWeight: 400}} className="submit-a-report-header">Who is the threat towards?</h2>}
                {props.reportReason === "Sharing personal information" && <h2 style={{fontWeight: 400}} className="submit-a-report-header">Who is sharing personal information?</h2>}
            </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="d-flex flex-column border-0 mt-5">
        <div className="d-flex w-100 d-flex flex-column">
          <div className="ms-auto">
            <button
             className="report-reason-next-button-enabled"
              onClick={props.onHide}
            >Submit</button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
    );
}

export default ReportExtraReason;