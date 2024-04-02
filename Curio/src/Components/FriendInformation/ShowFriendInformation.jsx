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
import Block from "../../styles/icons/Block";
import DownArrow from "../../styles/icons/DownArrow";
import Post from "../Post/Post";

const hostUrl = import.meta.env.VITE_SERVER_HOST;


function ShowFriendInformation(props) {
    const { username } = useParams();
    const [showDropdown, setShowDropdown] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [showReportMenu, setShowReportMenu] = useState(false);
    const [friendInfo, setFriendInfo] = useState({});
    // const [isnextPage, setIsNextPage] = useState(false);
    const [friendusername , setFriendusername] = useState('');
    const [showSortings, setShowSortings] = useState(false);
    const [sortingState, setSortingState] = useState(1);

    // handleNextPage = () => {
    //     props.nextPage();
    //     setIsNextPage(true);
    // }

    // const handleBlockClick = () => {
    //     setIsBlocked(!isBlocked);
    // };


    const handleEllipsisClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleSortingsClick = () => {
        setShowSortings(!showSortings);
    };

    const handleReportClick = () => {
        setShowReportMenu(true);
    };

    const handleReportPopupClose = () => {
        setShowReportMenu(false);
    };


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

    async function userFollow(friendUsername) {
        try {
            await axios.post(`${hostUrl}/api/me/friends`, {
                friendUsername
            },{
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(response);
            return response.data;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function userUnfollow(friendUsername) {
                await axios.delete(`${hostUrl}/api/me/friends`, {
                friendUsername
            },{
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).then(response => {
                if (response.status === 200) {
                  console.log('Friend unfollowed')
                }
              })
              .catch(error => {
                if (error.response) {
                  switch (error.response.status) {
                    case 404:
                        console.log('Friend not found')
                      break;
                      case 500:
                        console.log(`An unexpected error occurred on the server. Please try again later.`);
                      break;
                    default:
                      break;
                  }
                }
              });
            };

    const handleFollowToggle = () => {
        if (isFollowing) {
            userUnfollow(username);
        } else {
            userFollow(username);
        }
        setIsFollowing(!isFollowing);
    }


    async function userBlock(usernameToBlock) {
        try {
            console.log(localStorage.getItem('token'));
            const response = await axios.post(`${hostUrl}/api/User/block`, {
                usernameToBlock
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(response);
            return response;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function userUnblock(usernameToUnblock) {
        try {
            const response = await axios.post(`${hostUrl}/api/User/unblock`, {
                usernameToUnblock
            }, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(response);
            return response;
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
                            <p className="show-friend-username d-flex align-items-center me-auto">u/{username}</p>
                        </div>
                        <div className="d-flex responsive follow-buttons justify-content-start justify-content-sm-center">
                            <button className={`d-flex justify-content-center align-items-center follow-button m-0 me-2 ms-0 ms-md-2 ${isFollowing ? 'following' : 'not-following1'}`}>
                                <span className="d-flex align-items-center me-1 mt-3 minus">{isFollowing ? <Minus /> : <PlusIcon />}</span>
                                <span className="d-flex align-items-center">{isFollowing ? 'Unfollow' : 'Follow'}</span>
                            </button>
                            <button className="chat d-flex justify-content-center align-items-center flex-row mb-3">
                                <span className="d-flex align-items-center me-1 mt-3 minus"><Chat /></span><span className="d-flex align-items-center">Chat</span>
                            </button>
                        </div>
                    </div>
                    <div className="d-flex friend-info position-card flex-column ms-auto position-fixed">
                        <div className="w-100 p-4 ps-3 pe-0">
                            <div className="d-flex align-items-center items-container w-100">
                                <h1 style={{fontSize: "1rem"}} className="show-friend-header">{friendInfo.displayName || username}</h1>
                                <div className="d-flex flex-row left-section w-100">
                                    {props.isBlocked ? (
                                        null
                                    ) : (<>
                                        <button className="ellipsis-btn ms-auto" onClick={handleEllipsisClick}>
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
                                            <li className="drop-down-item" onClick={() => {props.handleBlockPage(); userBlock(username);}}>
                                                    <div><BlockIcon alt="block" className="interaction-icons" /></div>
                                                    <div><p className='text-text'>Block account</p></div>
                                            </li>
                                            <li className="last-item" onClick={handleReportClick}>
                                                <div><ReportIcon alt="report" className="interaction-icons" /></div> 
                                                    <div><p className='text-text'>Report</p></div>
                                            </li>
                                        </ul>   
                                    </div>
                                    </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <ReportPopup show={showReportMenu} onHide={handleReportPopupClose} username={username} />
                        <div className="d-flex">
                            {props.isBlocked ? (
                                 <button className="d-flex justify-content-center align-items-center block-button mb-3 ms-3 me-3" onClick={() => {props.handleUnblock(); userUnblock(username);}}>
                                    <span className="d-flex align-items-center me-1 mt-3 minus"><BlockIcon /></span>
                                    <span className="d-flex align-items-center">Blocked</span>
                                 </button> 
                            ): (
                                <>
                                <button className={`d-flex justify-content-center align-items-center follow-button mb-3 ms-3 me-3 ${isFollowing ? 'following' : 'not-following'}`} onClick={handleFollowToggle}>
                                    <span className="d-flex align-items-center me-1 mt-3 minus">{isFollowing ? <Minus /> : <PlusIcon />}</span>
                                    <span className="d-flex align-items-center">{isFollowing ? 'Unfollow' : 'Follow'}</span>
                                </button>
                                <button className="chat d-flex justify-content-center align-items-center flex-row mb-3">
                                    <span className="d-flex align-items-center me-1 mt-3 minus"><Chat /></span><span className="d-flex align-items-center">Chat</span>
                                </button>
                        </>
                            )}

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
                    <div className="w-25 d-flex justify-content-start p-0 p-lg-4 mt-2 ms-0 ms-lg-4">
                        <div className="pt-0 w-75 d-flex">
                            <button className="d-flex justify-content-center ms-2 sort-button p-2" style={{backgroundColor : showSortings ? "#D2DADD" : ""}} onClick={handleSortingsClick}>{sortingState === 0 ? "Hot" : sortingState === 1 ? "New" : "Top"}<div className="ms-1"><DownArrow /></div></button>

                            <div className="" style={{ 
                                        display: showSortings ? 'flex' : 'none',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        position: 'absolute',
                                        translateY: '-20%!important',
                                        translateX: '0%',
                                        backgroundColor: '#FFFFFF',
                                        borderRadius: '10px',
                                        boxShadow: '2px 6px 10px rgba(0, 0, 0, 0.4)',
                                        marginTop: '2rem',
                                        marginRight: '1rem',
                                        padding: '0px',
                                        width: '4rem !important',
                                        zIndex: '1'
                                    }}>
                                        <ul className='drop-down-list'>
                                            <li className="drop-down-item">
                                                    <div className="d-flex justify-content-center"><p className='text-text sort-by mb-0 p-2 ms-0'>Sort By</p></div>
                                            </li>
                                        </ul>
                                        <ul className='drop-down-list w-100 p-0'>
                                            <li className="drop-down-item dropdown-hover-effect mb-0 pt-2" style={{backgroundColor: (sortingState === 0) ? "#EAEDEF" : ""}} onClick={() => setSortingState(0)}>
                                                    <div className="pt-2"><p className='text-text'>Hot</p></div>
                                            </li>
                                            <li className="drop-down-item dropdown-hover-effect p-0 pt-2 mb-0" style={{backgroundColor: (sortingState === 1) ? "#EAEDEF" : ""}} onClick={() => setSortingState(1)}>
                                                    <div className="pt-2"><p className='text-text'>New</p></div>
                                            </li>
                                            <li className="drop-down-item dropdown-hover-effect mb-1 p-0 pt-2" style={{backgroundColor: (sortingState === 2) ? "#EAEDEF" : ""}} onClick={() => setSortingState(2)}>
                                                    <div className="pt-2"><p className='text-text'>Top</p></div>
                                            </li>
                                        </ul>   
                                    </div>
                        </div>
                    </div>
                <hr style={{backgroundColor: "#0000008F"}} className="d-flex justify-content-center col-12 col-md-7 ms-0 ms-lg-5"></hr>
                <div className="ms-0 ms-lg-5 mt-4 col-md-7">
                    <Post
                        user="r/netherlands"
                        title="Second Post"
                        image="https://preview.redd.it/happy-easter-v0-o8d3et699nrc1.jpeg?width=640&crop=smart&auto=webp&s=7a63acc0ef0afb3699c036718113ef23e13b96f7"
                        upvotes={10}
                        downvotes={1}
                        comments={[4, 5]} // Dummy array for comments
                    />
                    <Post
                        user="r/netherlands"
                        title="Second Post"
                        image="https://preview.redd.it/happy-easter-v0-o8d3et699nrc1.jpeg?width=640&crop=smart&auto=webp&s=7a63acc0ef0afb3699c036718113ef23e13b96f7"
                        upvotes={10}
                        downvotes={1}
                        comments={[4, 5]} // Dummy array for comments
                    />
                    <Post
                        user="r/netherlands"
                        title="Second Post"
                        image="https://preview.redd.it/happy-easter-v0-o8d3et699nrc1.jpeg?width=640&crop=smart&auto=webp&s=7a63acc0ef0afb3699c036718113ef23e13b96f7"
                        upvotes={10}
                        downvotes={1}
                        comments={[4, 5]} // Dummy array for comments
                    />
                </div>
                </div>
            </>
        );
    }
    
    export default ShowFriendInformation;