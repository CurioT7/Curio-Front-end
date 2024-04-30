import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from "@chakra-ui/react";
import logo from "../../assets/Profile_navbar.png";
import { Popover, PopoverTrigger, PopoverContent, PopoverBody, PopoverArrow, Button } from '@chakra-ui/react';
import { SlOptions } from "react-icons/sl";
import "./NotificationsPage.css";
import { getTimeDifference } from "../../Components/getTimeDifference/getTimeDifference";


function NotificationsPage({ notifications, unreadNotifications, onHideNotification, onNotificationClick }) {
    return (
        <div className="notifications-page">
            <div className='notifications-header-page'>
                <div className='notifications-date'>
                    <span className='notifications-time'>Today</span>
                    <div className="notifications-mark-all">
                        <button className="mark-all-button" style={{ display: 'flex', gap: '0.5rem' }}>
                            <span className="mark-all-text">Mark all as read</span>
                            <div className='sperator-notifications' />
                        </button>
                    </div>
                </div>
                <div className="notifications-settings"
                    style={{
                        marginLeft: '0.75rem',
                        position: 'relative',
                        top: '2px'
                    }}>
                    <div className="notifications-settings-link">
                        <Tooltip label='Notifications Settings' placement='left'>
                            <Link to={'/settings/notifications'} target="_blank" className="settings-link">
                                <i className="fa-solid fa-gear" />
                            </Link>
                        </Tooltip>
                    </div>
                </div>
            </div>
            <div className='notification-content'>
                {notifications.length > 0 && notifications.map(notification => (
                    <div key={notification._id}
                        className={`notification-item ${unreadNotifications.some(un => un._id === notification._id) ? 'unread' : 'read'}`}
                        onClick={() => onNotificationClick(notification._id)}>
                        <div className='avatar'>
                            <span className='avatar-image'>
                                <img src={logo} alt="avatar for notification" style={{ marginBottom: "0" }} />
                            </span>
                            <div className='notifications-item-icon notification-item-icon-page'>
                                <i className="fa-solid fa-message" />
                            </div>
                        </div>
                        <div className='notification-details'>
                            <div className='notifications-item-info' style={{ display: 'flex', gap: '0.4rem' }}>
                                <span className="notifications-item-info-text">
                                    {notification.title}
                                </span>
                                <span className="notifications-item-info-date">
                                    {getTimeDifference(notification.timestamp)}
                                </span>
                            </div>
                            <div className="notifications-item-message">
                                <span className='notifications-item-message-text'>
                                    {notification.message}
                                </span>
                            </div>
                        </div>
                        <div className='notifications-item-options'>
                            <Popover placement='bottom-end'>
                                <PopoverTrigger>
                                    <Button
                                        variant='ghost'
                                        colorScheme='gray'><SlOptions /></Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverBody onClick={() => onHideNotification(notification._id)}>Hide this notification</PopoverBody>
                                    <PopoverBody>Disable updates from this community</PopoverBody>
                                    <PopoverBody>Turn off this notification type</PopoverBody>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NotificationsPage;
