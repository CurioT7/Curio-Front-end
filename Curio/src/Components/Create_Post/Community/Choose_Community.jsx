/**
 * Choose_Community component for selecting a community.
 * @param {Object} props - The props object containing the component's properties.
 * @param {function} props.onSelect - The function to be called when a community is selected.
 * @param {string} props.subreddit - The currently selected subreddit.
 * @module ChooseCommunity
 */
import React, { useState, useEffect, useRef } from 'react';
import { Input, Icon } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import "./Choose_Community.css";
import profilepicture from "../../../assets/avatar_default_6.png";
import subbredditpicture from "../../../assets/avatar_default_2.png";
import axios from 'axios';
import { Button } from '@chakra-ui/react';
import CreateCommunity from '../../Sidebar/CreateCommunity.jsx';

const serverHost = import.meta.env.VITE_SERVER_HOST;

function Choose_Community({ onSelect, subreddit }) {
    const username = localStorage.getItem('username');
    const [inputValue, setInputValue] = useState(subreddit ? subreddit : '');
    const [userCommunities, setUserCommunities] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [inputFocused, setInputFocused] = useState(false);
    const [chosenItem, setChosenItem] = useState(subreddit ? subreddit : null);
    const [searchResults, setSearchResults] = useState([]);
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);
    const [isCreateCommunityModalOpen, setCreateCommunityModalOpen] = useState(false);
    const [profilepic, setProfilePic] = useState('');

    const handleCreateCommunityClick = () => {
        setCreateCommunityModalOpen(true);
    };

    const handleClick = (event) => {
        if (inputRef.current && inputRef.current.contains(event.target)) {
            setInputFocused(true);
            setDropdownVisible(true);
        } else if (dropdownRef.current && dropdownRef.current.contains(event.target)) {
            // Clicked inside the dropdown, do nothing
        } else {
            setInputFocused(false);
            setDropdownVisible(false);
        }
        if (event.target.classList.contains('community-arrow')) {
            setDropdownVisible(true); // Ensure dropdown opens when clicking the arrow
        }
    };

    const handleChange = async (event) => {
        const query = event.target.value;
        setInputValue(query);
        if (query.trim() !== '') {
            fetchSearchResults(query);
        } else {
            setSearchResults([]);
            setChosenItem(null);
            onSelect(null);
        }
    };

    useEffect(() => {
        if (inputValue.trim() === '') {
            setSearchResults([]);
        }
    }, [inputValue]);

    useEffect(() => {
        if (subreddit !== null) {
            handleItemClick(`r/${subreddit}`);
        }
    }, [subreddit]);


    const fetchSearchResults = async (query) => {
        try {
            const response = await axios.get(
                `${serverHost}/api/searchCommunities/${query}`
            );
            setSearchResults(response.data.subreddits);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const handleInputFocus = () => {
        setInputFocused(true);
    };

    const handleItemClick = (item) => {
        if (item) {
            setChosenItem(item);
            setInputValue(item.community || item);
            setDropdownVisible(false);
            onSelect(item.community ? item.community : item);
        }
        if (inputValue.trim() === '') {
            onSelect(null)
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    const fetchUserData = async () => {
        try {
            const communityDataResponse = await axios.get(
                `${serverHost}/api/user/${username}/communities`
            );
            return { communityData: communityDataResponse.data };
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    console.error('User preferences not found');
                } else if (error.response.status === 500) {
                    console.error('An unexpected error occurred on the server. Please try again later.');
                }
            } else {
                console.error('Network Error. Please check your internet connection.');
            }
        }
    };

    const FetchProFileImage = async () => {
        try {
            const ProfilePicDataResponse = await axios.get(
                `${serverHost}/api/user/${username}/about`
            );
            return ProfilePicDataResponse;
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    console.error('User not found');
                } else if (error.response.status === 500) {
                    console.error('An unexpected error occurred on the server. Please try again later.');
                }
            } else {
                console.error('Network Error. Please check your internet connection.');
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchUserData();
            if (data) {
                setUserCommunities(data.communityData.communities);
            }
        };

        const fetchDataprofile = async () => {
            const data = await FetchProFileImage();
            if (data) {
                setProfilePic(data.data.profilePicture)
            }
        }

        fetchDataprofile();
        fetchData();
    }, []);

    const handleArrowClick = () => {
        if (dropdownVisible) {
            setDropdownVisible(false);
        } else {
            setDropdownVisible(true);
        }
    };


    return (
        <>
            <div className="outer-div">
                <div className="middle-div">
                    <div className="inner-div">
                        {inputFocused ? (
                            <Icon as={FaSearch} className="search-icon-community" />
                        ) : (
                            chosenItem ? (
                                (typeof chosenItem === 'string' && chosenItem.startsWith("u/")) ? (
                                    <img
                                        src={profilepic ? profilepic : profilepicture}
                                        alt="Profile Picture"
                                        style={{
                                            height: '25px',
                                            width: '25px',
                                            borderRadius: '50%'
                                        }}
                                        className="username-image"
                                    />
                                ) : (
                                    <img
                                        src={searchResults.icon ? searchResults.icon : subbredditpicture}
                                        alt="Subreddit Picture"
                                        style={{
                                            height: '25px',
                                            width: '25px',
                                            borderRadius: '50%'
                                        }}
                                        className="username-image"
                                    />
                                )
                            ) : (
                                <span className="circle-dot" />
                            )
                        )}
                        <div className="input-container">
                            <Input
                                ref={inputRef}
                                variant='unstyled'
                                placeholder='Choose a community'
                                spellCheck={false}
                                value={inputValue}
                                onChange={handleChange}
                                onFocus={handleInputFocus}
                                style={{ caretColor: '#0079d3' }} />
                            {dropdownVisible && (
                                <div ref={dropdownRef} className='dropdown-list-choose-community'>
                                    <div className='dropdown-content-username container mt-2'>
                                        <p className='title-username container'>Your Profile</p>
                                        <div className='dropdown-user'>
                                            <img
                                                src={profilepic ? profilepic : profilepicture}
                                                style={{
                                                    height: '25px',
                                                    width: '25px',
                                                    borderRadius: '50%'
                                                }}
                                                alt="Profile Picture"
                                                className='username-image'
                                                onClick={() => handleItemClick(`u/${username}`)} />
                                            <div className='username-section'>
                                                <p
                                                    className='dropdown-username'
                                                    onClick={() => handleItemClick(`u/${username}`)}>
                                                    u/{username}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='dropdown-content-community container mt-2'>
                                        <div
                                            className='heading-content-community'
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginBottom: ''
                                            }}
                                        >
                                            <p className='title-community container' style={{ marginBottom: '0' }}>Your Communities</p>
                                            <Button
                                                onClick={handleCreateCommunityClick}
                                                className="post-button"
                                                size='xs'
                                                variant='outline'
                                                color='blue'
                                                border='transparent'
                                                padding='0 20px'
                                                borderRadius='25px'>
                                                Create New
                                            </Button>
                                        </div>
                                        {userCommunities.map(community => (
                                            <div key={community._id} className='dropdown-user' onClick={() => handleItemClick({ community: `r/${community.name}` })}>
                                                <img
                                                    src={community.icon ? community.icon : subbredditpicture}
                                                    style={{
                                                        height: '25px',
                                                        width: '25px',
                                                        borderRadius: '50%'
                                                    }}
                                                    alt="Community Picture"
                                                    className='community-image' />
                                                <div className='username-section'>
                                                    <p
                                                        className='dropdown-community'
                                                        onClick={() => handleItemClick(community.name)}>
                                                        r/{community.name}
                                                    </p>
                                                    <p style={{ fontSize: '12px', color: '#878a8c' }}>
                                                        {community.memberCount} {community.memberCount === 1 ? 'member' : 'members'}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {searchResults.length > 0 && (
                                        <div className='dropdown-content-search-results container mt-2'>
                                            {searchResults.map((community) => (
                                                inputValue.trim() !== '' && community.name.toLowerCase().includes(inputValue.trim().toLowerCase()) && (
                                                    <div key={community.name} className='dropdown-user' onClick={() => handleItemClick({ community: `r/${community.name}` })}>
                                                        <img
                                                            src={community.icon ? community.icon : subbredditpicture}
                                                            style={{
                                                                height: '25px',
                                                                width: '25px',
                                                                borderRadius: '50%'
                                                            }}
                                                            alt="Community Icon"
                                                            className='community-image' />
                                                        <div className='username-section'>
                                                            <p className='dropdown-community' onClick={() => handleItemClick({ community: `r/${community.name}` })}>
                                                                r/{community.name}
                                                            </p>
                                                            <p style={{ fontSize: '12px', color: '#878a8c' }}>
                                                                {community.members} {community.members === 1 ? 'member' : 'members'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )
                                            ))}
                                        </div>
                                    )}

                                </div>
                            )}
                        </div>
                        <div className="icon-container" onClick={handleArrowClick}>
                            <i className={`community-arrow fa-solid fa-angle-down ${dropdownVisible ? 'arrow-clicked' : ''}`}></i>
                        </div>
                    </div>
                </div>
            </div>
            <CreateCommunity show={isCreateCommunityModalOpen} onHide={() => setCreateCommunityModalOpen(false)} />
        </>
    );
}

export default Choose_Community;