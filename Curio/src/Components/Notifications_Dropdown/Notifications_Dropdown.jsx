import React, { useState, useEffect } from 'react';
import "./Notifications_Dropdown.css";
import logo from "../../assets/avatar_default_6.png";
import { Link } from 'react-router-dom';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    Button
} from '@chakra-ui/react';
import { Tooltip } from "@chakra-ui/react";
import { SlOptions } from "react-icons/sl";
import {
    fetchNotificationsFromBackend,
} from "../../Pages/Notifications/NotificationsEndPoints.js";
import {
    handleHideNotification,
    handleEnableNotification,
    handleNotificationClick,
    markAllAsRead
} from "../../Pages/Notifications/Notifications_Functions.js";
import { getTimeDifference } from '../getTimeDifference/getTimeDifference.js'
import { useNavigate } from 'react-router-dom';

function Notifications_Dropdown({ setUnreadNotificationsNum }) {
    const navigate = useNavigate();
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
            const viewedNotificationsCount = data.unreadNotifications.filter(notification => notification.isViewed).length;
            const unreadNotificationsNum = data.unreadNumber - viewedNotificationsCount;
            setUnreadNotificationsNum(unreadNotificationsNum);
        }
    }

    return (
        <div className="notifications-container">
            <div className="notifications-header">
                <div className="notifications-title">
                    <span className="notifications-title-text">Notifications</span>
                </div>
                <Link to={'/message/messages'} className="notifications-messages-link" onClick={closeDropdown}>
                    <div className="notifications-messages-title">
                        <span className="notifications-messages-text">Messages</span>
                    </div>
                </Link>
                <div className="notifications-extra"></div>
                <div className="messages-extra"></div>
            </div>
            <div className="notifications-body">
                <div className="notifications-actions" style={{ marginBottom: '10px' }}>
                    <div className="notifications-mark-all">
                        <button className="mark-all-button" onClick={() => markAllAsRead(notifications, unreadNotifications, setUnreadNotifications)}>
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
                        onClick={() => handleNotificationClick(notification._id, notifications, unreadNotifications, setUnreadNotifications, navigate)}
                    >
                        <div className="notifications-item-link" style={{ cursor: 'pointer' }} >
                            <div className="notifications-item-content" >
                                <div className="notifications-item-avatar">
                                    <div className="avatar">
                                        <span className="avatar-image">
                                            <img src={notification.media ? notification.media: logo} alt="avatar for notification" style={{ marginBottom: "0" }} />
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
                                                colorScheme='gray'
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                }}><SlOptions /></Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <PopoverArrow />
                                            <PopoverBody className="popover-body" onClick={(e) => {
                                                e.stopPropagation();
                                                handleHideNotification(notification._id, notifications, setNotifications);
                                            }}>Hide this notification</PopoverBody>
                                            {
                                                notification.type !== "Friend Request" &&
                                                <PopoverBody className="popover-body" onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEnableNotification(notification._id, notifications, setNotifications);
                                                }}>
                                                    {notification.type === "Comment" ?
                                                        (notification.isDisabled ? 'Enable updates from this comment' : 'Disable updates from this comment') :
                                                        notification.type === "post" ?
                                                            (notification.isDisabled ? 'Enable updates from this post' : 'Disable updates from this post') :
                                                            notification.type === "subreddit" ?
                                                                (notification.isDisabled ? 'Enable updates from this community' : 'Disable updates from this community') :
                                                                null}
                                                </PopoverBody>
                                            }
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
