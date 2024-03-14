import React from "react";
import { useState } from "react";
import './ShowFriendInformation.css';
import Minus from "../../styles/icons/Minus";
import Chat from "../../styles/icons/Chat";


function ShowFriendInformation(props) {




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
                            <h3 className="friend-info-subhead me-2">Yehia</h3>
                        </div>
                        <div className="d-flex">
                            <button className="d-flex justify-content-center align-items-center follow-button mb-3 ms-3 me-3"><span className="d-flex align-items-center me-1 mt-3 minus"><Minus /></span><span className="d-flex align-items-center">Unfollow</span></button>
                            <button className="chat d-flex justify-content-center align-items-center flex-row mb-3"><span className="d-flex align-items-center me-1 mt-3 minus"><Chat /></span><span className="d-flex align-items-center">Chat</span></button>
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
            </div>
        </>
    );
}

export default ShowFriendInformation;