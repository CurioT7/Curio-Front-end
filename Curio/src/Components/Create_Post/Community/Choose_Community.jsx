import React, { useState, useEffect, useRef } from 'react';
import { Input, Icon } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import "./Choose_Community.css";
import profile from "../../../assets/Profile_navbar.png";
import axios from 'axios';
import { Button } from '@chakra-ui/react';
import CreateCommunity from '../../Sidebar/CreateCommunity.jsx';

const serverHost = import.meta.env.VITE_SERVER_HOST;

function Choose_Community({ onSelect }) {
    const [inputValue, setInputValue] = useState('');
    const [username, setUsername] = useState(null);
    const [userCommunities, setUserCommunities] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [inputFocused, setInputFocused] = useState(false);
    const [chosenItem, setChosenItem] = useState(null); 
    // const [membercount, setMemberCount] = useState(0);
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);
    const [isCreateCommunityModalOpen, setCreateCommunityModalOpen] = useState(false);

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
    };

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleUsernameClick = () => {
        setInputValue(`u/${username}`);
    };

    const handleInputFocus = () => {
        setInputFocused(true);
    };

    const handleItemClick = (item) => {
        setChosenItem(item); // Set chosen item when an item is clicked
        setInputValue(item.community || item); // Ensure that the selected item is either a community object or a string
        setDropdownVisible(false);
        onSelect(item.community ? item.community : item); // Pass the selected item without modifications if it's a string, or extract the community name if it's an object
    };
    
    

    useEffect(() => {
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    const fetchUserData = async () => {
        try {
            const userDataResponse  = await axios.get(
                `${serverHost}/api/settings/v1/me/prefs`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            const communityDataResponse = await axios.get(
                `${serverHost}/api/user/${userDataResponse.data.username}/communities`
            );
            return { userData: userDataResponse.data, communityData: communityDataResponse.data };
        } catch (error) {
            if (error.response) {
                // Handle different error status codes
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

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchUserData();
            if (data) {
                setUsername(data.userData.username);
                setUserCommunities(data.communityData.communities);
                // setMemberCount(data.communityData.communities);
            }
        };
    
        fetchData();
    }, []);
    
    return (
        <>
            <div className="outer-div">
                <div className="middle-div">
                    <div className="inner-div">
                        {inputFocused ? (
                            <Icon as={FaSearch} className="search-icon-community"/>
                        ) : (
                            chosenItem ? (
                                <img src={profile} alt="Profile Picture" className="username-image" />
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
                                style={{caretColor: '#0079d3'}} />
                            {dropdownVisible && (
                                <div ref={dropdownRef} className='dropdown-list-choose-community'>
                                    <div className='dropdown-content-username container mt-2'>
                                        <p className='title-username container'>Your Profile</p>
                                        <div className='dropdown-user'>
                                            <img 
                                                src={profile} 
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
                                            display:'flex', 
                                            alignItems: 'center', 
                                            marginBottom:''
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
                                                    src={profile} 
                                                    alt="Community Picture" 
                                                    className='community-image' />
                                                <div className='username-section'>
                                                    <p 
                                                        className='dropdown-community'
                                                        onClick={() => handleItemClick(community.name)}>
                                                        r/{community.name}
                                                    </p>
                                                    <p style={{fontSize: '12px', color:'#878a8c'}}>
                                                        {community.memberCount} {community.memberCount === 1 ? 'member' : 'members'}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="icon-container">
                            <i className="community-arrow fa-solid fa-angle-down"></i>
                        </div>
                    </div>
                </div>
            </div>
            <CreateCommunity show={isCreateCommunityModalOpen} onHide={() => setCreateCommunityModalOpen(false)} />
        </>
    );
}

export default Choose_Community;
