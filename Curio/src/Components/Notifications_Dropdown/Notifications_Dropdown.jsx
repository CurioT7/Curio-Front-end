import React, { useState, useEffect } from 'react';
import "./Notifications_Dropdown.css"; 
import logo from "../../assets/Profile_navbar.png";
import { Popover, PopoverTrigger, PopoverContent, PopoverBody, Text, Button } from '@chakra-ui/react';
import { BsShield } from 'react-icons/bs';
import { PiLockSimpleFill } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { Tooltip } from "@chakra-ui/react";


function Notifications() {

  return (
    <div className="notifications-container">
      <div className="notifications-header">
          <div className="notifications-title">
              <span className="notifications-title-text">Notifications</span>
          </div>
          <a href="#" className="notifications-messages-link">
              <div className="notifications-messages">
                  <div className="notifications-messages-title">
                      <span className="notifications-messages-text">Messages</span>
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
              <a href="" className="notifications-item-link">
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
                          <Popover className="popover">
                              <PopoverTrigger>
                                  <Button
                                      variant='ghost'
                                      colorScheme='gray'
                                      className='moderator-icon'
                                  ><BsShield /></Button>
                              </PopoverTrigger>
                              <PopoverContent margin={0} padding={0} className="popover-content">
                                  <PopoverBody margin={0} padding={0} className="popover-body">
                                      <Text  margin={0} padding={3} className='moderator-content'>
                                          <div><PiLockSimpleFill className='moderator-content-icon' /><span>Hide Notification</span></div>
                                          <div><PiLockSimpleFill className='moderator-content-icon' /><span>Disable updates for community</span></div>
                                          <div><PiLockSimpleFill className='moderator-content-icon' /><span>Suggest Community when he doesn't have notifications</span></div>
                                      </Text>
                                  </PopoverBody>
                              </PopoverContent>
                          </Popover>
                      </div>
                  </div>
              </a>
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
