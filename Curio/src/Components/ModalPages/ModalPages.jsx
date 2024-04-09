import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ExclamationMark from '../../styles/icons/ExclamationIcon';
import classes from './ModalPages.module.css';
import Back from '../../styles/icons/Back'
import axios from "axios";
import { userBlock , userUnblock } from '../FriendInformation/ShowFriendInformationEndpoints.js'
import { useToast } from '@chakra-ui/react';

const MultiPageFormModal = (props) => {
    const [step, setStep] = useState(1);
    const [selectedOption, setSelectedOption] = useState(' ');
    const [reportReason, setReportReason] = useState(' ');
    const [description, setDescription] = useState(' ');
    const [explanation, setExplanation] = useState(' ');
    const [furtherDetails, setFurtherDetails] = useState('');
    const [isOptionSelected, setIsOptionSelected] = useState(false);
    const [isSecondStep, setSecondStep] = useState(false);
    const[isPrevStep, setPrevStep] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);
    const [isBlockedError, setIsBlockedError] = useState(false);

    const toast = useToast()
    function Toast() {
        toast({
            title: "error",
            description: "You can't block somebody again within 24 hours of blocking them",
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top',
        });
    }

    const toastsuccess = useToast()
    function ToastSuccess() {
        toastsuccess({
            description: "User Blocked successfully",
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top',
        });
    }



    const hostUrl = import.meta.env.VITE_SERVER_HOST;

    useEffect(() => {
        if (!props.show) {
            setStep(1);
        }
    }, [props.show]);

    const handleDescriptionChange = (description) => {
        setDescription(description);
    };

    const handleExplanationChange = (explanation) => {
        setExplanation(explanation);
    };
    
    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
        setIsOptionSelected(true);
    };

    const handleOptionClick = (reason, explanation) => {
        if (reportReason === reason) {
            setReportReason('');
        } else {
            setReportReason(reason);
        }
        setSecondStep(true);
    };
    
    const nextStep = () => {
        setStep(step + 1);
        setIsOptionSelected(false);
        setPrevStep(false);
        console.log(selectedOption)
        console.log(reportReason)
        console.log(furtherDetails)
    };

    const twoSteps = () => {
        setStep(step + 2)
    }

    const prevStep = () => {
        setStep(step - 1);
        setPrevStep(false);
    };

    const handleFurtherDetailsChange = (details) => {
        setFurtherDetails(details);
        setPrevStep(true);
    }


    const handleModalClose = () => {
        setStep(1);
        props.onHide();
    };

    const reportUser = async (reportedUsername, reportType, reportReason ,reportDetails ) => {
        console.log(localStorage.getItem('token'));
        try {
            const response = await axios.post(`${hostUrl}/api/report_user`, {
                reportedUsername: reportedUsername,
                reportType: reportType,
                reportReason: reportReason,
                reportDetails
            }, {
                headers: {
                    authorization : `Bearer ${localStorage.getItem('token')}`
                }
            });
    
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };


    const handleBlockToggle = async() => {
        if(isBlockedError){
            setIsBlockedError(false);
        }
        else{
        if (!isBlocked) {
            const result = await userBlock(props.username);
            if(result.success){
                setIsBlocked(true);
                ToastSuccess();
            }
            if (!result.success) {
                Toast();
                setIsBlockedError(true);
            }
        } else {
            userUnblock(props.username);
        }
    }
    setIsBlocked(!isBlocked);
    }


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
                                        value="username"
                                        className={classes.input}
                                        onChange={handleRadioChange}
                                    />
                                    Username
                                </div>
                                <div className={classes['radio-container1']}>
                                    <input
                                        type="radio"
                                        name="reportType"
                                        value="banner image"
                                        className={classes.input}
                                        onChange={handleRadioChange}
                                    />
                                    Banner image
                                </div>
                                <div className={classes['radio-container']}>
                                    <input
                                        type="radio"
                                        name="reportType"
                                        value="profile image"
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
                             <div className={classes['flex-container']}>
                             <button
                                className={`${classes["option-button"]} ${reportReason === 'harassment' ? classes['selected'] : ''}`}
                                onClick={() => { handleOptionClick('harassment'); handleDescriptionChange('Harassment'); handleExplanationChange('Harassing, bullying, intimidating, or abusing an individual or group of people with the result of discouraging them from participating.'); }}
                            >
                                Harassment
                             </button>
                               <button
                                 className={`${classes["option-button"]} ${reportReason === 'threatening violence' ? classes['selected'] : ''}`}
                                 onClick={() => { handleOptionClick('threatening violence'); handleDescriptionChange('Threatening violence'); handleExplanationChange('Encouraging, glorifying, or inciting violence or physical harm against individuals or groups of people, places, or animals.'); }}
                               >
                                 Threatening violence
                               </button>
                               <button
                                 className={`${classes["option-button"]} ${reportReason === 'hate' ? classes['selected'] : ''}`}
                                 onClick={() => { handleOptionClick('hate'); handleDescriptionChange('Hate'); handleExplanationChange('Promoting hate or inciting violence based on identity or vulnerability.'); }}
                               >
                                 Hate
                               </button>
                               <button
                                 className={`${classes["option-button"]} ${reportReason === 'minor abuse or sexualization' ? classes['selected'] : ''}`}
                                 onClick={() => { handleOptionClick('minor abuse or sexualization'); handleDescriptionChange('Minor abuse or sexualization'); handleExplanationChange('Sharing or soliciting content involving abuse, neglect, or sexualization of minors or any predatory or inappropriate behavior towards minors.'); }}
                               >
                                 Minor abuse or sexualization
                               </button>
                               <button
                                 className={`${classes["option-button"]} ${reportReason === 'sharing personal information' ? classes['selected'] : ''}`}
                                 onClick={() => { handleOptionClick('sharing personal information'); handleDescriptionChange('Sharing personal information'); handleExplanationChange('Sharing or threatening to share private, personal, or confidential information about someone.'); }}
                               >
                                 Sharing personal information
                               </button>
                               <button
                                 className={`${classes["option-button"]} ${reportReason === 'non-consensual intimate media' ? classes['selected'] : ''}`}
                                 onClick={() => { handleOptionClick('non-consensual intimate media'); handleDescriptionChange('Non-consensual intimate media'); handleExplanationChange('Sharing, threatening to share, or soliciting intimate or sexually-explicit content of someone without their consent (including fake or "lookalike" pornography).'); }}
                               >
                                 Non-consensual intimate media
                               </button>
                               <button
                                 className={`${classes["option-button"]} ${reportReason === 'prohibited transaction' ? classes['selected'] : ''}`}
                                 onClick={() => { handleOptionClick('prohibited transaction'); handleDescriptionChange('Prohibited transaction'); handleExplanationChange('Soliciting or facilitating transactions or gifts of illegal or prohibited goods and services'); }}
                               >
                                 Prohibited transaction
                               </button>
                               <button
                                 className={`${classes["option-button"]} ${reportReason === 'impersonation' ? classes['selected'] : ''}`}
                                 onClick={() => { handleOptionClick('impersonation'); handleDescriptionChange('Impersonation'); handleExplanationChange('Impersonating an individual or entity in a misleading or deceptive way. This includes deepfakes, manipulated content, or false attributions. '); }}
                               >
                                 Impersonation
                               </button>
                               <button
                                 className={`${classes["option-button"]} ${reportReason === 'copyright violation' ? classes['selected'] : ''}`}
                                 onClick={() => { handleOptionClick('copyright violation'); handleDescriptionChange('Copyright violation'); handleExplanationChange('Content posted to Reddit that infringes a copyright you own or control. (Note: Only the copyright owner or an authorized representative can submit a report.)'); }}
                               >
                                 Copyright violation
                               </button>
                               <button
                                 className={`${classes["option-button"]} ${reportReason === 'trademark violation' ? classes['selected'] : ''}`}
                                 onClick={() => { handleOptionClick('trademark violation'); handleDescriptionChange('Trademark violation'); handleExplanationChange('Content posted to Reddit that infringes a trademark you own or control. (Note: Only the trademark owner or an authorized representative can submit a report.)'); }}
                               >
                                 Trademark violation
                               </button>
                               <button
                                 className={`${classes["option-button"]} ${reportReason === 'self-harm or suicide' ? classes['selected'] : ''}`}
                                 onClick={() => { handleOptionClick('self-harm or suicide'); handleDescriptionChange('Self-harm or suicide'); handleExplanationChange('Behavior or comments that make you think someone may be considering suicide or seriously hurting themselves.'); }}
                               >
                                 Self-harm or suicide
                               </button>
                               <button
                                 className={`${classes["option-button"]} ${reportReason === 'spam' ? classes['selected'] : ''}`}
                                 onClick={() => { handleOptionClick('spam'); handleDescriptionChange('Spam'); handleExplanationChange('Repeated, unwanted, or unsolicited manual or automated actions that negatively affect redditors, communities, and the Reddit platform.'); }}
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
                                {(reportReason === 'harassment' || reportReason === 'threatening violence' || reportReason === 'non-consensual intimate media') && (
                                    <>
                                    <p className={classes['body-text']}>
                                        Who is the {reportReason === 'harassment' ? 'harassment towards?' : reportReason === 'threatening violence' ? 'threatening towards?' : reportReason === 'non-consensual intimate media' ? 'non-consensual intimate media of?' : 'harassment'} 
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
                                {(reportReason === 'sharing personal information' || reportReason === 'impersonation' || reportReason === 'copyright violation' || reportReason === 'trademark violation')  && (
                                    <>
                                    <p className={classes['body-text']}>
                                        {reportReason === 'sharing personal information' ? 'whose personal information is it?' : reportReason === 'impersonation' ?
                                        'Who is being impersonated?' : reportReason === 'copyright violation' ?
                                        'whose copyright is it?' : reportReason === 'trademark violation' ? 'Whose trademark is it?' : null} 
                                    </p>
                                        <div className={classes['radio-container1']}>
                                            <input
                                                type="radio"
                                                name="reportType"
                                                value="username"
                                                className={classes.input}
                                                onChange={() => {handleFurtherDetailsChange(reportReason === 'sharing personal information' ? 'Yours' : reportReason === 'impersonation' ?
                                                'You or an individual or entity you represent ' : reportReason === 'copyright violation' ?
                                                'Yours or an individual or entity you represent ' : reportReason === 'trademark violation' ? 'Yours or an individual or entity you represent ' : null)}}
                                            />
                                        {reportReason === 'sharing personal information' ? 'Yours' : reportReason === 'impersonation' ?
                                        'You or an individual or entity you represent ' : reportReason === 'copyright violation' ?
                                        'Yours or an individual or entity you represent ' : reportReason === 'trademark violation' ? 'Yours or an individual or entity you represent ' : null} 
                                        </div>
                                        <div className={classes['radio-container']}>
                                            <input
                                                type="radio"
                                                name="reportType"
                                                value="avatar"
                                                className={classes.input}
                                                onChange={() => {handleFurtherDetailsChange(reportReason === 'sharing personal information' ? "Someone else's" : reportReason === 'impersonation' ?
                                                'Someone else' : reportReason === 'copyright violation' ?
                                                "Someone else's" : reportReason === 'trademark violation' ? "Someone else's" : null)}}
                                            />
                                        {reportReason === 'sharing personal information' ? "Someone else's" : reportReason === 'impersonation' ?
                                        'Someone else' : reportReason === 'copyright violation' ?
                                        "Someone else's" : reportReason === 'trademark violation' ? "Someone else's" : null} 
                                        </div>
                                    </>
                                )}
                                {(reportReason === 'minor abuse or sexualization')  && (
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
                                 {(reportReason === 'spam')  && (
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
                        <button className={classes['next-button']} onClick={nextStep} disabled={!isOptionSelected}>Next</button>
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
                                {reportReason === 'hate' || reportReason === 'prohibited transaction' || reportReason === 'self-harm or suicide' ? (
                                    <button className={classes['main-button']} disabled={!isSecondStep}  onClick={() => {twoSteps(); reportUser(props.username, selectedOption, reportReason, furtherDetails)}}>Submit</button>
                                ) : (
                                    <button className={classes['main-button']} disabled={!isSecondStep} onClick={nextStep}>Next</button>
                                    )}
                            </div>
                        </div>
                    )}
                    {step === 3 && (
                        <button className={classes['submit-button']} disabled={!isPrevStep} onClick={() => {nextStep(); reportUser(props.username, selectedOption, reportReason, furtherDetails)}}>Submit</button>
                    )}
                    {step === 4 && (
                        <div className="d-flex flex-column w-100">
                            <div className={`d-flex w-100 ${classes['block-container']}`}>
                                <div className=" d-flex flex-column justify-content-start w-100">
                                  <h6 className='block-word'>Block {props.username}</h6>
                                  <p className={` m-0' ${classes['block']}`}>You won't be able to send direct messages or chat requests to each other.</p>
                                </div>
                                <div className='form-check form-switch d-flex align-items-center'>
                                    <input style={{ transform: 'scale(1.5)' }} className={`form-check-input ms-auto mr-5 ${classes['check-button']}`} type="checkbox" id="block" role="switch" name="block" value="block" onChange={handleBlockToggle} />
                                </div>
                            </div>
                            <div className="d-flex justify-content-end">
                                <button className={`done-button ${classes['done-button']}`} onClick={props.onHide}>Done</button>
                            </div>
                        </div>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default MultiPageFormModal;
