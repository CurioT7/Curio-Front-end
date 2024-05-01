import React, { useState, useEffect } from 'react';
import "./Notifications_Dropdown.css";
import logo from "../../assets/Profile_navbar.png";
import { Popover, PopoverTrigger, PopoverContent, PopoverBody, PopoverArrow, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Tooltip } from "@chakra-ui/react";
import { SlOptions } from "react-icons/sl";
import { fetchNotificationsFromBackend, hideNotification, sendReadNotifications, disableNotification } from "../../Pages/Notifications/NotificationsEndPoints.js";
import { getTimeDifference } from '../getTimeDifference/getTimeDifference.js'
import { useNavigate } from 'react-router-dom';

function Notifications_Dropdown() {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    const [notifications, setNotifications] = useState([]);
    const [unreadNotifications, setUnreadNotifications] = useState([]);

    const closeDropdown = () => {
        setDropdownOpen(false);
    }

    useEffect(() => {
        fetchAndSetData();
    }, []);

    async function fetchAndSetData() {
        const data = await fetchNotificationsFromBackend();
        if (data) {
            setNotifications(data.notifications || []);
            setUnreadNotifications(data.unreadNotifications || []);
        }
    }

    async function handleHideNotification(notificationID) {
        try {
            await hideNotification({ notificationID: notificationID });
            setNotifications(notifications.filter(notification => notification._id !== notificationID));
        } catch (error) {
            console.error('Error hiding notification:', error.message);
        }
    }

    async function handleEnableNotification(notificationID) {
        try {
            const notification = notifications.find(notification => notification._id === notificationID);
            if (notification.type === "subreddit") {
                console.log(notification.subredditName);
                await disableNotification({ subredditName : notification.subredditName });
            } else if (notification.type === "post") {
                await disableNotification({ PostId : notificationID });
            } else if (notification.type === "comment") {
                await disableNotification({ commentId : notification.commentId });
            }
        } catch (error) {
            console.error('Error Disable notification:', error.message);
        }
    }

    async function handleNotificationClick(notificationID) {
        try {
            const notification = notifications.find(notification => notification._id === notificationID);
            const isUnread = unreadNotifications.some(un => un._id === notificationID);
            if (isUnread) {
                await sendReadNotifications(notificationID);
                setUnreadNotifications(prevNotifications => prevNotifications.filter(notification => notification._id !== notificationID));
            }
            console.log(notification.type)
            if (notification.type === "subreddit") {
                navigate(`/r/${notification.subredditName}`);
            } else if (notification.type === "post") {
                navigate(`/post/post-details/${notification.postId}`);
            } else if (notification.type === "comment") {

            } else if (notification.type === "New Follower") {
                navigate(`/profile/${username}`);
            }
        } catch (error) {
            console.error('Error marking notification as read:', error.message);
        }
    }

    return (
        <div className="notifications-container">
            <div className="notifications-header">
                <div className="notifications-title">
                    <span className="notifications-title-text">Notifications</span>
                </div>
                <a href="#" className="notifications-messages-link">
                    <div className="notifications-messages-title">
                        <span className="notifications-messages-text">Messages</span>
                    </div>
                </a>
                <div className="notifications-extra"></div>
                <div className="messages-extra"></div>
            </div>
            <div className="notifications-body">
                <div className="notifications-actions" style={{ marginBottom: '10px' }}>
                    <div className="notifications-mark-all">
                        <button className="mark-all-button">
                            <span className="mark-all-text">Mark all as read</span>
                        </button>
                    </div>
                    <div className="notifications-settings">
                        <div className="notifications-settings-link">
                            <Tooltip label='Notifications Settings'>
                                <Link to={'/settings/notifications'} target="_blank" className="settings-link">
                                    <i className="fa-solid fa-gear" />
                                </Link>
                            </Tooltip>
                        </div>
                    </div>
                </div>
                {notifications.length > 0 && notifications.map(notification => (
                    <div key={notification._id}
                        className={`notifications-item ${unreadNotifications.some(un => un._id === notification._id) ? 'unread' : 'read'}`}
                        onClick={() => handleNotificationClick(notification._id)}
                    >
                        <div className="notifications-item-link" style={{ cursor: 'pointer' }} >
                            <div className="notifications-item-content">
                                <div className="notifications-item-avatar">
                                    <div className="avatar">
                                        <span className="avatar-image">
                                            <img src={logo} alt="avatar for notification" style={{ marginBottom: "0" }} />
                                        </span>
                                        <div className="notifications-item-icon">
                                            <i className="fa-solid fa-message" />
                                        </div>
                                    </div>
                                </div>
                                <div className="notifications-item-details">
                                    <div className="notifications-item-info">
                                        <span className="notifications-item-info-text">{notification.title}</span>&nbsp;
                                        <span className="notifications-item-info-date">{getTimeDifference(notification.timestamp)}</span>
                                    </div>
                                    <div className="notifications-item-message">
                                        <span className="notifications-item-message-text">{notification.message}</span>
                                    </div>
                                </div>
                                <div className="notifications-item-options">
                                    <Popover placement='bottom-end'>
                                        <PopoverTrigger>
                                            <Button
                                                variant='ghost'
                                                colorScheme='gray'><SlOptions /></Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <PopoverArrow />
                                            <PopoverBody className="popover-body" onClick={() => handleHideNotification(notification._id)}>Hide this notification</PopoverBody>
                                            <PopoverBody className="popover-body" onClick={() => handleEnableNotification(notification._id)}>
                                                {notification.isDisabled === 0 ? 'Enable updates from this community' : 'Disable updates from this community'}
                                            </PopoverBody>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="notifications-see-all">
                <Link to={"/notifications"} type="button" className="see-all-button" onClick={closeDropdown}>
                    <span className="see-all-text">
                        <span className="see-all-text-inner" >See All</span>
                    </span>
                </Link>
            </div>
        </div>
    );
}

export default Notifications_Dropdown;
