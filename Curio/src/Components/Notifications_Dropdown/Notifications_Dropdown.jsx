import React, { useState, useEffect } from 'react';
import "./Notifications_Dropdown.css"; 
import logo from "../../assets/Profile_navbar.png";
import { Popover, PopoverTrigger, PopoverContent, PopoverBody, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Tooltip } from "@chakra-ui/react";
import {
    PopoverHeader,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
  } from '@chakra-ui/react'
import { SlOptions } from "react-icons/sl";
import"../Notification_Messages/Notification_Messages.jsx"


function Notifications() {
const[messages, setMessages] = useState(false);
const handleMessageNotification = () => {
    setMessages(true);

 }

  return (
    <div className="notifications-container">
      <div className="notifications-header">
          <div className="notifications-title">
              <span className="notifications-title-text">Notifications</span>
          </div>
          <a href="#" className="notifications-messages-link">
              <div className="notifications-messages">
                  <div className="notifications-messages-title">
                      <span className="notifications-messages-text" onClick={handleMessageNotification}>Messages</span>
                  </div>
              </div>
          </a>
          <div className="notifications-extra"></div>
          <div className="messages-extra"></div>
      </div>
      <div className="notifications-body">
          <div className="notifications-actions">
              <div className="notifications-mark-all">
                  <button className="mark-all-button">
                      <span className="mark-all-text">Mark all as read</span>
                  </button>
              </div>
              <div className="notifications-settings">
                  <div className="notifications-settings-link">
                    <Tooltip label='Notifications Settings'>
                        <Link to={'/settings/notifications'} target="_blank" className="settings-link">
                            <i className="fa-solid fa-gear"/>
                        </Link>
                    </Tooltip>
                  </div>
              </div>
          </div>
          <div className="notifications-item">
              <div className="notifications-item-link" style={{cursor:'pointer'}}>
                  <div className="notifications-item-content">
                      <div className="notifications-item-avatar">
                          <div className="avatar">
                              <span className="avatar-image">
                                  <img src={logo} alt="avatar for notification" style={{marginBottom:"0"}}/>
                              </span>
                              <div className="notifications-item-icon">
                              <i className="fa-solid fa-message"/>
                          </div>
                          </div>
                          
                      </div>
                      <div className="notifications-item-details">
                          <div className="notifications-item-info">
                              <span className="notifications-item-info-text">u/AutoModerator replied to your post in r/fantasyfootball</span>&nbsp;
                              <span className="notifications-item-info-date">Apr 4</span>
                          </div>
                          <div className="notifications-item-message">
                              <span className="notifications-item-message-text">
                                  Hello! Unfortunately, since your account has less than 10 total karma, and low karma account spam…
                              </span>
                          </div>
                      </div>
                      <div className="notifications-item-options">
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
            </div>
            <div className="notifications-item">
              <div className="notifications-item-link" style={{cursor:'pointer'}}>
                  <div className="notifications-item-content">
                      <div className="notifications-item-avatar">
                          <div className="avatar">
                              <span className="avatar-image">
                                  <img src={logo} alt="avatar for notification" style={{marginBottom:"0"}}/>
                              </span>
                              <div className="notifications-item-icon">
                              <i className="fa-solid fa-message"/>
                          </div>
                          </div>
                      </div>
                      <div className="notifications-item-details">
                          <div className="notifications-item-info">
                              <span className="notifications-item-info-text">u/Commentor replied to your post in u/Username</span>&nbsp;
                              <span className="notifications-item-info-date">Apr 7</span>
                          </div>
                          <div className="notifications-item-message">
                              <span className="notifications-item-message-text">
                                  Comment Content
                              </span>
                          </div>
                      </div>
                      <div className="notifications-item-options">
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
              </div>
              <div className="notifications-item">
              <div className="notifications-item-link" style={{cursor:'pointer'}}>
                  <div className="notifications-item-content">
                      <div className="notifications-item-avatar">
                          <div className="avatar">
                              <span className="avatar-image">
                                  <img src={logo} alt="avatar for notification" style={{marginBottom:"0"}}/>
                              </span>
                              <div className="notifications-item-icon">
                              <i className="fa-solid fa-message"/>
                          </div>
                          </div>
                      </div>
                      <div className="notifications-item-details">
                          <div className="notifications-item-info">
                              <span className="notifications-item-info-text">25 Upvotes on your post on u/Username</span>&nbsp;
                              <span className="notifications-item-info-date">Apr 10</span>
                          </div>
                          <div className="notifications-item-message">
                              <span className="notifications-item-message-text">
                                Your karma is now 673
                              </span>
                          </div>
                      </div>
                      <div className="notifications-item-options">
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
              </div>
              <div className="notifications-item">
              <div className="notifications-item-link" style={{cursor:'pointer'}}>
                  <div className="notifications-item-content">
                      <div className="notifications-item-avatar">
                          <div className="avatar">
                              <span className="avatar-image">
                                  <img src={logo} alt="avatar for notification" style={{marginBottom:"0"}}/>
                              </span>
                              <div className="notifications-item-icon">
                              <i className="fa-solid fa-message"/>
                          </div>
                          </div>
                      </div>
                      <div className="notifications-item-details">
                          <div className="notifications-item-info">
                              <span className="notifications-item-info-text">12 Downvotes on your post on u/Username</span>&nbsp;
                              <span className="notifications-item-info-date">Apr 16</span>
                          </div>
                          <div className="notifications-item-message">
                              <span className="notifications-item-message-text">
                                Your karma is now 72
                              </span>
                          </div>
                      </div>
                      <div className="notifications-item-options">
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
              </div>

        </div>
        <div className="notifications-see-all">
            <a href="" type="button" className="see-all-button">
                <span className="see-all-text">
                    <span className="see-all-text-inner">See All</span>
                </span>
            </a>
        </div>
    </div>
  );
}

export default Notifications;
