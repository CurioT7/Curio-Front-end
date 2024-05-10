import React from "react";
import { useState, useEffect } from "react";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Popover from 'react-bootstrap/Popover';
import "./RecentPosts.css";
import { width } from "@mui/system";
import axios from "axios";
import {useNavigate} from "react-router-dom";


/**
 * RecentPosts component for displaying recent posts.
 * @module RecentPosts
 * @returns {JSX.Element} RecentPosts component.
 */

function RecentPosts() {
    const [recentPosts, setRecentPosts] = useState([]);
    const [isClear, setIsClear] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const handleClear = async () => {
        const hostUrl = import.meta.env.VITE_SERVER_HOST;
        try{
            const response = await axios.delete(`${hostUrl}/api/clear-history`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.status === 200) {
                setRecentPosts([]);
                setIsClear(true);
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    const handleUpdateRecentPosts = () => {
        const recentPosts = JSON.parse(localStorage.getItem('recentPosts'));
        setRecentPosts(recentPosts);
    }


    const checkAuthentication = () => {
        const token = localStorage.getItem("token");
        if (token) {
        setIsAuthenticated(true);
        } else {
        setIsAuthenticated(false);
        }
    };

    const handleNavigateToPostDetails = (id) => {
        navigate(`/post/post-details/${id}`);
    }


    useEffect(() => {
        checkAuthentication();
        window.addEventListener('loginOrSignup', checkAuthentication);
        return () => {
            window.removeEventListener('loginOrSignup', checkAuthentication);
        }
    }, []);

    useEffect(() => {
        const getRecentPosts = async () => {
            try {
                const hostUrl = import.meta.env.VITE_SERVER_HOST;
                const response = await axios.get(`${hostUrl}/api/getHistory`,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.status === 200) {
                    setRecentPosts(response.data.recentPosts.reverse());
                }
            }
            catch (error) {
                console.error(error);
            }
        }   
        getRecentPosts();
        window.addEventListener('newRecentPost', handleUpdateRecentPosts);
        return () => {
            window.removeEventListener('newRecentPost', handleUpdateRecentPosts);
        }
    }, []);

    const handleNavigationToUserInformation = (authorName) => {
        navigate(`/user/${authorName}`);
    }

    const renderTooltip = (props) => (
        <Tooltip className="col-md-3 p-0 border-radius-set" bsPrefix="card" id="button-tooltip" {...props}>
            <Card.Img className="w-100 p-0 m-0 rounded border-radius-set" style={{height: "20%", width: "auto"}} variant="top" src="https://styles.redditmedia.com/t5_2v07v/styles/bannerBackgroundImage_mqp0c89ji3kc1.png" />
            <Card.Body className="rounded">
                <div className="d-flex justify-content-between">
                    <div className="d-flex justify-content-start">
                        <div className="m-0 p-0 col-md-4 me-2">
                            <img className="rounded-circle col-md-2 p-0 m-0" style={{height: "30px", width: "30px"}} src="https://styles.redditmedia.com/t5_2s887/styles/communityIcon_px0xl1vnj0ka1.png" />
                        </div>
                        <h1 className="card-subreddit-name">r/Angular 2</h1>
                    </div>
                    <div>
                        <button className="join-button-recent" variant="primary">Join</button>
                    </div>
                </div>
                <Card.Text className="subreddit-description mt-2">
                Angular is Google's open source framework for crafting high-quality front-end web applications. r/Angular2 exists to help spread news, discuss current developments and help solve problems. Welcome!
                </Card.Text>
                <hr className="w-100"></hr>
                <div className="d-flex justify-content-start mt-2">
                    <div className="d-flex flex-column mb-0 me-3">
                        <p className="card-subreddit-footer" style={{height: "0.4rem", fontWeight: "600"}}>70K</p>
                        <p className="card-subreddit-footer" style={{color: "#576f76", fontWeight: "600"}}>Members</p>
                    </div>
                    <div className="d-flex flex-column mt-0">
                        <p className="card-subreddit-footer" style={{height: "0.4rem", fontWeight: "600"}}>1.5K</p>
                        <p className="card-subreddit-footer" style={{color: "#576f76", fontWeight: "600"}}><span className="rounded-circle me-1" style={{backgroundColor: "#55bd46", width: "0.5rem", height: "0.5rem", display: "inline-block"}}></span>Online</p>
                    </div>
                </div>
            </Card.Body>
        </Tooltip>
    );

    return (
        <>
        {!isClear && isAuthenticated && recentPosts && recentPosts.length > 0  &&
        <div className="recent-card-visibility">
            <div className="recent-posts-card p-3 mb-3">
                <div className="d-flex justify-content-between">
                    <div className="d-flex col-8">
                        <p className="small-header">RECENT POSTS</p>
                    </div>
                    <div className="col-2 align-items-start d-flex justify-content-end">
                        {/* <button onClick={handleClear} style={{ color: "#0045ac", fontSize: "0.875rem", lineHeight: "1.25rem", fontWeight: "500" }}>Clear</button> */}
                    </div>
                </div>
                {recentPosts && recentPosts.map((post, index) => (
                    <div className="col-md-12 mb-2" key={index}>
                        <div className="d-flex flex-column">
                            <div className="d-flex justify-content-start col-md-12">
                                <div className="col-md-1 me-2">
                                    <img className="rounded-circle" src="https://styles.redditmedia.com/t5_2s887/styles/communityIcon_px0xl1vnj0ka1.png" alt="reddit" />
                                </div>
                                <p onClick={() => handleNavigationToUserInformation(post.authorName)} className="d-flex align-items-center sub-recent-name">{post.authorName}</p>
                            </div>
                            <div className="col-md-12 mb-0">
                                <p onClick={() => handleNavigateToPostDetails(post._id)} className="post-header">{post.title}</p>
                            </div>
                            <div className="d-flex justify-content-start col-md-12 mb-0" style={{ height: "1rem" }}>
                                <p className="post-small-footer me-2">{(post.upvotes - post.downvotes > 0) ? (post.upvotes - post.downvotes) : 0} upvotes</p>
                                <span className="post-small-footer me-2">.</span>
                                <p className="post-small-footer">{post.comments.length} comments</p>
                            </div>
                            <div className="col-md-12 px-0 mx-0 mt-0">
                                <hr className="w-100 mx-0 px-0"></hr>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        }
        </>
    );
}

export default RecentPosts;
