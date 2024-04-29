import React, { useState, useEffect } from 'react';
import "./Notifications_Dropdown.css";
import logo from "../../assets/Profile_navbar.png";
import { Popover, PopoverTrigger, PopoverContent, PopoverBody, PopoverArrow, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Tooltip } from "@chakra-ui/react";
import { SlOptions } from "react-icons/sl";
import { fetchNotificationsFromBackend, hideNotification } from "../../Pages/Notifications/NotificationsEndPoints.js";
import { getTimeDifference } from '../getTimeDifference/getTimeDifference.js'

function Notifications_Dropdown() {
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
            console.log(notifications)
        }
    }

    async function handleHideNotification(notificationID) {
        try {
            await hideNotification({notificationID: notificationID});
            fetchAndSetData();
        } catch (error) {
            console.error('Error hiding notification:', error.message);
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
                <div className="notifications-actions" style={{marginBottom:'10px'}}>
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
                    <div key={notification._id} className={`notifications-item ${unreadNotifications.some(un => un._id === notification._id) ? 'unread' : 'read'}`}>
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
                                            <PopoverBody className="popover-body"onClick={() => handleHideNotification(notification._id)}>Hide this notification</PopoverBody>
                                            <PopoverBody className="popover-body">Disable updates from this community</PopoverBody>
                                            <PopoverBody className="popover-body">Turn off this notification type</PopoverBody>
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
