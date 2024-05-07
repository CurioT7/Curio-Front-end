import React, { useState, useEffect } from 'react';
import { Image } from '@chakra-ui/react';
import { FaRegSquare } from "react-icons/fa";
import { BsCheckSquareFill } from "react-icons/bs";
import { CheckUsernaemExist } from '../../../../../Pages/Open_Chat_Page/Open_Chat_Page';
import logo from "../../../../../assets/avatar_default_6.png";

function TypeUsername({ setInputValue, inputValue, handleInputChange, handleToggleUser, selectedUsers }) {
    const [suggestedUser, setSuggestedUser] = useState(null);
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        const fetchSuggestedUser = async () => {
            if (inputValue) {
                const response = await CheckUsernaemExist(inputValue);
                console.log("response:", response)
                if (response.success) {
                    setSuggestedUser({ username: response.username, profilePicture: response.profilePicture });
                    setIsSelected(selectedUsers.some(user => user.username === response.username));
                    console.log("suggestedUser:", suggestedUser)
                } else {
                    setSuggestedUser(null);
                }
            } else {
                setSuggestedUser(null);
            }
        };

        fetchSuggestedUser();
    }, [inputValue, selectedUsers]);

    const handleToggleUserSelection = () => {
        if (suggestedUser) {
            if (isSelected) {
                handleToggleUser(suggestedUser.profilePicture, suggestedUser.username);
            } else {
                handleToggleUser(suggestedUser.profilePicture, suggestedUser.username);
                setInputValue(suggestedUser.username);
            }
            setIsSelected(!isSelected);
        }
    };

    const handleChange = (e) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        handleInputChange(newValue);
    };

    return (
        <div className="form-floating">
            <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Type username(s)"
                style={{ borderRadius: '1rem' }}
                value={inputValue}
                onChange={handleChange}
            />
            <label htmlFor="floatingInput">Type username(s)<span style={{ color: 'red' }}>*</span></label>
            <div className='new-chat-form-container'>
                <div className='suggested-div'>Suggested</div>
                {suggestedUser && (
                    <li className='chat-li' onClick={handleToggleUserSelection}>
                        <div className='container-li-chat'>
                            <span className='span-li-chat'>
                                {suggestedUser.profilePicture ? (
                                    <Image
                                        boxSize='32px'
                                        objectFit='cover'
                                        src={suggestedUser.profilePicture}
                                        alt={suggestedUser.username}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            borderRadius: '20px'
                                        }}
                                    />
                                ) : (
                                    <Image
                                        boxSize='32px'
                                        objectFit='cover'
                                        src={logo}
                                        alt="Default"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            borderRadius: '20px'
                                        }}
                                    />
                                )}
                                {suggestedUser.username}
                            </span>
                            <span
                                style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                {isSelected ? <BsCheckSquareFill /> : <FaRegSquare />}
                            </span>
                        </div>
                    </li>
                )}
            </div>
        </div>
    );
}

export default TypeUsername;
