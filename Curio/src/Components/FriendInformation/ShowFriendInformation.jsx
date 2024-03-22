import React from "react";
import { useState, useEffect } from "react";
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
import showFriendInformation from "./ShowFriendInformationEndpoints.js";
import { useParams } from "react-router-dom";
import axios from "axios";

const hostUrl = import.meta.env.VITE_SERVER_HOST;


function ShowFriendInformation(props) {
    const { username } = useParams();
    const [showDropdown, setShowDropdown] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [showReportMenu, setShowReportMenu] = useState(false);
    const [friendInfo, setFriendInfo] = useState({});
    const [isBlocked, setIsBlocked] = useState(false);
    const [friendusername , setFriendusername] = useState('');

    const handleBlockClick = () => {
        setIsBlocked(true);
        props.onBlock();
    };

    const handleEllipsisClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleReportClick = () => {
        setShowReportMenu(true);
    };

    const handleReportPopupClose = () => {
        setShowReportMenu(false);
    };

    const handleFollowToggle = () => {
        setIsFollowing(!isFollowing);
    }

    useEffect(() => {
        async function showFriendInformation({username}) {
            try {
                const response = await axios.get(`${hostUrl}/user/${username}/about`);
                console.log(response);
                setFriendInfo(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        showFriendInformation({username});
        
    }, [username]);

    async function userFollow() {
        try {
            const response = await axios.post(`${hostUrl}/api/v1/me/friends/${username}`, {
                username: 'Mostafa',
                friendusername: username
            });
            console.log(response);
        } catch (error) {
            console.error('Error:', error);
        }
    }


    return (
        <>
            <div className="d-flex flex-column justify-content-center mt-5 center-div">
                <div className="d-flex justify-content-start ms-0 ms-lg-5 position-relative">
                    <div className="d-flex flex-column flex-sm-row">
                        <div className="light-border me-4 mb-3">
                            <img src="https://styles.redditmedia.com/t5_2s887/styles/communityIcon_px0xl1vnj0ka1.png" alt="avatar" className="user-profile-image"/>
                        </div>
                        <div className="d-flex flex-column align-items-md-center align-items-sm-start">
                            <h1 className="show-friend-header d-flex align-items-center mb-0">{friendInfo.displayName}</h1>
                            <p className="show-friend-username d-flex align-items-center">u/{username}</p>
                        </div>
                    </div>
                    <div className="d-flex friend-info position-card flex-column ms-auto position-fixed">
                        <div className="w-100 p-4">
                            <div className="d-flex align-items-center items-container justify-content-between">
                                <div className="left-section">
                                    <h3 className="friend-info-subhead me-2">{friendInfo.displayName}</h3>
                                </div>
                                <div className="right-section">
                                    <button className="ellipsis-btn" onClick={handleEllipsisClick}>
                                        <Ellipsis className="ellipsis-img" />
                                    </button>
                                    <div className="dropdown-menus" style={{ 
                                        display: showDropdown ? 'flex' : 'none'
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
                        {isBlocked ?                      <>       <button className="chat d-flex justify-content-center align-items-center flex-row mb-3">
                                <span className="d-flex align-items-center me-1 mt-3 minus"><BlockIcon /></span><span className="d-flex align-items-center">Blocked</span>
                            </button> </>: (
                        <>
                            <button className={`d-flex justify-content-center align-items-center follow-button mb-3 ms-3 me-3 ${isFollowing ? 'following' : 'not-following'}`} onClick={() => {handleFollowToggle(); userFollow(username)}}>
                                <span className="d-flex align-items-center me-1 mt-3 minus">{isFollowing ? <Minus /> : <PlusIcon />}</span>
                                <span className="d-flex align-items-center">{isFollowing ? 'Unfollow' : 'Follow'}</span>
                            </button>
                            <button className="chat d-flex justify-content-center align-items-center flex-row mb-3">
                                <span className="d-flex align-items-center me-1 mt-3 minus"><Chat /></span><span className="d-flex align-items-center">Chat</span>
                            </button>
                        </> )}
                          </div>
                            <div className="d-flex justify-content-between p-4 pb-0 pt-2 mt-0 mb-0">
                                <div className="d-flex flex-column">
                                    <p className="mb-0 stats">{friendInfo.postKarma}</p>
                                    <p className="secondary-subheader">Post Karma</p>
                                </div>
                                <div className="d-flex flex-column">
                                    <p className="mb-0 stats">{friendInfo.commentKarma}</p>
                                    <p className="secondary-subheader">Comment Karma</p>
                                </div>
                                <div className="d-flex flex-column">
                                    <p className="mb-0 stats">{friendInfo.cakeDay}</p>
                                    <p className="secondary-subheader">Cake day</p>
                                </div>
                            </div>
                            <div className="pe-4 ps-4 me-4 ms-4 mt-0 mb-4" style={{border: '1px solid #0000001a'}}></div>
                            <h3 className="muted-header p-4 pt-0 mb-1">MODERATOR OF THESE COMMUNITIES</h3>
                            <div className="d-flex flex-column">
                                {friendInfo.moderatedSubreddits && friendInfo.moderatedSubreddits.map((community, index) => (
                                    <div key={index} className="d-flex justify-content-between p-4 pt-0 pb-0">
                                    <img src={community.icon} alt="community icon" className="mod-community-image d-flex align-items-center justify-content-center mt-2 me-3" />
                                    <div className="d-flex flex-column me-auto">
                                        <p className="mod-community-name mb-0">{community.name}</p>
                                        <p className="mod-community-subscribers secondary-subheader">{community.members.length} members</p>
                                    </div>
                                    <button className="join-button">Join</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 ms-lg-5 d-flex flex-column flex-lg-row ms-0 align-items-start">
                        <button className="btn control-button me-2 p-1 p-sm-3">Overview</button>
                        <button className="btn control-button me-2 p-1 p-sm-3">Posts</button>
                        <button className="btn control-button me-2 p-1 p-sm-3">Comments</button>
                    </div>
                    <div className="d-flex justify-content-start p-0 p-lg-4 mt-2">
                        <div className="pt-0 d-flex justify-content-start">
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" className="sorting-buttons">
                                    New
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu sorting-dropdown-menu">
                                    <h4 className="d-flex justify-content-center list-header">Sort By</h4>
                                    <Dropdown.Item href="#/action-1">Hot</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">New</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Top</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    
    export default ShowFriendInformation;