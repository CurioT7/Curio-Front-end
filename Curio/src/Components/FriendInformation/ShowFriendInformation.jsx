import React from "react";
import { useState } from "react";
import './ShowFriendInformation.css';
import Minus from "../../styles/icons/Minus";
import PlusIcon from "../../styles/icons/PlusIcon";
import Chat from "../../styles/icons/Chat";
import Ellipsis from "../../styles/icons/Elippsis";
import { Dropdown } from "react-bootstrap";
import ShareIcon from "../../styles/icons/Share";
import ReportIcon from "../../styles/icons/Report";
import MessageIcon from "../../styles/icons/SendMessage";
import BlockIcon from "../../styles/icons/Block";
import ReportPopup from "../ModalPages/ModalPages";


function ShowFriendInformation(props) {
    const [showDropdown, setShowDropdown] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [showReportMenu, setShowReportMenu] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);

    const handleBlockClick = () => {
        setIsBlocked(true);
        props.onBlock();
    };

    const handleEllipsisClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleFollowToggle = () => {
        setIsFollowing(!isFollowing);
    };

    const handleReportClick = () => {
        setShowReportMenu(true);
    };

    const handleReportPopupClose = () => {
        setShowReportMenu(false);
    };

    if (isBlocked) {
        return (
            <div>
                <h1>Hello</h1>
            </div>
        );
    }

    return (
        <>
            <div className="d-flex flex-column justify-content-center mt-5 center-div">
                <div className="d-flex justify-content-start ms-5 position-relative">
                    <div className="light-border me-4">
                        <img src="https://styles.redditmedia.com/t5_2s887/styles/communityIcon_px0xl1vnj0ka1.png" alt="avatar" className="user-profile-image"/>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                        <h1 className="show-friend-header d-flex align-items-center mb-0">Yehia</h1>
                        <p className="show-friend-username d-flex align-items-center">u/Yehia</p>
                    </div>
                    <div className="d-flex friend-info position-card flex-column ms-auto position-fixed">
                        <div className="w-50 p-4">
                            <div className="d-flex align-items-center items-container">
                                <div className="left-section">
                                    <h3 className="friend-info-subhead me-2">Yehia</h3>
                                </div>
                                <div className="right-section">
                                    <button className="ellipsis-btn" onClick={handleEllipsisClick}>
                                        <Ellipsis className="ellipsis-img" />
                                    </button>
                                    <div className="dropdown-menu" style={{ 
                                        display: showDropdown ? 'flex' : 'none',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        position: 'absolute',
                                        top: '0',
                                        right: '0',
                                        backgroundColor: '#FFFFFF',
                                        borderRadius: '10px',
                                        boxShadow: '2px 6px 10px rgba(0, 0, 0, 0.4)',
                                        marginTop: '4rem',
                                        marginRight: '1rem',
                                        padding: '10px',
                                        width: '188px',
                                        zIndex: '1'
                                    }}>
                                        <ul className='drop-down-list'>
                                            <li className="drop-down-item">
                                                    <div><ShareIcon alt="share" className="interaction-icons" /></div>
                                                    <div><p className='text-text'>Share</p></div>
                                            </li>
                                            <li className="drop-down-item">
                                                    <div><MessageIcon alt="message" className="interaction-icons" /></div>
                                                    <div><p className='text-text'>Send a message</p></div>
                                            </li>
                                            <li className="drop-down-item" onClick={handleBlockClick}>
                                                    <div><BlockIcon alt="block" className="interaction-icons" /></div>
                                                    <div><p className='text-text'>Block account</p></div>
                                            </li>
                                            <li className="last-item" onClick={handleReportClick}>
                                                <div><ReportIcon alt="report" className="interaction-icons" /></div> 
                                                    <div><p className='text-text'>Report</p></div>
                                            </li>
                                        </ul>   
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ReportPopup show={showReportMenu} onHide={handleReportPopupClose} />
                        <div className="d-flex">
                        <button className={`d-flex justify-content-center align-items-center follow-button mb-3 ms-3 me-3 ${isFollowing ? 'following' : 'not-following'}`} onClick={handleFollowToggle}>
                                <span className="d-flex align-items-center me-1 mt-3 minus">{isFollowing ? <Minus /> : <PlusIcon />}</span>
                                <span className="d-flex align-items-center">{isFollowing ? 'Unfollow' : 'Follow'}</span>
                            </button>
                            <button className="chat d-flex justify-content-center align-items-center flex-row mb-3">
                                <span className="d-flex align-items-center me-1 mt-3 minus"><Chat /></span><span className="d-flex align-items-center">Chat</span>
                            </button>
                            </div>
                            <div className="d-flex justify-content-between p-4 pb-0 pt-2 mt-0 mb-0">
                                <div className="d-flex flex-column">
                                    <p className="mb-0 stats">3</p>
                                    <p className="secondary-subheader">Post Karma</p>
                                </div>
                                <div className="d-flex flex-column">
                                    <p className="mb-0 stats">0</p>
                                    <p className="secondary-subheader">Comment Karma</p>
                                </div>
                                <div className="d-flex flex-column">
                                    <p className="mb-0 stats">Aug 29, 2023</p>
                                    <p className="secondary-subheader">Cake day</p>
                                </div>
                            </div>
                            <div className="pe-4 ps-4 me-4 ms-4 mt-0 mb-4" style={{border: '1px solid #0000001a'}}></div>
                            <h3 className="muted-header p-4 pt-0 mb-1">MODERATOR OF THESE COMMUNITIES</h3>
                            <div className="d-flex flex-column">
                                <div className="d-flex justify-content-between p-4 pt-0 pb-0">
                                    <img src="https://styles.redditmedia.com/t5_2s887/styles/communityIcon_px0xl1vnj0ka1.png" alt="avatar" className="mod-community-image d-flex align-items-center justify-content-center mt-2 me-3"/>
                                    <div className="d-flex flex-column me-auto">
                                        <p className="mod-community-name mb-0">r/AskReddit</p>
                                        <p className="mod-community-subscribers secondary-subheader">27,000,000 members</p>
                                    </div>
                                    <button className="join-button">Join</button>
                                </div>
                                <div className="d-flex justify-content-between p-4 pb-0">
                                    <img src="https://styles.redditmedia.com/t5_2s887/styles/communityIcon_px0xl1vnj0ka1.png" alt="avatar" className="mod-community-image mt-2 me-3"/>
                                    <div className="d-flex flex-column me-auto">
                                        <p className="mod-community-name mb-0">r/AskReddit</p>
                                        <p className="mod-community-subscribers secondary-subheader">27,000,000 members</p>
                                    </div>
                                    <button className="join-button">Join</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 ms-5">
                        <button className="btn control-button me-2">Overview</button>
                        <button className="btn control-button me-2">Posts</button>
                        <button className="btn control-button me-2">Comments</button>
                    </div>
                    <div className="p-4">
                        <div className="p-4 pt-0 d-flex justify-content-start">
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" className="sorting-buttons">
                                    New
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu">
                                    <h4 className="d-flex justify-content-center list-header">Sort By</h4>
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" className="sorting-buttons">
                                    New
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu">
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    
    export default ShowFriendInformation;