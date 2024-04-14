import React, { useState, useEffect, useRef } from "react";
import "./Community_details.css";
import logo from "../../../assets/Curio_logo.png";
import coverImage from "../../../assets/cover.png";
import { FormControl, Switch, FormLabel } from "@chakra-ui/react";

function Community_details() {
    const [isSwitch, setIsSwitch] = useState(true);
    const [isOptionsExpanded, setIsOptionsExpanded] = useState(false);

    const handleSwitchChange = () => {
        setIsSwitch(!isSwitch);
    };

    const getIcon = () => {
        return isSwitch ? "fa-regular fa-eye" : "fa-regular fa-eye-slash";
    };

    const toggleOptions = () => {
        setIsOptionsExpanded(!isOptionsExpanded);
    };

    return (
        <div className={`community-details ${isSwitch ? 'switch-on' : 'switch-off'}`}>
            <div className="community-details-header">
                <div className="community-details-container">
                    <div className="community-details-logo"></div>
                    <div className="community-details-info">
                        <img src={logo} alt="Subreddit Icon" role="presentation" className="community-details-icon" />
                        <div className="community-details-link">
                            <a href="" className="community-link" target="_blank" rel="noopener noreferrer">
                                <span className="community-name" title="r/">r/announcements</span>
                            </a>
                        </div>
                    </div>
                    <div className="community-details-description">
                        <div className="community-details-description-text">
                            Official announcements from Reddit, Inc.
                        </div>
                    </div>
                    <div className="community-details-created">
                        <div className="community-created-date">
                            <i className="created-date-icon fa-solid fa-cake-candles"/>
                            <span className="community-created-date">
                                Created Jun 17, 2009
                            </span>
                        </div>
                    </div>
                    <div className="community-details-divider"/>
                    <hr className="hr-divider-community"/>
                    <div className="community-details-members">
                        <div className="community-details-members-count">
                            298m
                        </div>
                        <p className="community-details-members-label">Members</p>
                    </div>
                    <div className="community-details-actions">
                        <button role="button" tabindex="0" className="community-details-options" onClick={toggleOptions}>
                            Community options
                            <i className={`fa-solid fa-caret-${isOptionsExpanded ? 'up' : 'down'}`}/>
                        </button>
                        {isOptionsExpanded && (
                            <FormControl display='flex' alignItems='center' justifyContent='space-between' margin='8px 0'>
                                <FormLabel htmlFor='community-theme' mb='0'>
                                    <i className={getIcon()} style={{marginRight:'8px'}}/>Community theme
                                </FormLabel>
                                <Switch 
                                    colorScheme='orange' 
                                    id='community-theme' 
                                    isChecked={isSwitch} 
                                    onChange={handleSwitchChange}
                                />
                            </FormControl>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Community_details;
