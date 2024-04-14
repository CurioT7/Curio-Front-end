import React, { useState, useEffect, useRef } from "react";
import { Input, Icon, List, ListItem } from '@chakra-ui/react';
import { FaAngleDown, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import "./Choose_Community.css";
import profile from "../../../assets/Profile_navbar.png";

const serverHost = import.meta.env.VITE_SERVER_HOST;

function Choose_Community() {
    const [communities, setCommunities] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [inputFocused, setInputFocused] = useState(false);
    const [username, setUsername] = useState(null);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showList, setShowList] = useState(false); 
    const [communityNames, setcommunityNames] = useState([]);
    const [arrowClicked, setArrowClicked] = useState(false);
    const inputRef = useRef(null); 

    const handleChange = (event) => {
        setInputValue(event.target.value.trim());
        if (event.target.value.trim() !== '') {
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion, index) => {
        const splitText = suggestion.text.split('\n');
        const newText = splitText.length > 1 ? splitText[1] : suggestion.text;
        setInputValue(newText); // Set input value to the text of the clicked suggestion, or the whole suggestion if no text after newline
        setShowSuggestions(false);
    };
    

    const handleInputFocus = () => {
        setShowSuggestions(true);
        setInputFocused(true);
    };

    const handleInputBlur = () => {
        setInputFocused(false);
    };

    const handleArrowClick = (event) => {
        event.stopPropagation();
        setShowList(!showList);
        inputRef.current.focus(); 
        setArrowClicked(true);
    };

    async function fetchDataFromBackend() {
        try {
            const response = await axios.get(
                `${serverHost}/api/settings/v1/me/prefs`,
                {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            if (error.response){
                switch (error.response.status) {
                    case 404:
                        Toast('User preferences not found');
                        break;    
                    case 500:
                        Toast('An unexpected error occurred on the server. Please try again later.');
                        break;
                    default:
                        break;
                }
            }
        }
    }

    async function fetchCommunitiesFromBackend() {
        try {
            const response = await axios.get(`${serverHost}/user/${localStorage.getItem("username")}/communities`, {
              headers: {
                'Content-Type': 'application/json'
              }
            });
            return response.data;

          } catch (error) {
            if (error.response) {
              if (error.response.status === 404) {
                console.error('User not found.');
              } else if (error.response.status === 500) {
                console.error('Internal Server Error. Please try again later.');
              } else {
                console.error('An unexpected error occurred.');
              }
            } else {
                console.error('Network Error. Please check your internet connection.');
            }
          }
    }
    
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchCommunitiesFromBackend();
            if (data){
                setCommunities(data.communities);
                setcommunityNames(data.communities.map(community => community.name));

            }
        };
    
        fetchData();
    
      }, []);
    

    useEffect(() => {
        async function fetchAndSetData() {
            const data = await fetchDataFromBackend();
            if (data) {
                setUsername(data.username);
            }
        } 
    
        fetchAndSetData();

        document.body.addEventListener("click", handleClickOutside);

        return () => {
            document.body.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (!inputRef.current.contains(event.target)) {
            setShowSuggestions(false);
            setInputFocused(false);
            setArrowClicked(false);
        }
    };

    const suggestions = [
        { text: `Your Profile\nu/${username}`, image: profile },
        ...communityNames.map((communityName, index) => {
            if (index === 0) {
                return { text: `Your Communities\nr/${communityName}`, image: profile };
            } else {
                return { text: `r/${communityName}`, image: profile }; // Replace 'profile' with actual community image URL if available
            }
        })
    ];

    // Filter suggestions based on input value
    const filteredSuggestions = suggestions.filter(suggestion => {
        const lowerCaseInput = inputValue.toLowerCase();
        return suggestion.text.toLowerCase().includes(lowerCaseInput);
    });

    return (
        <div className="outer-div">
            <div className="middle-div"
            style={{
                borderRadius: showList ? '0' : '4px',
                boxShadow: showList ? '0 0 0 1px #F5f5f5' : 'md'
            }}>
                <div className="inner-div">
                    {inputFocused || arrowClicked  ? (
                        <Icon as={FaSearch} className="search-icon-community"/>
                    ) : (
                        <span className="circle-dot" />
                    )}
                    <div className="input-container">
                        <Input 
                            variant='unstyled' 
                            placeholder='Choose a community' 
                            spellCheck={false}
                            value={inputValue}
                            onChange={handleChange}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            onMouseEnter={() => setShowList(true)}
                            ref={inputRef}
                            style={{caretColor: '#0079d3'}}
                        />
                        {showSuggestions && showList && (
                            <List
                                mt={2}
                                position="absolute"
                                zIndex="1"
                                width="100%"
                                bg="white"
                                borderRadius="md"
                                boxShadow="md"
                                left="0"
                                top="100%"
                                style={{paddingLeft:'0'}}
                                onMouseLeave={() => setShowList(false)}
                            >
                                {filteredSuggestions.map((suggestion, index) => (
                                    <ListItem
                                        key={index}
                                        onClick={() => handleSuggestionClick(suggestion, index)}
                                        cursor="pointer"
                                        px={3}
                                        py={2}
                                        style={{
                                            borderBottom: index === 0 ? '1px solid rgb(135, 138, 140)' : 'inherit',
                                            marginBottom: index === 1 ? '5px' : '0' // Applying margin bottom only for the second suggestion
                                        }}
                                    >
                                        <>
                                            {suggestion.text.includes('\n') ? ( // Check if the suggestion has text following the newline character
                                                <div>
                                                    <div style={{ fontSize: '13px', color: 'rgb(135, 138, 140)', marginLeft: '7px', cursor: 'default'}}>
                                                        {suggestion.text.split('\n')[0]}
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '7px' }}>
                                                        <img src={suggestion.image} alt="profile" style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }} />
                                                        <div>{suggestion.text.split('\n')[1]}</div>
                                                    </div>
                                                </div>
                                            ) : ( // Render a div for suggestions without text title
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <img src={suggestion.image} alt="profile" style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }} />
                                                    <div>{suggestion.text}</div>
                                                </div>
                                            )}
                                        </>
                                    </ListItem>
                                ))}
                            </List>
                        )}
                    </div>
                    <div className="icon-container">
                        <Icon as={FaAngleDown} className="community-arrow" onClick={handleArrowClick} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Choose_Community;
