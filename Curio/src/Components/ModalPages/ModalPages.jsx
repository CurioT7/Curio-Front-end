import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ExclamationMark from '../../styles/icons/ExclamationIcon';
import classes from './ModalPages.module.css';
import Back from '../../styles/icons/Back'
import axios from "axios";
import { userBlock , userUnblock } from '../FriendInformation/ShowFriendInformationEndpoints.js'
import { useToast } from '@chakra-ui/react';
import { reportUser } from './ModalPagesEndpoints.jsx';


const hostUrl = import.meta.env.VITE_SERVER_HOST;

const MultiPageFormModal = (props) => {
    const [step, setStep] = useState(1);
    const [selectedOption, setSelectedOption] = useState('');
    const [reportReason, setReportReason] = useState('');
    const [description, setDescription] = useState('');
    const [explanation, setExplanation] = useState('');
    const [furtherDetails, setFurtherDetails] = useState('');
    const [isOptionSelected, setIsOptionSelected] = useState(false);
    const [isSecondStep, setSecondStep] = useState(false);
    const [isPrevStep, setPrevStep] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);

    const [blockedUsers, setBlockedUsers] = useState([]);

    const token = localStorage.getItem('token');

    const toastError = useToast();

    function ToastError(description) {
        toastError({
            description: description,
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

    const handleOptionClick = (reason) => {
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


    async function handleReportUser(){
        await reportUser(props.username, selectedOption, reportReason, furtherDetails);
    }

    async function getBlocked() {
        try {
            const response = await axios.get(`${hostUrl}/api/settings/v1/me/prefs`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            setBlockedUsers(response.data.viewBlockedPeople || []);
            return response.data
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function patchBlockUser(name) {
        const response = await axios.patch(`${hostUrl}/api/settings/v1/me/prefs`, {
          viewBlockedPeople: [...blockedUsers, { username: name}]
        },{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        if(response.status === 200){
            const newUser = { username: name};
            setBlockedUsers(prevBlockedUsers => [...prevBlockedUsers, newUser]);
        }
      };

      async function handleUserBlock(username){
            const result = await userBlock(username);
            if(result === 200){
                await getBlocked(username);
                patchBlockUser(username);
                ToastSuccess();
            }
            else {
                const result = await userBlock(username);
                if(result === 200){
                    patchBlockUser(username);
                    props.handleBlockPage();
                    ToastSuccess();
                }
                if (result === 403) {
                    ToastError("You can't block somebody again within 24 hours of unblocking them");
                }
                else if(result === 500){
                    ToastError("An unexpected error occurred on the server. Please try again later.");
                }
                else if(result === 404){
                    ToastError("User is not found");
                }
                else if(result === 401){
                    ToastError("You are not authorized to perform this action");
                }
                else{
                    ToastError("Something is wrong, please try again later.");
                }
            }
        }


    async function handleUserUnblock(username){
            try {
                const index = blockedUsers.findIndex((user) => user.username === username);
                if (index === -1) {
                    console.error('User not found');
                    return;
                }
        
                const updatedBlockedUsers = [...blockedUsers];
                updatedBlockedUsers.splice(index, 1);
        

                const response = await axios.patch(`${hostUrl}/api/settings/v1/me/prefs`, {
                    viewBlockedPeople: updatedBlockedUsers
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
        
                if (response.status === 200) {
                    setBlockedUsers(updatedBlockedUsers);
                    userUnblock(username);
                }
            } catch (error) {
                console.error('Error:', error);
            }
    };


    const handleBlockToggle = async (username) => {
        if (!isBlocked) {
            handleUserBlock(username);
            }
            else{
                handleUserUnblock(username);
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
                <Modal.Header closeButton className={classes.HeaderModal}>
                    {step === 1 && (
                        <Modal.Title>
                            <h6 className={classes.headertext}>Submit a report</h6>
                        </Modal.Title>
                    )}
                    {step === 2 && (
                        <Modal.Title className='d-flex'>
                            <div className={classes['back-btn-container']}>
                                <button onClick={prevStep} className={classes['back-btn']}>
                                    <div className={classes['back-btn-content']}><Back /></div>
                                </button>
                            </div>
                            <h6 className={classes['headertext1']}>Submit a report</h6>
                        </Modal.Title>
                    )}
                    {step === 3 && (
                        <Modal.Title className='d-flex'>
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
                                                className={classes.input}
                                                onChange={() => {handleFurtherDetailsChange('Sexual or suggestive content')}}
                                            />
                                            Sexual or suggestive content 
                                        </div>
                                        <div className={classes['radio-container1']}>
                                            <input
                                                type="radio"
                                                name="abuse"
                                                className={classes.input}
                                                onChange={() => {handleFurtherDetailsChange('Predatory or inappropriate behavior')}}
                                            />
                                            Predatory or inappropriate behavior 
                                        </div>
                                        <div className={classes['radio-container']}>
                                            <input
                                                type="radio"
                                                name="abuse"
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
                                                className={classes.input}
                                                onChange={() => {handleFurtherDetailsChange('Link farming')}}
                                            />
                                            Link farming
                                        </div>
                                        <div className={classes['radio-container1']}>
                                            <input
                                                type="radio"
                                                name="spam"
                                                className={classes.input}
                                                onChange={() => {handleFurtherDetailsChange('Unsolicited messaging')}}
                                            />
                                            Unsolicited messaging  
                                        </div>
                                        <div className={classes['radio-container1']}>
                                            <input
                                                type="radio"
                                                name="spam"
                                                className={classes.input}
                                                onChange={() => {handleFurtherDetailsChange('Excessive posts or comments in a community')}}
                                            />
                                            Excessive posts or comments in a community 
                                        </div>
                                        <div className={classes['radio-container1']}>
                                            <input
                                                type="radio"
                                                name="spam"
                                                className={classes.input}
                                                onChange={() => {handleFurtherDetailsChange('Posting harmful links (malware)')}}
                                            />
                                            Posting harmful links &#40;malware&#41;
                                        </div>
                                        <div className={classes['radio-container1']}>
                                            <input
                                                type="radio"
                                                name="spam"
                                                className={classes.input}
                                                onChange={() => {handleFurtherDetailsChange('Harmful bots')}}
                                            />
                                            Harmful bots 
                                        </div>
                                        <div className={classes['radio-container']}>
                                            <input
                                                type="radio"
                                                name="spam"
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
                <Modal.Footer className={classes.foooter}>
                    {step === 1 && (
                        <button className={classes['next-button']} onClick={nextStep} disabled={!isOptionSelected}>Next</button>
                    )}
                    {step === 2 && (
                        <div className={classes["flex-foot-container"]}>
                            <div className={classes.description}>
                              <p className={classes['description-text']}>{description}</p>
                            </div>
                            <div className={classes["explanation-container"]}>
                              <p className={classes['explanation-text']}>{explanation}</p>
                            </div>
                            <div className={classes['submit-btn-container']}>
                                {reportReason === 'hate' || reportReason === 'prohibited transaction' || reportReason === 'self-harm or suicide' ? (
                                    <button className={classes['main-button']} disabled={!isSecondStep}  onClick={() => {twoSteps(); handleReportUser()}}>Submit</button>
                                ) : (
                                    <button className={classes['main-button']} disabled={!isSecondStep} onClick={nextStep}>Next</button>
                                    )}
                            </div>
                        </div>
                    )}
                    {step === 3 && (
                        <button className={classes['submit-button']} disabled={!isPrevStep} onClick={() => {nextStep(); handleReportUser()}}>Submit</button>
                    )}
                    {step === 4 && (
                        <div className="d-flex flex-column w-100">
                            <div className={`d-flex w-100 ${classes['block-container']}`}>
                                <div className=" d-flex flex-column justify-content-start w-100">
                                  <h6 className='block-word'>Block {props.username}</h6>
                                  <p className={` m-0' ${classes['block']}`}>You won't be able to send direct messages or chat requests to each other.</p>
                                </div>
                                <div className='form-check form-switch d-flex align-items-center'>
                                    <input style={{ transform: 'scale(1.5)' }} className={`form-check-input ms-auto mr-5 ${classes['check-button']}`} type="checkbox" role="switch" name="block" value="block" onChange={() => {handleBlockToggle(props.username)}} />
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