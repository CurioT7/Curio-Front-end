import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ExclamationMark from '../../styles/icons/ExclamationIcon';
import './ModalPages.css';
import Back from '../../styles/icons/Back'

const MultiPageFormModal = (props) => {
    const [step, setStep] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [reportReason, setReportReason] = useState('');
    const [description, setDescription] = useState('');
    const [explanation, setExplanation] = useState('');

    const handleDescriptionChange = (desc) => {
        setDescription(desc);
    };

    const handleExplanationChange = (exp) => {
        setExplanation(exp);
    };
    
    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleOptionClick = (reason, explanation) => {
        if (reportReason === reason) {
            setReportReason('');
            setExplanation('');
        } else {
            setReportReason(reason);
            setExplanation(explanation);
        }
    };
    
    const nextStep = () => {
        setStep(step + 1);
    };

    const twoSteps = () => {
        setStep(step + 2)
    }

    const prevStep = () => {
        setStep(step - 1);
    };


    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleModalOpen = () => {
        setShowModal(true);
    };


    return (
        <>
            <Modal {...props}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered>
                <Modal.Header closeButton>
                    {step === 1 && (
                        <Modal.Title>
                            <h6 className='header-text'>Submit a report</h6>
                        </Modal.Title>
                    )}
                    {step === 2 && (
                        <Modal.Title>
                            <div className='back-btn-container'>
                                <button onClick={prevStep} className='back-btn'>
                                    <div className='back-btn-content'><Back /></div>
                                </button>
                            </div>
                            <h6 className='header-text1'>Submit a report</h6>
                        </Modal.Title>
                    )}
                    {step === 3 && (
                        <Modal.Title>
                            <div className='back-btn-container'>
                                <button onClick={prevStep} className='back-btn'>
                                    <div className='back-btn-content'><Back /></div>
                                </button>
                            </div>
                            <h6 className='header-text1'>Submit a report</h6>
                        </Modal.Title>
                    )}
                    {step === 4 && (
                        <Modal.Title><h6 className='header-text'>Report Submitted</h6></Modal.Title>
                    )}
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {step === 1 && (
                            <>
                                <p className='body-text'>
                                    What do you want to report?
                                </p>
                                <div className='radio-container1'>
                                    <input
                                        type="radio"
                                        name="reportType"
                                        value="username"
                                        className='input'
                                        onChange={handleRadioChange}
                                    />
                                    Username
                                </div>
                                <div className='radio-container1'>
                                    <input
                                        type="radio"
                                        name="reportType"
                                        value="avatar"
                                        className='input'
                                        onChange={handleRadioChange}
                                    />
                                    Display name
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
                            </>
                        )}
                        {step === 2 && (
                            <>
                             <p className='rule-break-text'>What rule is this breaking?</p>
                             <div className="flex-container">
                               <button
                                 className={`option-button ${reportReason === 'Harassment' ? 'selected' : ''}`}
                                 onClick={() => { handleOptionClick('Harassment'); handleDescriptionChange('Harassment'); handleExplanationChange('Harassing, bullying, intimidating, or abusing an individual or group of people with the result of discouraging them from participating.'); }}
                               >
                                 Harassment
                               </button>
                               <button
                                 className={`option-button ${reportReason === 'Threatening violence' ? 'selected' : ''}`}
                                 onClick={() => { handleOptionClick('Threatening violence'); handleDescriptionChange('Threatening violence'); handleExplanationChange('Encouraging, glorifying, or inciting violence or physical harm against individuals or groups of people, places, or animals.'); }}
                               >
                                 Threatening violence
                               </button>
                               <button
                                 className={`option-button ${reportReason === 'Hate' ? 'selected' : ''}`}
                                 onClick={() => { handleOptionClick('Hate'); handleDescriptionChange('Hate'); handleExplanationChange('Promoting hate or inciting violence based on identity or vulnerability.'); }}
                               >
                                 Hate
                               </button>
                               <button
                                 className={`option-button ${reportReason === 'Minor abuse or sexualization' ? 'selected' : ''}`}
                                 onClick={() => { handleOptionClick('Minor abuse or sexualization'); handleDescriptionChange('Minor abuse or sexualization'); handleExplanationChange('Sharing or soliciting content involving abuse, neglect, or sexualization of minors or any predatory or inappropriate behavior towards minors.'); }}
                               >
                                 Minor abuse or sexualization
                               </button>
                               <button
                                 className={`option-button ${reportReason === 'Sharing personal information' ? 'selected' : ''}`}
                                 onClick={() => { handleOptionClick('Sharing personal information'); handleDescriptionChange('Sharing personal information'); handleExplanationChange('Sharing or threatening to share private, personal, or confidential information about someone.'); }}
                               >
                                 Sharing personal information
                               </button>
                               <button
                                 className={`option-button ${reportReason === 'Non-consensual intimate media' ? 'selected' : ''}`}
                                 onClick={() => { handleOptionClick('Non-consensual intimate media'); handleDescriptionChange('Non-consensual intimate media'); handleExplanationChange('Sharing, threatening to share, or soliciting intimate or sexually-explicit content of someone without their consent (including fake or "lookalike" pornography).'); }}
                               >
                                 Non-consensual intimate media
                               </button>
                               <button
                                 className={`option-button ${reportReason === 'Prohibited transaction' ? 'selected' : ''}`}
                                 onClick={() => { handleOptionClick('Prohibited transaction'); handleDescriptionChange('Prohibited transaction'); handleExplanationChange('Soliciting or facilitating transactions or gifts of illegal or prohibited goods and services'); }}
                               >
                                 Prohibited transaction
                               </button>
                               <button
                                 className={`option-button ${reportReason === 'Impersonation' ? 'selected' : ''}`}
                                 onClick={() => { handleOptionClick('Impersonation'); handleDescriptionChange('Impersonation'); handleExplanationChange('Impersonating an individual or entity in a misleading or deceptive way. This includes deepfakes, manipulated content, or false attributions. '); }}
                               >
                                 Impersonation
                               </button>
                               <button
                                 className={`option-button ${reportReason === 'Copyright violation' ? 'selected' : ''}`}
                                 onClick={() => { handleOptionClick('Copyright violation'); handleDescriptionChange('Copyright violation'); handleExplanationChange('Content posted to Reddit that infringes a copyright you own or control. (Note: Only the copyright owner or an authorized representative can submit a report.)'); }}
                               >
                                 Copyright violation
                               </button>
                               <button
                                 className={`option-button ${reportReason === 'Trademark violation' ? 'selected' : ''}`}
                                 onClick={() => { handleOptionClick('Trademark violation'); handleDescriptionChange('Trademark violation'); handleExplanationChange('Content posted to Reddit that infringes a trademark you own or control. (Note: Only the trademark owner or an authorized representative can submit a report.)'); }}
                               >
                                 Trademark violation
                               </button>
                               <button
                                 className={`option-button ${reportReason === 'Self-harm or suicide' ? 'selected' : ''}`}
                                 onClick={() => { handleOptionClick('Self-harm or suicide'); handleDescriptionChange('Self-harm or suicide'); handleExplanationChange('Behavior or comments that make you think someone may be considering suicide or seriously hurting themselves.'); }}
                               >
                                 Self-harm or suicide
                               </button>
                               <button
                                 className={`option-button ${reportReason === 'Spam' ? 'selected' : ''}`}
                                 onClick={() => { handleOptionClick('Spam'); handleDescriptionChange('Spam'); handleExplanationChange('Repeated, unwanted, or unsolicited manual or automated actions that negatively affect redditors, communities, and the Reddit platform.'); }}
                               >
                                 Spam
                               </button>
                             </div>
                             <div className= 'content-policy'>
                                <div className='exclamation-container'><ExclamationMark /></div>
                                <div>
                                    <p className='content-parag'>Not sure if something is breaking the rules? Review Reddit's <a className='policy-link' href='https://www.redditinc.com/policies/content-policy' target= '_blank'>Content Policy</a></p>
                                </div>
                             </div>
                             </>
                        )}
                        {step === 3 && (
                            <>
                                {(reportReason === 'Harassment' || reportReason === 'Threatening violence' || reportReason === 'Non-consensual intimate media') && (
                                    <>
                                    <p className='body-text'>
                                        Who is the {reportReason === 'Harassment' ? 'harassment towards?' : reportReason === 'Threatening violence' ? 'threatening towards?' : reportReason === 'Non-consensual intimate media' ? 'non-consensual intimate media of?' : 'harrasment'} 
                                    </p>
                                        <div className='radio-container1'>
                                            <input
                                                type="radio"
                                                name="reportType"
                                                value="username"
                                                className='input'
                                                onChange={handleRadioChange}
                                            />
                                            You
                                        </div>
                                        <div className='radio-container'>
                                            <input
                                                type="radio"
                                                name="reportType"
                                                value="avatar"
                                                className='input'
                                                onChange={handleRadioChange}
                                            />
                                            Someone else
                                        </div>
                                    </>
                                )}
                                {(reportReason === 'Sharing personal information' || reportReason === 'Impersonation' || reportReason === 'Copyright violation' || reportReason === 'Trademark violation')  && (
                                    <>
                                    <p className='body-text'>
                                        {reportReason === 'Sharing personal information' ? 'Whose personal information is it?' : reportReason === 'Impersonation' ?
                                        'Who is being impersonated?' : reportReason === 'Copyright violation' ?
                                        'Whose copyright is it?' : reportReason === 'Trademark violation' ? 'Whose trademark is it?' : null} 
                                    </p>
                                        <div className='radio-container1'>
                                            <input
                                                type="radio"
                                                name="reportType"
                                                value="username"
                                                className='input'
                                                onChange={handleRadioChange}
                                            />
                                        {reportReason === 'Sharing personal information' ? 'Yours' : reportReason === 'Impersonation' ?
                                        'You or an individual or entity you represent ' : reportReason === 'Copyright violation' ?
                                        'Yours or an individual or entity you represent ' : reportReason === 'Trademark violation' ? 'Yours or an individual or entity you represent ' : null} 
                                        </div>
                                        <div className='radio-container'>
                                            <input
                                                type="radio"
                                                name="reportType"
                                                value="avatar"
                                                className='input'
                                                onChange={handleRadioChange}
                                            />
                                        {reportReason === 'Sharing personal information' ? "Someone else's" : reportReason === 'Impersonation' ?
                                        'Someone else' : reportReason === 'Copyright violation' ?
                                        "Someone else's" : reportReason === 'Trademark violation' ? "Someone else's" : null} 
                                        </div>
                                    </>
                                )}
                                {(reportReason === 'Minor abuse or sexualization')  && (
                                    <>
                                    <p className='body-text'>
                                        What type of minor abuse or sexualization is this? 
                                    </p>
                                        <div className='radio-container1'>
                                            <input
                                                type="radio"
                                                name="reportType"
                                                value="username"
                                                className='input'
                                                onChange={handleRadioChange}
                                            />
                                            Sexual or suggestive content 
                                        </div>
                                        <div className='radio-container1'>
                                            <input
                                                type="radio"
                                                name="reportType"
                                                value="avatar"
                                                className='input'
                                                onChange={handleRadioChange}
                                            />
                                            Predatory or inappropriate behavior 
                                        </div>
                                        <div className='radio-container'>
                                            <input
                                                type="radio"
                                                name="reportType"
                                                value="avatar"
                                                className='input'
                                                onChange={handleRadioChange}
                                            />
                                            Content involving physical or emotional abuse or neglect
                                        </div>
                                    </>
                                )}
                                 {(reportReason === 'Spam')  && (
                                    <>
                                    <p className='body-text'>
                                        What type of spam is this?
                                    </p>
                                        <div className='radio-container1'>
                                            <input
                                                type="radio"
                                                name="reportType"
                                                value="username"
                                                className='input'
                                                onChange={handleRadioChange}
                                            />
                                            Link farming
                                        </div>
                                        <div className='radio-container1'>
                                            <input
                                                type="radio"
                                                name="reportType"
                                                value="avatar"
                                                className='input'
                                                onChange={handleRadioChange}
                                            />
                                            Unsolicited messaging  
                                        </div>
                                        <div className='radio-container1'>
                                            <input
                                                type="radio"
                                                name="reportType"
                                                value="avatar"
                                                className='input'
                                                onChange={handleRadioChange}
                                            />
                                            Excessive posts or comments in a community 
                                        </div>
                                        <div className='radio-container1'>
                                            <input
                                                type="radio"
                                                name="reportType"
                                                value="avatar"
                                                className='input'
                                                onChange={handleRadioChange}
                                            />
                                            Posting harmful links &#40;malware&#41;
                                        </div>
                                        <div className='radio-container1'>
                                            <input
                                                type="radio"
                                                name="reportType"
                                                value="avatar"
                                                className='input'
                                                onChange={handleRadioChange}
                                            />
                                            Harmful bots 
                                        </div>
                                        <div className='radio-container'>
                                            <input
                                                type="radio"
                                                name="reportType"
                                                value="avatar"
                                                className='input'
                                                onChange={handleRadioChange}
                                            />
                                            Other 
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                        {step === 4 && (
                            <>
                                <p className='report-thank'>
                                    Thanks for your report
                                </p>
                                <p>
                                    Thanks again for your report and for looking out for yourself and your fellow redditors.
                                    Your reporting helps make Reddit a better, safer, and more welcoming place for everyone;
                                    and it means a lot to us.  
                                </p>
                            </>
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {step === 1 && (
                        <button className='main-button' onClick={nextStep}>Next</button>
                    )}
                    {step === 2 && (
                        <div className="flex-foot-container">
                            <div className="description">
                                {description && <p className='description-text'>{description}</p>}
                            </div>
                            <div className="explanation-container">
                                {explanation && <p className='explanation-text'>{explanation}</p>}
                            </div>
                            <div className='submit-btn-container'>
                                {reportReason === 'Hate' || reportReason === 'Prohibited transaction' ? (
                                    <button className='main-button' onClick={twoSteps}>Submit</button>
                                ) : (
                                    <button className='main-button' onClick={nextStep}>Next</button>
                                )}
                            </div>
                        </div>
                    )}
                    {step === 3 && (
                        <button className='main-button' onClick={nextStep}>Next</button>
                    )}
                    {step === 4 && (
                        <button className='main-button' onClick={handleModalClose}>Done</button>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default MultiPageFormModal;
