import React from 'react';
import "./NotificationsSetting.css";

function NotificationsSetting() {
  return (
    <div className='container'>
        <div className="notification-settings">
            <div className="notification-settings-section">
            <h2 className='notification-settings-heading'>Notification settings</h2>
            <div className='activity-section'>
                <h3 className='headings-titles text-uppercase fw-bold mb-4'>Activity</h3>    
                    <div className="mention_username d-flex flex-wrap mb-3">
                        <div className="mention_username">
                            <label htmlFor="mention_username-checkbox">
                                <h3 className="headings-settings d-flex fw-500 mb-1">Mentions of u/username</h3>
                            </label>
                        </div>
                        <div className="mention_username-checkbox">
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
                        </div>
                        </div>
                    </div>
                    <div className="comments-posts d-flex flex-wrap mb-3">
                        <div className="comments-posts">
                            <label htmlFor="comments-posts-checkbox">
                                <h3 className="headings-settings d-flex fw-500 mb-1">Comments on your posts</h3>
                            </label>
                        </div>
                        <div className="comments-posts-checkbox">
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
                        </div>
                        </div>
                    </div>
                    <div className="upvotes-posts d-flex flex-wrap mb-3">
                        <div className="upvotes-posts">
                            <label htmlFor="upvotes-posts-checkbox">
                                <h3 className="headings-settings d-flex fw-500 mb-1">Upvotes on your posts</h3>
                            </label>
                        </div>
                        <div className="upvotes-posts-checkbox">
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
                        </div>
                        </div>
                    </div>
                    <div className="upvotes-comments d-flex flex-wrap mb-3">
                        <div className="upvotes-comments">
                            <label htmlFor="upvotes-comments-checkbox">
                                <h3 className="headings-settings d-flex fw-500 mb-1">Upvotes on your comments</h3>
                            </label>
                        </div>
                        <div className="upvotes-comments-checkbox">
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
                        </div>
                        </div>
                    </div>
                    <div className="replies-comments d-flex flex-wrap mb-3">
                        <div className="replies-comments">
                            <label htmlFor="replies-comments-checkbox">
                                <h3 className="headings-settings d-flex fw-500 mb-1">Replies to your comments</h3>
                            </label>
                        </div>
                        <div className="replies-comments-checkbox">
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
                        </div>
                        </div>
                    </div>
                    <div className="new-followers d-flex flex-wrap mb-3">
                        <div className="new-followers">
                            <label htmlFor="new-followers-checkbox">
                                <h3 className="headings-settings d-flex fw-500 mb-1">New followers</h3>
                            </label>
                        </div>
                        <div className="new-followers-checkbox">
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
                        </div>
                        </div>
                    </div>  
            </div>
            <div className="recommendations-sections">
                <h3 className='headings-titles text-uppercase fw-bold mb-4'>Recommendations</h3>
                <div className="new-followers d-flex flex-wrap mb-3">
                    <div className="trending-posts">
                        <label htmlFor="trending-posts-checkbox">
                            <h3 className="headings-settings d-flex fw-500 mb-2">Trending posts</h3>
                        </label>
                    </div>
                    <div className="trending-posts-checkbox">
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
                    </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
  );
}

export default NotificationsSetting;
