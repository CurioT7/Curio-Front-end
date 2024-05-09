import React from "react";
import { useState, useEffect, useRef } from "react";
import './ShowFriendInformation.css';
import Minus from "../../styles/icons/Minus";
import PlusIcon from "../../styles/icons/PlusIcon";
import Chat from "../../styles/icons/Chat";
import Ellipsis from "../../styles/icons/Elippsis";
import { Dropdown, Toast } from "react-bootstrap";
import ShareIcon from "../../styles/icons/Share";
import ReportIcon from "../../styles/icons/Report";
import MessageIcon from "../../styles/icons/SendMessage";
import BlockIcon from "../../styles/icons/Block";
import ReportPopup from "../ModalPages/ModalPages";
import { useParams } from "react-router-dom";
import axios from "axios";
import {userBlock , userUnblock, userFollow, userUnfollow, getFollower, getBlocked} from "./ShowFriendInformationEndpoints.js";
import Block from "../../styles/icons/Block";
import DownArrow from "../../styles/icons/DownArrow";
import Post from "../Post/Post";
import { useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react';
import redditPic from "../../styles/icons/hmm-snoo.png";
import PostComments from "../Post/PostComments.jsx";

const hostUrl = import.meta.env.VITE_SERVER_HOST;



function ShowFriendInformation(props) {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const [isFollowing, setIsFollowing] = useState(false);
    // const [blockedUsers, setBlockedUsers] = useState([]);
    const [showReportMenu, setShowReportMenu] = useState(false);
    const [showSortings, setShowSortings] = useState(false);
    const [sortingState, setSortingState] = useState(1);
    const [userPosts, setUserPosts] = useState([]);
    const [userComments, setUserComments] = useState([]);
    const [overviewState, setOverviewState] = useState(0);
    const [savedPosts, setSavedPosts] = useState([]);
    const [hiddenPosts, setHiddenPosts] = useState([]);
    const [savedComments, setSavedComments] = useState([]);
    const [didVote, setDidVote] = useState(false);


    const token = localStorage.getItem('token');
    const toastError = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // const navigate = useNavigate();

    function ToastError() {
        toastError({
            description: "You can't block somebody again within 24 hours of blocking them",
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top',
        });
    }

    useEffect(() => {
        const myUsername = localStorage.getItem('username');
        if(props.username === myUsername){
            setIsFollowing(true);
            navigate(`/profile/${myUsername}`);
        }
    }, []);

    const toastsuccess = useToast()
    function ToastSuccess(description) {
        toastsuccess({
            description: description,
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top',
        });
    }

    const getUserOverview = async () => {
        try{
            const hostUrl = import.meta.env.VITE_SERVER_HOST;
            const response = await axios.get(`${hostUrl}/api/user/${props.username}/overview`);
            if (response.status === 200 || response.status === 201) {
                setUserPosts(response.data.userPosts);
                setUserComments(response.data.userComments);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }   


    const handleEllipsisClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleSortingsClick = () => {
        setShowSortings(!showSortings);
    };

    const handleReportClick = () => {
        if (!token) {
         navigate('/login');
        setShowReportMenu(false);
        }
        else
        setShowReportMenu(true);
    };

    const getSaved = async () => {
      try{
        var hostUrl = import.meta.env.VITE_SERVER_HOST;
        const response = await axios.get(`${hostUrl}/api/saved_categories`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.status === 200 || response.status === 201){
          setSavedPosts(response.data.savedPosts);
            setSavedComments(response.data.savedComments);  
        }
      }
      catch(err){
        console.error(err);
      }
    }

    const getHidden = async () => {
      try{
        var hostUrl = import.meta.env.VITE_SERVER_HOST;
        const response = await axios.get(`${hostUrl}/api/hidden`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.status === 200 || response.status === 201){
          setHiddenPosts(response.data.hiddenPosts);
        }
      }
      catch(err){
          console.error(err);
      }
    }

    const handleReportPopupClose = () => {
        setShowReportMenu(false);
    };

    useEffect(() => {
        handleGetFollower(props.username);
        handleGetBlocked(props.username);
        getBlocked(props.username);
        getUserOverview();
        if (localStorage.getItem('token')) {
            getSaved();
            getHidden();
        }
    }, [props.username]);


    async function handleGetFollower(username) {
        const result = await getFollower(username);
        if (result) {
            setIsFollowing(true);
        } else {
            console.error('Error occurred in getFollower');
        }
    }
    
    

    const handleFollowToggle = async () => {
        if (!token) {
            navigate('/login');
        }
        else {
            if (!isFollowing) {
                const result = await userFollow(props.username);
                if(result === 200){
                    setIsFollowing(true);
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
            } else {
                const result = await userUnfollow(props.username);
                if(result){
                    setIsFollowing(false);
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
            }
        }
    }
    

    async function handleGetBlocked(username) {
        try {
            if (!token) {
                console.error('Token not found');
                return;
            }
    
            const response = await getBlocked();
            if (response.data.viewBlockedPeople.some((blockedUser) => blockedUser.blockedUsername === username)) {
                props.isUserBlocked();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

      const handleUserBlock = async (username) => {
        if (!token) {
            navigate('/login');
        } else {
            const result = await userBlock(username);
            if(result === 200){
                props.handleBlockPage();
                ToastSuccess('User Blocked Successfully');
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
        }
    }

    const handleUserUnblock = async (username) => {
        try {
            const result = await userUnblock(username);
            if(result){
                props.handleUnblock();
                ToastSuccess('User unblocked successfully');
            }
            else if(result === 500){
                ToastError('An unexpected error occurred on the server. Please try again later.');
            }
            
            }catch (error) {
                console.error('Error:', error);
                ToastError('Request has failed, please try again later.')
            }
        }

    const handleJoinCommunity = async (communityName) => {
        try{
            const response = await axios.post(`${hostUrl}/api/friend`, {
                    subreddit: communityName
                },
                {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.status === 200 || response.status === 201){
                    toastError({
                        description: "You have successfully joined the subreddit",
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                        position: 'bottom',
                    });
                }
        }
        catch(err){
            if (err.response.status === 400){
                toastError({
                    description: "You are already a member of this subreddit",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'bottom',
                });
            }
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
          if (userPosts) {
            const votes = [];
            userPosts.forEach(post => {
              votes[post._id] = post.details?.pollVote !== null;
            });
            setDidVote(votes);
          }
        }
      }, [userPosts]);
    

    return (
        <>
            <div className="d-flex flex-column justify-content-center mt-5 center-div">
                <div className="d-flex justify-content-start ms-0 ms-lg-5 position-relative">
                    <div className="d-flex flex-column flex-sm-row">
                        <div className="light-border me-4 mb-3">
                            <img src="https://styles.redditmedia.com/t5_2s887/styles/communityIcon_px0xl1vnj0ka1.png" alt="avatar" className="user-profile-image"/>
                        </div>
                        <div className="d-flex flex-column align-items-md-center align-items-sm-start">
                            <h1 className="show-friend-header d-flex align-items-center mb-0">{props.friendInfo.displayName}</h1>
                            <p className="show-friend-username d-flex align-items-center me-auto">u/{props.username}</p>
                        </div>
                    </div>
                    <div className="d-flex friend-info position-card flex-column ms-auto position-fixed">
                        <div className="w-100 p-4 ps-3 pe-0">
                            <div className="d-flex align-items-center items-container w-100">
                                <h1 style={{fontSize: "1rem"}} className="show-friend-header">{props.friendInfo.displayName || props.username}</h1>
                                <div className="d-flex flex-row left-section w-100">
                                    {props.isBlocked ? (
                                        null
                                    ) : (<>
                                        <button className="ellipsis-btn ms-auto" onClick={handleEllipsisClick}>
                                        <Ellipsis className="ellipsis-img" />
                                    </button>
                                    <div ref={dropdownRef} className="dropdown-menu1" 
                                        style={{ 
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
                                                    <div onClick={() => navigate("/message/compose")}><p className='text-text'>Send a message</p></div>
                                            </li>
                                            <li className="drop-down-item" onClick={() => {handleUserBlock(props.username);}}>
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
                        <ReportPopup show={showReportMenu} onHide={handleReportPopupClose} username={props.username} />
                        <div className="d-flex">
                            {props.isBlocked ? (
                                 <button className="d-flex justify-content-center align-items-center block-button mb-3 ms-3 me-3" onClick={() => {handleUserUnblock(props.username);}}>
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
                                    <p className="mb-0 stats">{props.friendInfo.postKarma}</p>
                                    <p className="secondary-subheader">Post Karma</p>
                                </div>
                                <div className="d-flex flex-column">
                                    <p className="mb-0 stats">{props.friendInfo.commentKarma}</p>
                                    <p className="secondary-subheader">Comment Karma</p>
                                </div>
                                <div className="d-flex flex-column">
                                    <p className="mb-0 stats">{props.friendInfo.cakeDay}</p>
                                    <p className="secondary-subheader">Cake day</p>
                                </div>
                            </div>
                            <div className="pe-4 ps-4 me-4 ms-4 mt-0 mb-4" style={{border: '1px solid #0000001a'}}></div>
                            <h3 className="muted-header p-4 pt-0 mb-1">MODERATOR OF THESE COMMUNITIES</h3>
                            <div className="d-flex flex-column">
                                {props.friendInfo.moderatedSubreddits && props.friendInfo.moderatedSubreddits.map((community, index) => (
                                    community.privacyMode !== "private" &&
                                    <div key={index} className="d-flex justify-content-between p-4 pt-0 pb-0">
                                    <img src={community.icon} alt="community icon" className="mod-community-image d-flex align-items-center justify-content-center mt-2 me-3" />
                                    <div className="d-flex flex-column me-auto">
                                        <p className="mod-community-name mb-0">{community.name}</p>
                                        <p className="mod-community-subscribers secondary-subheader">{community.members.length} members</p>
                                    </div>
                                    <button onClick={() => handleJoinCommunity(community.name)} className="join-button">Join</button>
                                    </div>           
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 ms-lg-5 d-flex flex-column flex-lg-row ms-0 mb-2 align-items-start">
                        <button onClick={() => setOverviewState(0)} style={{backgroundColor: overviewState === 0 ? "#C9D7DE" : ""}} className="btn control-button me-2 p-1 p-sm-3">Overview</button>
                        <button onClick={() => setOverviewState(1)} style={{backgroundColor: overviewState === 1 ? "#C9D7DE" : ""}} className="btn control-button me-2 p-1 p-sm-3">Posts</button>
                        <button onClick={() => setOverviewState(2)} style={{backgroundColor: overviewState === 2 ? "#C9D7DE" : ""}} className="btn control-button me-2 p-1 p-sm-3">Comments</button>
                    </div>
                <hr style={{backgroundColor: "#0000008F"}} className="d-flex justify-content-center col-12 col-md-7 ms-0 ms-lg-5"></hr>
                {props.isBlocked ? (
                <div className="ms-0 ms-lg-5 mt-4 col-md-7 d-flex flex-column align-items-center">
                    <img src= {redditPic} className="blockprofileImage text-center"></img>
                    <p className="blockText">u/{props.username} hasn't posted yet</p>
                </div>
                ) :(
                <div className="ms-0 ms-lg-5 mt-4 col-md-7">
                {overviewState === 0 && userPosts.map((post, index) => (
                post.type === 'poll' ? (
                    <Post
                        pollTitle={post.title}
                        body={post.body}
                        pollText={post.content}
                        user={post.authorName}
                        _id={post._id}
                        type={post.type}
                        optionNames={post.options.map((option) => option.name)}
                        votes={post.options.map((option) => option.votes)}
                        upvotes={post.upvotes}
                        downvotes={post.downvotes}
                        comments={post.comments}
                        isLocked={post.isLocked}
                        voteLength={post.voteLength}
                        linkedSubreddit={post.details?.subredditName}
                        didVote={didVote[post._id]}
                        optionSelected={post.details?.pollVote}
                        pollEnded={post.details?.pollEnded}
                        createdAt={post.createdAt}
                    />
                ) : (
                    <Post
                        _id={post._id}
                        title={post.title}
                        body={post.content}
                        user={post.authorName}
                        upvotes={post.upvotes}
                        downvotes={post.downvotes}
                        comments={post.comments}
                        content={post.content}
                        //isMod={isMod}
                        savedPosts={savedPosts}
                        hiddenPosts={hiddenPosts}
                    />
                )
                ))}
                    {overviewState === 0 && userComments.map((comment, index) => (
                        <PostComments key={comment._id} commentUpvotes={comment.upvotes-comment.downvotes} id={comment._id} savedComments={savedComments} username={comment.authorName} comment={comment.content} />
                    ))}
                        {overviewState === 0 && userPosts.map((post, index) => (
                        post.type === 'poll' ? (
                            <Post
                                pollTitle={post.title}
                                body={post.body}
                                pollText={post.content}
                                user={post.authorName}
                                _id={post._id}
                                type={post.type}
                                optionNames={post.options.map((option) => option.name)}
                                votes={post.options.map((option) => option.votes)}
                                upvotes={post.upvotes}
                                downvotes={post.downvotes}
                                comments={post.comments}
                                isLocked={post.isLocked}
                                voteLength={post.voteLength}
                                linkedSubreddit={post.details?.subredditName}
                                didVote={didVote[post._id]}
                                optionSelected={post.details?.pollVote}
                                pollEnded={post.details?.pollEnded}
                                createdAt={post.createdAt}
                            />
                        ) : (
                            <Post
                                _id={post._id}
                                title={post.title}
                                body={post.content}
                                user={post.authorName}
                                upvotes={post.upvotes}
                                downvotes={post.downvotes}
                                comments={post.comments}
                                content={post.content}
                                //isMod={isMod}
                                savedPosts={savedPosts}
                                hiddenPosts={hiddenPosts}
                            />
                        )
                        ))}
                            {overviewState === 2 && userComments.map((comment, index) => (
                                <PostComments key={comment._id} commentUpvotes={comment.upvotes-comment.downvotes} id={comment._id} savedComments={savedComments} username={comment.authorName} comment={comment.content} />
                            ))}
                </div>)}
                </div>
            </>
        );
    }
    
    export default ShowFriendInformation;