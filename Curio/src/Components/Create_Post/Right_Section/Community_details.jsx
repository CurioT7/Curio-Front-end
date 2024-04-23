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
                        {/* <div className="community-details-logo" /> */}
                        <div className="file-upload-container-username top-1 start-1"
                        style={{
                            backgroundColor:'#33a8ff',
                            borderRadius:'4px 4px 0 0',
                            height: '94px',
                            width:'calc(100% - 2px)',
                            position:'absolute',
                            top:'1px',
                            left:'1px'
                        }}>
                            <div className="file-input-wrapper-username">
                                <label htmlFor="" className="file-label-username" style={{cursor:'pointer'}}>
                                    <div className="file-preview-container-username">
                                        <input type="file" accept="image/x-png,image/jpeg" className="file-input-banner-username"/>
                                    </div>
                                    <div className="file-banner-container-username">
                                        <i className="fa-solid fa-camera add-banner"></i>
                                    </div>
                                </label>
                            </div>
                        </div>
                        {/* <div className="community-details-info">
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
                */}
                        <div className="post-card-username" 
                        style={{
                            background: 'inherit',
                            borderRadius: '6px',
                            boxSizing: 'border-box',
                            height: '86px',
                            marginLeft: '-3px',
                            marginTop: '16px',
                            padding: '3px',
                            position:'relative',
                            width:'86px'
                        }}>
                            <div className="post-header-username">
                                <label htmlFor="" className="post-label-username" style={{cursor: 'pointer'}}>
                                    <span class="icon-container-username">
                                        <div className="username-icon-container">
                                            <img src={logo} 
                                            alt="Username Icon" 
                                            role="presentation" 
                                            className="username-details-icon" 
                                            style={{
                                                borderRadius: '4px',
                                                objectFit:'cover',
                                                objectPosition:'top',
                                                color:'white',
                                                textIndent:'-9999px',
                                                boxSizing:'border-box',
                                                border: '1px solid #edeff1',
                                                height: '100%',
                                                width: '100%'
                                            }}/>
                                        </div>
                                    </span>
                                    <div className="file-preview-container-username">
                                        <input type="file" accept="image/x-png,image/jpeg" className="file-input-icon-username"/>
                                    </div>
                                    <div className="file-icon-container-username">
                                        <i className="fa-solid fa-camera add-icon"></i>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <a href="#" className="settings-link-username"
                        style={{
                            display:'inline-block',
                            marginTop:'-16px',
                            padding: '4px',
                            position: 'absolute',
                            right: '12px'
                        }}>
                            <i className="fa-solid fa-gear"/>
                        </a>
                        <h4>
                            {subredditData.displayName}
                        </h4>
                        <a href="#">
                            u/
                        </a>
                        {/* <div className="community-details-created">
                            <div className="community-created-date">
                                <i className="created-date-icon fa-solid fa-cake-candles"/>
                                <span className="community-created-date">
                                    Created {renderCreatedAt()}
                                </span>
                            </div>
                        </div> */}
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
