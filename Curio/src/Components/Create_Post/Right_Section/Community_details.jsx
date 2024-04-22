import React, { useState, useEffect, useRef } from "react";
import "./Community_details.css";
import logo from "../../../assets/Curio_logo.png";
import { FormControl, Switch, FormLabel, useToast } from "@chakra-ui/react";
import axios from "axios"; 

const serverHost = import.meta.env.VITE_SERVER_HOST;
function Community_details({ community }) {
    console.log(community.community);
    const [subredditData, setSubredditData] = useState(null);
    const [isSwitch, setIsSwitch] = useState(true);
    const [isOptionsExpanded, setIsOptionsExpanded] = useState(false);
    const toast = useToast();

    
    function Toast(){
        toast({
            
            description: "Changes Saved",
            status: 'info',
            duration: 3000,
            isClosable: true,
          })
    }

    useEffect(() => {
        if (community.community !== null) {
            fetchSubredditData();
        }
    }, [community]);

    const fetchSubredditData = async () => {
        try {
            const response = await axios.get(`${serverHost}/api/subredditOverview/${community.community}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setSubredditData(response.data);
        } catch (error) {
            console.error("Error fetching subreddit data:", error);
        }
    };

    const handleSwitchChange = () => {
        setIsSwitch(!isSwitch);
        Toast();
    };

    const getIcon = () => {
        return isSwitch ? "fa-regular fa-eye" : "fa-regular fa-eye-slash";
    };

    const toggleOptions = () => {
        setIsOptionsExpanded(!isOptionsExpanded);
    };

    const renderCreatedAt = () => {
        if (subredditData && subredditData.createdAt) {
            const createdAtDate = new Date(subredditData.createdAt);
            return createdAtDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        }
        return '';
    };

    return (
        <div className={`community-details ${isSwitch ? 'switch-on' : 'switch-off'}`}>
            <div className="community-details-header">
                {subredditData && (
                    <div className="community-details-container">
                        <div className="community-details-logo"></div>
                        <div className="community-details-info">
                            <img src={logo} alt="Subreddit Icon" role="presentation" className="community-details-icon" />
                            <div className="community-details-link">
                                <a href="" className="community-link" target="_blank" rel="noopener noreferrer">
                                    <span className="community-name" title="r/">r/{subredditData.subreddit}</span>
                                </a>
                            </div>
                        </div>
                        <div className="community-details-description">
                            <div className="community-details-description-text">
                                {subredditData.description}
                            </div>
                        </div>
                        <div className="community-details-created">
                            <div className="community-created-date">
                                <i className="created-date-icon fa-solid fa-cake-candles"/>
                                <span className="community-created-date">
                                    Created {renderCreatedAt()}
                                </span>
                            </div>
                        </div>
                        <div className="community-details-divider"/>
                        <hr className="hr-divider-community"/>
                        <div className="community-details-members">
                            <div className="community-details-members-count">
                                {subredditData.members}
                            </div>
                            <p className="community-details-members-label">
                                {subredditData.members === 1 ? 'Member' : 'Members'}
                            </p>
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
                )}
            </div>
        </div>
    );
}

export default Community_details;
