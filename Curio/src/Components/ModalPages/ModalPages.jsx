import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ExclamationMark from '../../styles/icons/ExclamationIcon';
import classes from './ModalPages.module.css';
import Back from '../../styles/icons/Back'
import axios from "axios";

const MultiPageFormModal = (props) => {
    const [step, setStep] = useState(1);
    const [selectedOption, setSelectedOption] = useState(' ');
    const [reportReason, setReportReason] = useState(' ');
    const [description, setDescription] = useState(' ');
    const [explanation, setExplanation] = useState(' ');
    const [reportType, setReportType] = useState(' ');
    const [furtherDetails, setFurtherDetails] = useState('');


    const hostUrl = import.meta.env.VITE_SERVER_HOST;

    useEffect(() => {
        if (!props.show) {
            setStep(1);
        }
    }, [props.show]);

    const handleReportType = (repType) => {
        setReportType(repType);
    };

    const handleDescriptionChange = (description) => {
        setDescription(description);
    };

    const handleExplanationChange = (explanation) => {
        setExplanation(explanation);
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
        console.log(selectedOption)
        console.log(reportReason)
        console.log(furtherDetails)
    };

    const twoSteps = () => {
        setStep(step + 2)
    }

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleFurtherDetailsChange = (details) => {
        setFurtherDetails(details);
    }


    const handleModalClose = () => {
        setStep(1);
        props.onHide();
    };

    const reportUser = async (reportedUsername, reportType, reportReason ,reportFurtherDetails ) => {
        try {
            const response = await axios.post(`${hostUrl}/api/report_user`, {
                reportedUsername: reportedUsername,
                reportType: reportType,
                reportReason: reportReason,
                reportFurtherDetails: reportFurtherDetails
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
    
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <>
            <Modal {...props}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              className={classes['modal-content']}
              onHide={handleModalClose}
              animation={false}>
                <Modal.Header closeButton className={classes.Header}>
                    {step === 1 && (
                        <Modal.Title>
                            <h6 className={classes.headertext}>Submit a report</h6>
                        </Modal.Title>
                    )}
                    {step === 2 && (
                        <Modal.Title>
                            <div className={classes['back-btn-container']}>
                                <button onClick={prevStep} className={classes['back-btn']}>
                                    <div className={classes['back-btn-content']}><Back /></div>
                                </button>
                            </div>
                            <h6 className={classes['headertext1']}>Submit a report</h6>
                        </Modal.Title>
                    )}
                    {step === 3 && (
                        <Modal.Title>
                            <div className={classes['back-btn-container']}>
                                <button onClick={prevStep} className={classes['back-btn']}>
                                    <div className={classes['back-btn-content']}><Back /></div>
                                </button>
                            </div>
                            <h6 className={classes['headertext1']}>Submit a report</h6>
                        </Modal.Title>
                    )}
                    {step === 4 && (
                        <Modal.Title><h6 className={classes['body-text']}>Report Submitted</h6></Modal.Title>
                    )}
                </Modal.Header>
                <Modal.Body className={classes['body-content']}>
                    <div>
                        {step === 1 && (
                            <>
                                <p className={classes['body-text']}>
                                    What do you want to report?
                                </p>
                                <div className={classes['radio-container1']}>
                                    <input
                                        type="radio"
                                        name="reportType"
                                        value="Username"
                                        className={classes.input}
                                        onChange={handleRadioChange}
                                    />
                                    Username
                                </div>
                                <div className={classes['radio-container1']}>
                                    <input
                                        type="radio"
                                        name="reportType"
                                        value="Banner image"
                                        className={classes.input}
                                        onChange={handleRadioChange}
                                    />
                                    Banner image
                                </div>
                                <div className={classes['radio-container']}>
                                    <input
                                        type="radio"
                                        name="reportType"
                                        value="Avatar/profile image"
                                        className={classes.input}
                                        onChange={handleRadioChange}
                                    />
                                    Avatar/profile image
                                </div>
                            </>
                        )}
                        {step === 2 && (
                            <>
                             <p className={classes['body-text']}>What rule is this breaking?</p>
                             <div className="flex-container">
                             <button
                                className={`${classes["option-button"]} ${reportReason === 'Harassment' ? classes['selected'] : ''}`}
                                onClick={() => { handleOptionClick('Harassment'); handleDescriptionChange('Harassment'); handleExplanationChange('Harassing, bullying, intimidating, or abusing an individual or group of people with the result of discouraging them from participating.'); }}
                            >
                                Harassment
                             </button>
                               <button
                                 className={`${classes["option-button"]} ${reportReason === 'Threatening violence' ? classes['selected'] : ''}`}
                                 onClick={() => { handleOptionClick('Threatening violence'); handleDescriptionChange('Threatening violence'); handleExplanationChange('Encouraging, glorifying, or inciting violence or physical harm against individuals or groups of people, places, or animals.'); }}
                               >
                                 Threatening violence
                               </button>
                               <button
                                 className={`${classes["option-button"]} ${reportReason === 'Hate' ? classes['selected'] : ''}`}
                                 onClick={() => { handleOptionClick('Hate'); handleDescriptionChange('Hate'); handleExplanationChange('Promoting hate or inciting violence based on identity or vulnerability.'); }}
                               >
                                 Hate
                               </button>
                               <button
                                 className={`${classes["option-button"]} ${reportReason === 'Minor abuse or sexualization' ? classes['selected'] : ''}`}
                                 onClick={() => { handleOptionClick('Minor abuse or sexualization'); handleDescriptionChange('Minor abuse or sexualization'); handleExplanationChange('Sharing or soliciting content involving abuse, neglect, or sexualization of minors or any predatory or inappropriate behavior towards minors.'); }}
                               >
                                 Minor abuse or sexualization
                               </button>
                               <button
                                 className={`${classes["option-button"]} ${reportReason === 'Sharing personal information' ? classes['selected'] : ''}`}
                                 onClick={() => { handleOptionClick('Sharing personal information'); handleDescriptionChange('Sharing personal information'); handleExplanationChange('Sharing or threatening to share private, personal, or confidential information about someone.'); }}
                               >
                                 Sharing personal information
                               </button>
                               <button
                                 className={`${classes["option-button"]} ${reportReason === 'Non-consensual intimate media' ? classes['selected'] : ''}`}
                                 onClick={() => { handleOptionClick('Non-consensual intimate media'); handleDescriptionChange('Non-consensual intimate media'); handleExplanationChange('Sharing, threatening to share, or soliciting intimate or sexually-explicit content of someone without their consent (including fake or "lookalike" pornography).'); }}
                               >
                                 Non-consensual intimate media
                               </button>
                               <button
                                 className={`${classes["option-button"]} ${reportReason === 'Prohibited transaction' ? classes['selected'] : ''}`}
                                 onClick={() => { handleOptionClick('Prohibited transaction'); handleDescriptionChange('Prohibited transaction'); handleExplanationChange('Soliciting or facilitating transactions or gifts of illegal or prohibited goods and services'); }}
                               >
                                 Prohibited transaction
                               </button>
                               <button
                                 className={`${classes["option-button"]} ${reportReason === 'Impersonation' ? classes['selected'] : ''}`}
                                 onClick={() => { handleOptionClick('Impersonation'); handleDescriptionChange('Impersonation'); handleExplanationChange('Impersonating an individual or entity in a misleading or deceptive way. This includes deepfakes, manipulated content, or false attributions. '); }}
                               >
                                 Impersonation
                               </button>
                               <button
                                 className={`${classes["option-button"]} ${reportReason === 'Copyright violation' ? classes['selected'] : ''}`}
                                 onClick={() => { handleOptionClick('Copyright violation'); handleDescriptionChange('Copyright violation'); handleExplanationChange('Content posted to Reddit that infringes a copyright you own or control. (Note: Only the copyright owner or an authorized representative can submit a report.)'); }}
                               >
                                 Copyright violation
                               </button>
                               <button
                                 className={`${classes["option-button"]} ${reportReason === 'Trademark violation' ? classes['selected'] : ''}`}
                                 onClick={() => { handleOptionClick('Trademark violation'); handleDescriptionChange('Trademark violation'); handleExplanationChange('Content posted to Reddit that infringes a trademark you own or control. (Note: Only the trademark owner or an authorized representative can submit a report.)'); }}
                               >
                                 Trademark violation
                               </button>
                               <button
                                 className={`${classes["option-button"]} ${reportReason === 'Self-harm or suicide' ? classes['selected'] : ''}`}
                                 onClick={() => { handleOptionClick('Self-harm or suicide'); handleDescriptionChange('Self-harm or suicide'); handleExplanationChange('Behavior or comments that make you think someone may be considering suicide or seriously hurting themselves.'); }}
                               >
                                 Self-harm or suicide
                               </button>
                               <button
                                 className={`${classes["option-button"]} ${reportReason === 'Spam' ? classes['selected'] : ''}`}
                                 onClick={() => { handleOptionClick('Spam'); handleDescriptionChange('Spam'); handleExplanationChange('Repeated, unwanted, or unsolicited manual or automated actions that negatively affect redditors, communities, and the Reddit platform.'); }}
                               >
                                 Spam
                               </button>
                             </div>
                             <div className= {classes["content-policy"]} >
                                <div className={classes["exclamation-container"]} ><ExclamationMark /></div>
                                <div>
                                    <p className={classes["content-parag"]} >Not sure if something is breaking the rules? Review Reddit's <a className={classes['policy-link']} href='https://www.redditinc.com/policies/content-policy' target= '_blank'>Content Policy</a></p>
                                </div>
                             </div>
                             </>
                        )}
                        {step === 3 && (
                            <>
                                {(reportReason === 'Harassment' || reportReason === 'Threatening violence' || reportReason === 'Non-consensual intimate media') && (
                                    <>
                                    <p className={classes['body-text']}>
                                        Who is the {reportReason === 'Harassment' ? 'harassment towards?' : reportReason === 'Threatening violence' ? 'threatening towards?' : reportReason === 'Non-consensual intimate media' ? 'non-consensual intimate media of?' : 'harrasment'} 
                                    </p>
                                        <div className={classes['radio-container1']}>
                                            <input
                                                type="radio"
                                                name="section1"
                                                value="username"
                                                className={classes.input}
                                                onChange={() => {handleFurtherDetailsChange('You')}}
                                            />
                                            You
                                        </div>
                                        <div className={classes['radio-container']}>
                                            <input
                                                type="radio"
                                                name="section1"
                                                value="avatar"
                                                className={classes.input}
                                                onChange={() => {handleFurtherDetailsChange('Someone else')}}
                                            />
                                            Someone else
                                        </div>
                                    </>
                                )}
                                {(reportReason === 'Sharing personal information' || reportReason === 'Impersonation' || reportReason === 'Copyright violation' || reportReason === 'Trademark violation')  && (
                                    <>
                                    <p className={classes['body-text']}>
                                        {reportReason === 'Sharing personal information' ? 'Whose personal information is it?' : reportReason === 'Impersonation' ?
                                        'Who is being impersonated?' : reportReason === 'Copyright violation' ?
                                        'Whose copyright is it?' : reportReason === 'Trademark violation' ? 'Whose trademark is it?' : null} 
                                    </p>
                                        <div className={classes['radio-container1']}>
                                            <input
                                                type="radio"
                                                name="reportType"
                                                value="username"
                                                className={classes.input}
                                                onChange={() => {handleFurtherDetailsChange(reportReason === 'Sharing personal information' ? 'Yours' : reportReason === 'Impersonation' ?
                                                'You or an individual or entity you represent ' : reportReason === 'Copyright violation' ?
                                                'Yours or an individual or entity you represent ' : reportReason === 'Trademark violation' ? 'Yours or an individual or entity you represent ' : null)}}
                                            />
                                        {reportReason === 'Sharing personal information' ? 'Yours' : reportReason === 'Impersonation' ?
                                        'You or an individual or entity you represent ' : reportReason === 'Copyright violation' ?
                                        'Yours or an individual or entity you represent ' : reportReason === 'Trademark violation' ? 'Yours or an individual or entity you represent ' : null} 
                                        </div>
                                        <div className={classes['radio-container']}>
                                            <input
                                                type="radio"
                                                name="reportType"
                                                value="avatar"
                                                className={classes.input}
                                                onChange={() => {handleFurtherDetailsChange(reportReason === 'Sharing personal information' ? "Someone else's" : reportReason === 'Impersonation' ?
                                                'Someone else' : reportReason === 'Copyright violation' ?
                                                "Someone else's" : reportReason === 'Trademark violation' ? "Someone else's" : null)}}
                                            />
                                        {reportReason === 'Sharing personal information' ? "Someone else's" : reportReason === 'Impersonation' ?
                                        'Someone else' : reportReason === 'Copyright violation' ?
                                        "Someone else's" : reportReason === 'Trademark violation' ? "Someone else's" : null} 
                                        </div>
                                    </>
                                )}
                                {(reportReason === 'Minor abuse or sexualization')  && (
                                    <>
                                    <p className={classes['body-text']}>
                                        What type of minor abuse or sexualization is this? 
                                    </p>
                                        <div className={classes['radio-container1']}>
                                            <input
                                                type="radio"
                                                name="abuse"
                                                value="username"
                                                className={classes.input}
                                                onChange={() => {handleFurtherDetailsChange('Sexual or suggestive content')}}
                                            />
                                            Sexual or suggestive content 
                                        </div>
                                        <div className={classes['radio-container1']}>
                                            <input
                                                type="radio"
                                                name="abuse"
                                                value="avatar"
                                                className={classes.input}
                                                onChange={() => {handleFurtherDetailsChange('Predatory or inappropriate behavior')}}
                                            />
                                            Predatory or inappropriate behavior 
                                        </div>
                                        <div className={classes['radio-container']}>
                                            <input
                                                type="radio"
                                                name="abuse"
                                                value="avatar"
                                                className={classes.input}
                                                onChange={() => {handleFurtherDetailsChange('Content involving physical or emotional abuse or neglect')}}
                                            />
                                            Content involving physical or emotional abuse or neglect
                                        </div>
                                    </>
                                )}
                                 {(reportReason === 'Spam')  && (
                                    <>
                                    <p className={classes['body-text']}>
                                        What type of spam is this?
                                    </p>
                                        <div className={classes['radio-container1']}>
                                            <input
                                                type="radio"
                                                name="spam"
                                                value="Link farming"
                                                className={classes.input}
                                                onChange={() => {handleFurtherDetailsChange('Link farming')}}
                                            />
                                            Link farming
                                        </div>
                                        <div className={classes['radio-container1']}>
                                            <input
                                                type="radio"
                                                name="spam"
                                                value="Unsolicited messaging"
                                                className={classes.input}
                                                onChange={() => {handleFurtherDetailsChange('Unsolicited messaging')}}
                                            />
                                            Unsolicited messaging  
                                        </div>
                                        <div className={classes['radio-container1']}>
                                            <input
                                                type="radio"
                                                name="spam"
                                                value="Excessive posts or comments in a community"
                                                className={classes.input}
                                                onChange={() => {handleFurtherDetailsChange('Excessive posts or comments in a community')}}
                                            />
                                            Excessive posts or comments in a community 
                                        </div>
                                        <div className={classes['radio-container1']}>
                                            <input
                                                type="radio"
                                                name="spam"
                                                value="Posting harmful links (malware)"
                                                className={classes.input}
                                                onChange={() => {handleFurtherDetailsChange('Posting harmful links (malware)')}}
                                            />
                                            Posting harmful links &#40;malware&#41;
                                        </div>
                                        <div className={classes['radio-container1']}>
                                            <input
                                                type="radio"
                                                name="spam"
                                                value="Harmful bots"
                                                className={classes.input}
                                                onChange={() => {handleFurtherDetailsChange('Harmful bots')}}
                                            />
                                            Harmful bots 
                                        </div>
                                        <div className={classes['radio-container']}>
                                            <input
                                                type="radio"
                                                name="spam"
                                                value="Other"
                                                className={classes.input}
                                                onChange={() => {handleFurtherDetailsChange('Other')}}
                                            />
                                            Other 
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                        {step === 4 && (
                            <>
                                <p className={classes['report-thank']}>
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
                <Modal.Footer className={classes.footer}>
                    {step === 1 && (
                        <button className={classes['main-button']} onClick={nextStep}>Next</button>
                    )}
                    {step === 2 && (
                        <div className={classes["flex-foot-container"]}>
                            <div className={classes.description}>
                                {description && <p className={classes['description-text']}>{description}</p>}
                            </div>
                            <div className={classes["explanation-container"]}>
                                {explanation && <p className={classes['explanation-text']}>{explanation}</p>}
                            </div>
                            <div className={classes['submit-btn-container']}>
                                {reportReason === 'Hate' || reportReason === 'Prohibited transaction' ? (
                                    <button className={classes['main-button']} onClick={() => {twoSteps(); reportUser(props.username, selectedOption, reportReason, furtherDetails)}}>Submit</button>
                                ) : (
                                    <button className={classes['main-button']} onClick={nextStep}>Next</button>
                                )}
                            </div>
                        </div>
                    )}
                    {step === 3 && (
                        <button className={classes['main-button']} onClick={() => {nextStep(); reportUser(props.username, selectedOption, reportReason, furtherDetails)}}>Submit</button>
                    )}
                    {step === 4 && (
                        <div className="d-flex flex-column w-100">
                            <div className={`d-flex w-100 ${classes['block-container']}`}>
                                <div className=" d-flex flex-column justify-content-start w-100">
                                  <h6 className='block-word'>Block {props.username}</h6>
                                  <p className={` m-0' ${classes['block']}`}>You won't be able to send direct messages or chat requests to each other.</p>
                                </div>
                                <div className='form-check form-switch d-flex align-items-center'>
                                    <input style={{ transform: 'scale(1.5)' }} className={`form-check-input ms-auto mr-5 ${classes['check-button']}`} type="checkbox" id="mature" role="switch" name="mature" value="mature" />
                                </div>
                            </div>
                            <div className="d-flex justify-content-end">
                                <button className={`main-button ${classes['main-button']}`} onClick={props.onHide}>Done</button>
                            </div>
                        </div>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default MultiPageFormModal;
