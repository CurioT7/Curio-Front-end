import React from "react";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CloseButton from '../../styles/icons/CloseButton.jsx';
import ReportIcon from "../../styles/icons/ReportIcon.jsx";
import axios from "axios";
import './ReportModals.css';
import { useToast } from '@chakra-ui/react'

function ReportReason(props) {
  const toast = useToast();
  const [reportReason, setReportReason] = useState('');
  const handleReportReason = (e) => {
    setReportReason(e.target.textContent);
  }
  const handleReportSubmit = async (e) => {
    if (e.target.textContent === "Submit Report") {
      try{
          var hostUrl = import.meta.env.VITE_SERVER_HOST;
          const response = await axios.post(`${hostUrl}/api/report`, {
            reportReason: reportReason.toLowerCase(),
            reportType: props.reportType,
            itemID: props.postId
          },
           {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          if (response.status === 200 || response.status === 201){
            toast({
              description: "Report Submitted",
              status: 'success',
              duration: 5000,
              isClosable: true,
              backgroundColor: '#EB001F',
            })
            props.showSubmittedReport();
            props.onHide();
          }
          if (response.status === 400 || response.status === 404){
            toast({
              description: "Invalid reason chosen.",
              status: 'error',
              duration: 5000,
              isClosable: true,
              backgroundColor: '#EB001F',
            })
          }
        }
        catch(err){
          toast({
            description: "Server Error. Please try again later.",
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
          console.log(err);
        }
    }
    if (e.target.textContent === "Next") {
      props.setReportReason(reportReason);
      props.showExtraReasons();
      props.onHide();
    }
  }
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
          <div>
            <p className="report-reason-paragraph">Thanks for looking out for yourself and your fellow redditors by reporting things that break the rules. Let us know what's happening, and we'll look into it. </p>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column pt-0">
          <div className="mb-2">
            <button onClick={handleReportReason} className="report-reason-buttons p-2">r/germany rules</button>
          </div>
          <div className="d-flex justify-content-start mb-2">
            <button onClick={handleReportReason} style={{backgroundColor: (reportReason === "Harassment") ? "#D2DADD" : ""}} className="report-reason-buttons me-2">Harassment</button>
            <button onClick={handleReportReason} style={{backgroundColor: (reportReason === "Threatening violence") ? "#D2DADD" : ""}} className="report-reason-buttons me-2">Threatening violence</button>
            <button onClick={handleReportReason} style={{backgroundColor: (reportReason === "Hate") ? "#D2DADD" : ""}} className="report-reason-buttons me-2">Hate</button>
          </div>
          <div className="d-flex justify-content-start mb-2">
            <button onClick={handleReportReason} style={{backgroundColor: (reportReason === "Minor abuse or sexualization") ? "#D2DADD" : ""}} className="report-reason-buttons me-2">Minor abuse or sexualization</button>
            <button onClick={handleReportReason} style={{backgroundColor: (reportReason === "Sharing personal information") ? "#D2DADD" : ""}} className="report-reason-buttons me-2">Sharing personal information</button>
          </div>
          <div className="d-flex justify-content-start mb-2">
            <button onClick={handleReportReason} className="report-reason-buttons me-2" style={{backgroundColor: (reportReason === "Non-consensual intimate media") ? "#D2DADD" : ""}}>Non-consensual intimate media</button>
            <button onClick={handleReportReason} className="report-reason-buttons me-2" style={{backgroundColor: (reportReason === "Prohibited transaction") ? "#D2DADD" : ""}}>Prohibited transaction</button>
          </div>
          <div className="d-flex justify-content-start mb-2">
            <button onClick={handleReportReason} style={{backgroundColor: (reportReason === "Impersonation") ? "#D2DADD" : ""}} className="report-reason-buttons me-2">Impersonation</button>
            <button onClick={handleReportReason} style={{backgroundColor: (reportReason === "Copyright violation") ? "#D2DADD" : ""}} className="report-reason-buttons me-2">Copyright violation</button>
            <button onClick={handleReportReason} style={{backgroundColor: (reportReason === "Trademark violation") ? "#D2DADD" : ""}} className="report-reason-buttons me-2">Trademark violation</button>
          </div>
          <div className="d-flex justify-content-start mb-2">
            <button onClick={handleReportReason} style={{backgroundColor: (reportReason === "Self-harm or suicide") ? "#D2DADD" : ""}} className="report-reason-buttons me-2">Self-harm or suicide</button>
            <button onClick={handleReportReason} style={{backgroundColor: (reportReason === "Spam") ? "#D2DADD" : ""}} className="report-reason-buttons me-2">Spam</button>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="d-flex flex-column border-0">
        <div className="d-flex alert-div pb-0">
          <ReportIcon />
           <p className="ms-2 report-alert-msg">Not sure if something is breaking the rules? Review Reddit's Content Policy & r/germany rules</p>
        </div>
        <div className="d-flex w-100">
          <div className="d-flex flex-column col-md-9">
            <h2 style={{fontSize: "1rem"}} className="submit-a-report-header">{reportReason}</h2>
            {reportReason === "Harassment" && <p className="report-reason-paragraph">Harassing, bullying, intimidating, or abusing an individual or group of people with the result of discouraging them from participating.</p>}
            {reportReason === "Threatening violence" && <p className="report-reason-paragraph">Encouraging, glorifying, or inciting violence or physical harm against individuals or groups of people, places, or animals.</p>}
            {reportReason === "Hate" && <p className="report-reason-paragraph">Promoting hate based on identity or vulnerability.</p>}
            {reportReason === "Minor abuse or sexualization" && <p className="report-reason-paragraph">Sharing or soliciting content involving abuse, neglect, or sexualization of minors or any predatory or inappropriate behavior towards minors.</p>}
            {reportReason === "Sharing personal information" && <p className="report-reason-paragraph">Sharing or threatening to share private, personal, or confidential information about someone.</p>}
            {reportReason === "Non-consensual intimate media" && <p className="report-reason-paragraph">Sharing, threatening to share, or soliciting intimate or sexually-explicit content of someone without their consent (including fake or "lookalike" pornography).</p>}
            {reportReason === "Prohibited transaction" && <p className="report-reason-paragraph">Soliciting or facilitating transactions or gifts of illegal or prohibited goods and services.</p>}
            {reportReason === "Impersonation" && <p className="report-reason-paragraph">Impersonating an individual or entity in a misleading or deceptive way. This includes deepfakes, manipulated content, or false attributions.</p>}
            {reportReason === "Copyright violation" && <p className="report-reason-paragraph">Content posted to Reddit that infringes a copyright you own or control. (Note: Only the copyright owner or an authorized representative can submit a report.)</p>}
            {reportReason === "Trademark violation" && <p className="report-reason-paragraph">Content posted to Reddit that infringes a trademark you own or control. (Note: Only the trademark owner or an authorized representative can submit a report.)</p>}
            {reportReason === "Self-harm or suicide" && <p className="report-reason-paragraph">Behavior or comments that make you think someone may be considering suicide or seriously hurting themselves.</p>}
            {reportReason === "Spam" && <p className="report-reason-paragraph">Repeated, unwanted, or unsolicited manual or automated actions that negatively affect redditors, communities, and the Reddit platform.</p>}
          </div>
          <div className="ms-auto d-flex align-items-end">
            <button
             onClick={handleReportSubmit}
             className={`${(reportReason === "") ? "ms-auto report-reason-next-button" : "report-reason-next-button-enabled"}`}
            >
              {((reportReason === "Harassment"
                 || reportReason === "Threatening violence"
                 || reportReason === "Minor abuse or sexualization" 
                 || reportReason === "Sharing personal information"
                 || reportReason === "Non-consensual intimate media"
                 || reportReason === "Impersonation"
                 || reportReason === "Copyright violation"
                 || reportReason === "Trademark violation"
                 || reportReason === "Self-harm or suicide"
                 || reportReason === "Spam")) ? "Next" : ((reportReason !== "") ? "Submit Report" : "Next")}</button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default ReportReason;