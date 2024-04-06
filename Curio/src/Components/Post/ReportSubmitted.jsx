import React from "react";
import { useState } from "react";

function ReportSubmitted(props) {
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
            <h2 className="submit-a-report-header">Report Submitted</h2>
            <button className='signup-close-button ms-auto d-flex justify-content-center align-items-center' onClick={props.onHide}><CloseButton /></button>
          </div>
          <div>
            <p style={{fontWeight: 500}} className="report-reason-paragraph">Thanks for your report. </p>
          </div>
          <div>
            <p className="report-reason-paragraph">Thanks for looking out for yourself and your fellow redditors by reporting things that break the rules. Let us know what's happening, and we'll look into it. </p>
          </div>jk
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer className="d-flex flex-column border-0">
        <div className="d-flex w-100">
          <div className="d-flex flex-column col-md-9">
            <h2 style={{fontSize: "1rem"}} className="submit-a-report-header">Block ancient_gate_007</h2>
          </div>
          <div className="ms-auto d-flex">
            <button
             onClick={handleReportSubmit}
             className="report-reason-next-button-enabled"
            >Done</button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
export default ReportSubmitted;