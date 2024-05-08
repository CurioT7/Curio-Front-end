import React, { useState, useEffect, useRef } from "react";
import "./CommunityDetails.css";
import logo from "../../../../assets/Curio_logo.png";
import { useToast, FormControl, FormLabel, Switch } from "@chakra-ui/react";
import { VscActivateBreakpoints } from "react-icons/vsc";
import SocialLink from "../../../profileSetting/Socialmodal/Socialmodal";
import { Link } from "react-router-dom";
import { fetchUserDataFromBackend } from "../../../UserSetting/UserSettingsEndPoints";
import profile from "../../../../assets/avatar_default_6.png";
import subbredditprofilepic from "../../../../assets/avatar_default_2.png";
import bannersubreddit from "../../../../assets/cover.png";
import { formatDatewithDays } from "../../../getTimeDifference/getTimeDifference"

function Community_details({ subredditData, community }) {
    const username = localStorage.getItem('username');
    const [isSwitch, setIsSwitch] = useState(true);
    const [isOptionsExpanded, setIsOptionsExpanded] = useState(false);
    const [SocialLinks, setSocialLinks] = useState([]);
    const toast = useToast();

    function Toast() {
        toast({

            description: "Changes Saved",
            status: 'info',
            duration: 3000,
            isClosable: true,
        })
    }

    const buttonStyle = {
        borderRadius: "30px",
        padding: "10px 15px",
    };

    useEffect(() => {
        const fetchSubredditData = async () => {
            const data = await fetchUserDataFromBackend();
            if (data) {
                setSocialLinks(data.socialLinks ?
                    data.socialLinks.map(link => ({
                        url: link.url,
                        displayName: link.displayName,
                        platform: `fa-brands fa-${link.platform.toLowerCase()}`,
                    })) : []);
            }
        };

        fetchSubredditData();
    }, []);


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

    return (
        <div className={`community-details ${isSwitch ? 'switch-on' : 'switch-off'}`}>
            <div className="community-details-header">
                {subredditData && (
                    <div className="community-details-container">
                        {community.community !== username ? (
                            <div className="community-details-logo"
                                style={{
                                    background: isSwitch ? `url(${subredditData.banner ? subredditData.banner : bannersubreddit}) no-repeat center/cover` : '#fc471e'
                                }} />
                        ) : (
                            <div className="file-upload-container-username top-1 start-1"
                                style={{
                                    background: `url(${subredditData.banner ? subredditData.banner : '#33a8ff'})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    borderRadius: '4px 4px 0 0',
                                    height: '94px',
                                    width: 'calc(100% - 2px)',
                                    position: 'absolute',
                                    top: '1px',
                                    left: '1px'
                                }}>
                                <div className="file-input-wrapper-username">
                                    <label htmlFor="" className="file-label-username" style={{ cursor: 'pointer' }}>
                                        <div className="file-preview-container-username">
                                            <input type="file" accept="image/x-png,image/jpeg" className="file-input-banner-username" />
                                        </div>
                                        <Link to={`/settings/profile`} className="file-banner-container-username">
                                            <i className="fa-solid fa-camera add-banner" />
                                        </Link>
                                    </label>
                                </div>
                            </div>
                        )}
                        {community.community !== username ? (
                            <>
                                <div className="community-details-info">
                                    <img src={subredditData.icon ? subredditData.icon : subbredditprofilepic}
                                        alt="Subreddit Icon"
                                        role="presentation"
                                        className="community-details-icon" />
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
                            </>
                        ) : (
                            <>
                                <div className="post-card-username"
                                    style={{
                                        background: 'inherit',
                                        borderRadius: '6px',
                                        boxSizing: 'border-box',
                                        height: '86px',
                                        marginLeft: '-3px',
                                        marginTop: '16px',
                                        padding: '3px',
                                        position: 'relative',
                                        width: '86px'
                                    }}>
                                    <div className="post-header-username">
                                        <label htmlFor="" className="post-label-username" style={{ cursor: 'pointer' }}>
                                            <span class="icon-container-username">
                                                <div className="username-icon-container">
                                                    <img src={subredditData.profilePicture ? subredditData.profilePicture : profile}
                                                        alt="Username Icon"
                                                        role="presentation"
                                                        className="username-details-icon"
                                                        style={{
                                                            borderRadius: '4px',
                                                            objectFit: 'cover',
                                                            objectPosition: 'top',
                                                            color: 'white',
                                                            textIndent: '-9999px',
                                                            boxSizing: 'border-box',
                                                            border: '1px solid #edeff1',
                                                            height: '100%',
                                                            width: '100%'
                                                        }} />
                                                </div>
                                            </span>
                                            <div className="file-preview-container-username">
                                                <input type="file" accept="image/x-png,image/jpeg" className="file-input-icon-username" />
                                            </div>
                                            <Link to={`/settings/profile`} className="file-icon-container-username">
                                                <i className="fa-solid fa-camera add-icon"></i>
                                            </Link>
                                        </label>
                                    </div>
                                </div>
                                <Link to={"/settings/profile"} className="settings-link-username"
                                    style={{
                                        display: 'inline-block',
                                        marginTop: '-16px',
                                        padding: '4px',
                                        position: 'absolute',
                                        right: '12px'
                                    }}>
                                    <i className="fa-solid fa-gear setting-cards" />
                                </Link>
                                <h4 className="subreddit-title-username">
                                    {subredditData.displayName}
                                </h4>
                                <Link to={`/profile/${username}`} className='username-link'>
                                    u/ {username}
                                </Link>
                                <div>{subredditData.about}</div>
                            </>
                        )}
                        {community.community !== username ? (
                            <>
                                <div className="community-details-created">
                                    <div className="community-created-date">
                                        <i className="created-date-icon fa-solid fa-cake-candles" />
                                        <span className="community-created-date">
                                            Created {formatDatewithDays(subredditData.createdAt)}
                                        </span>
                                    </div>
                                </div>
                                {
                                    subredditData.privacyMode !== "public" ? (
                                        <div style={{ display: 'flex', marginTop: '8px', alignItems: 'center' }}>
                                            <span><i className="fa-regular fa-eye-slash"></i></span>
                                            {subredditData.privacyMode === "private" ? (
                                                <span>Private</span>
                                            ) : (
                                                <span>Restricted</span>
                                            )
                                            }
                                        </div>
                                    ) : null
                                }
                                <div className="community-details-divider" />
                                <hr className="hr-divider-community" />
                                <div className="community-details-members">
                                    <div className="community-details-members-count">
                                        {subredditData.members}
                                    </div>
                                    <p className="community-details-members-label">
                                        {subredditData.members === 1 ? 'Member' : 'Members'}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <div className="info-container-username">
                                <div className="info-item-username">
                                    <h5 className="info-title-username">Karma</h5>
                                    <div className="info-content-username">
                                        <VscActivateBreakpoints color="#24a0ed" />
                                        <span className="info-value-username">{subredditData.karma}</span>
                                    </div>
                                </div>
                                <div className="info-item-username">
                                    <h5 className="info-title-username">Cake day</h5>
                                    <div className="info-content-username">
                                        <i className="created-date-icon fa-solid fa-cake-candles" style={{ color: '#24a0ed' }} />
                                        <span className="info-value-username">{formatDatewithDays(subredditData.createdAt)}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        {community.community !== username ? (
                            <div className="community-details-actions">
                                <button role="button" tabindex="0" className="community-details-options" onClick={toggleOptions}>
                                    Community options
                                    <i className={`fa-solid fa-caret-${isOptionsExpanded ? 'up' : 'down'}`} />
                                </button>
                                {isOptionsExpanded && (
                                    <FormControl display='flex' alignItems='center' justifyContent='space-between' margin='8px 0'>
                                        <FormLabel htmlFor='community-theme' mb='0'>
                                            <i className={getIcon()} style={{ marginRight: '8px' }} />Community theme
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
                        ) : (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: "0.5em" }}>
                                <SocialLink buttonStyle={buttonStyle} SocialLinks={SocialLinks} />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Community_details;