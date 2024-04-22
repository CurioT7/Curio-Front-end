import React from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from "@chakra-ui/react";
import logo from "../../assets/Profile_navbar.png";
import { Popover, PopoverTrigger, PopoverContent, PopoverBody, PopoverArrow, Button } from '@chakra-ui/react';
import { SlOptions } from "react-icons/sl";
import "./NotificationsPage.css"


function NotificationsPage() {
  return (
    <div className="notifications-page">
        <div className='notifications-header-page'>
            <div className='notifications-date'>
                <span className='notifications-time'>Today</span>
                <div className="notifications-mark-all">
                    <button className="mark-all-button" style={{display:'flex', gap:'0.5rem'}}>
                        <span className="mark-all-text">Mark all as read</span>
                        <div className='sperator-notifications'/>
                    </button>
                </div>
            </div>
            <div className="notifications-settings" 
            style={{
                marginLeft:'0.75rem',
                position: 'relative',
                top:'2px'
            }}>
                <div className="notifications-settings-link">
                    <Tooltip label='Notifications Settings'>
                        <Link to={'/settings/notifications'} target="_blank" className="settings-link">
                            <i className="fa-solid fa-gear"/>
                        </Link>
                    </Tooltip>
                </div>
            </div>
        </div>
        <div className='notification-content'>
            <div className='avatar'>
                <span className='avatar-image'>
                    <img src={logo} alt="avatar for notification" style={{marginBottom:"0"}}/>
                </span>
                <div className='notifications-item-icon notification-item-icon-page'>
                    <i className="fa-solid fa-message"/>
                </div>
            </div>
            <div className='notification-details'>
                <div className='notifications-item-info' style={{display:'flex', gap:'0.4rem'}}>  
                    <span className="notifications-item-info-text">
                        r/cfrv got its 1st member!
                    </span>
                    <span className="notifications-item-info-date">
                        17h
                    </span>
                </div>
                <div className="notifications-item-message">               
                    <span className='notifications-item-message-text'>
                        Not forever alone! You’re on your way now.
                    </span>           
                </div>
            </div>
            <div className='notifications-item-options'> 
                <Popover placement='bottom-start'>
                    <PopoverTrigger>
                        <Button 
                        variant='ghost'
                        colorScheme='gray'><SlOptions /></Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverArrow />
                        <PopoverBody>Hide this notification</PopoverBody>
                        <PopoverBody>Disable updates from this community</PopoverBody>
                        <PopoverBody>Turn off this notification type</PopoverBody>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    </div>
  );
}

export default NotificationsPage;