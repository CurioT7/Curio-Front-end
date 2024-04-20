import React from "react";
import './Notifications.css';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import "../Notifications_Dropdown/Notifications_Dropdown.css"; 
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
import {useNavigate} from 'react-router-dom';


function Notifications() {
    const navigate = useNavigate();

  return (
    <> 
    <div className="notification-page">
      <div className="notification-content">
        <h5>Notifications</h5>
        <div className="notification-list"> 
          <Tabs position='relative' variant='unstyled'>
            <TabList>
              <Tab>Notifications</Tab>
            <Tab onClick={() => navigate('/messages')}>Messages</Tab>            
            </TabList>
            <TabPanels>
              <TabPanel>
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
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </div>
    </>
  );
}

export default Notifications;