import React from "react";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CloseButton from '../../styles/icons/CloseButton.jsx';
import ReportIcon from "../../styles/icons/ReportIcon.jsx";
import axios from "axios";
import './ReportModals.css';
import BackButton from "../../styles/icons/BackButton.jsx";
import { useToast } from '@chakra-ui/react'

function ReportExtraReason(props){
    const toast = useToast();
    const [reportExtraReason, setReportExtraReason] = useState('');
    const handleBackButton = () => {
        props.backToReasonModal();
        props.onHide();
    }
    const handleUpdateExtraReason = (e) => {
        setReportExtraReason(e);
    }
    const handleSubmitReport = async () => {
        props.showSubmittedFinalReport();
        props.onHide();
        try{
          var hostUrl = import.meta.env.VITE_SERVER_HOST;
          const response = await axios.post(`${hostUrl}/api/report`, {
            reportReason: props.reportReason.toLowerCase(),
            reportExtraReason: reportExtraReason,
            reportType: "post",
            itemID: props.postId
          },
           {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          if (response.status === 200 || response.status === 201){
            toast({
              description: "Report Submitted Successfully",
              status: 'success',
              duration: 5000,
              isClosable: true,
              backgroundColor: '#EB001F',
            })
            props.showSubmittedFinalReport();
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
            <div className="d-flex justify-content-start">
              <button onClick={handleBackButton} className='me-2 signup-back-button me-auto d-flex justify-content-center align-items-center'><BackButton /></button>
              <h2 className="d-flex align-items-center submit-a-report-header">Submit a Report</h2>
            </div>
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
                {props.reportReason === "Non-consensual intimate media" && <h2 style={{fontWeight: 400}} className="submit-a-report-header">Who is the non-consensual intimate media of?</h2>}
                {props.reportReason === "Impersonation" && <h2 style={{fontWeight: 400}} className="submit-a-report-header">Who is being impersonated?</h2>}
                {props.reportReason === "Copyright violation" && <h2 style={{fontWeight: 400}} className="submit-a-report-header">Whose copyright is it?</h2>}
                {props.reportReason === "Trademark violation" && <h2 style={{fontWeight: 400}} className="submit-a-report-header">Whose trademark is it?</h2>}
                {props.reportReason === "Spam" && <h2 style={{fontWeight: 400}} className="submit-a-report-header">What type of spam is this?</h2>}
                {props.reportReason === "Self-harm or suicide" && <h2 style={{fontWeight: 400}} className="submit-a-report-header">Who is the self harm referring to?</h2>}
            </div>
            <div className="mb-5">
                {(props.reportReason === "Harassment"
                   || props.reportReason === "Threatening violence"
                   || props.reportReason === "Sharing personal information"
                   || props.reportReason === "Non-consensual intimate media"
                    || props.reportReason === "Impersonation"
                     || props.reportReason === "Copyright violation"
                     || props.reportReason === "Trademark violation" || props.reportReason === "Self-harm or suicide" ) && (
                  <div>
                    <input type="radio" checked={reportExtraReason === "You"} onChange={(e) => handleUpdateExtraReason(e.target.value)} name="reportTarget" value="You" /> You<br />
                    <input type="radio" checked={reportExtraReason === "Someone else"} onChange={(e) => handleUpdateExtraReason(e.target.value)} name="reportTarget" value="Someone else" /> Someone else<br />
                  </div>
                )}
                {props.reportReason === "Minor abuse or sexualization" && (
                  <div>
                    <input type="radio" checked={reportExtraReason === "Sexual or suggestive content"} onChange={(e) => handleUpdateExtraReason(e.target.value)} name="reportTarget2" value="Sexual or suggestive content" /> Sexual or suggestive content<br />
                    <input type="radio" checked={reportExtraReason === "Predatory or inappropriate behavior"} onChange={(e) => handleUpdateExtraReason(e.target.value)} name="reportTarget2" value="Predatory or inappropriate behavior" /> Predatory or inappropriate behavior<br />
                    <input type="radio" checked={reportExtraReason === "Content involving physical or emotional abuse or neglect"} onChange={(e) => handleUpdateExtraReason(e.target.value)} name="reportTarget2" value="Content involving physical or emotional abuse or neglect" /> Content involving physical or emotional abuse or neglect<br />
                  </div>
                )}
                {props.reportReason === "Spam" && (
                  <div>
                    <input type="radio" checked={reportExtraReason === "Link farming"} onChange={(e) => handleUpdateExtraReason(e.target.value)} name="reportTarget3" value="Link farming" /> Link farming<br />
                    <input type="radio" checked={reportExtraReason === "Unsolicited messaging"} onChange={(e) => handleUpdateExtraReason(e.target.value)} name="reportTarget3" value="Unsolicited messaging" /> Unsolicited messaging<br />
                    <input type="radio" checked={reportExtraReason === "Excessive posts or comments in a community"} onChange={(e) => handleUpdateExtraReason(e.target.value)} name="reportTarget3" value="Excessive posts or comments in a community" /> Excessive posts or comments in a community<br />
                    <input type="radio" checked={reportExtraReason === "Posting harmful links (malware)"} onChange={(e) => handleUpdateExtraReason(e.target.value)} name="reportTarget3" value="Posting harmful links (malware)" /> Posting harmful links (malware)<br />
                    <input type="radio" checked={reportExtraReason === "Other"} onChange={(e) => handleUpdateExtraReason(e.target.value)} name="reportTarget3" value="Other" /> Other<br />

                  </div>
                )}
            </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="d-flex flex-column border-0 mt-5">
        <div className="d-flex w-100 d-flex flex-column">
          <div className="ms-auto">
            <button
             className={`${(reportExtraReason === "") ? "ms-auto report-reason-next-button" : "report-reason-next-button-enabled"}`}
              onClick={handleSubmitReport}
            >Submit</button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
    );
}

export default ReportExtraReason;