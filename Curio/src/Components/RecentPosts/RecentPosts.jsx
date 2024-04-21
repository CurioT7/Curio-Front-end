import React from "react";
import { useState, useEffect } from "react";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Popover from 'react-bootstrap/Popover';
import "./RecentPosts.css";
import { width } from "@mui/system";

function RecentPosts() {
    const [recentPosts, setRecentPosts] = useState([]);
    const [isClear, setIsClear] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const handleClear = () => {
        setRecentPosts([]);
        localStorage.removeItem('recentPosts');
        setIsClear(true);
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


    useEffect(() => {
        checkAuthentication();
        window.addEventListener('loginOrSignup', checkAuthentication);
        return () => {
            window.removeEventListener('loginOrSignup', checkAuthentication);
        }
    }, []);

    useEffect(() => {
        const recentPosts = JSON.parse(localStorage.getItem('recentPosts'));
        setRecentPosts(recentPosts);
        window.addEventListener('newRecentPost', handleUpdateRecentPosts);
        return () => {
            window.removeEventListener('newRecentPost', handleUpdateRecentPosts);
        }
    }, []);

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
                        <button onClick={handleClear} style={{ color: "#0045ac", fontSize: "0.875rem", lineHeight: "1.25rem", fontWeight: "500" }}>Clear</button>
                    </div>
                </div>
                {recentPosts && recentPosts.map((post, index) => (
                    <div className="col-md-12 mb-2" key={index}>
                        <div className="d-flex flex-column">
                            <div className="d-flex justify-content-start col-md-12">
                                <div className="col-md-1 me-2">
                                    <OverlayTrigger
                                        placement="bottom"
                                        trigger="click"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={renderTooltip}
                                    >
                                        <img className="rounded-circle" src="https://styles.redditmedia.com/t5_2s887/styles/communityIcon_px0xl1vnj0ka1.png" alt="reddit" />
                                    </OverlayTrigger>
                                </div>
                                <p className="d-flex align-items-center sub-recent-name">{post.user}</p>
                            </div>
                            <div className="col-md-12 mb-0">
                                <p className="post-header">{post.title}</p>
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
