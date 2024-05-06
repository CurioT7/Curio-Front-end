import React, { useEffect, useState } from 'react';
import { Image } from '@chakra-ui/react';
import { FaRegSquare } from "react-icons/fa";
import { BsCheckSquareFill } from "react-icons/bs";
import profile from "../../../../../assets/avatar_default_6.png";
import { CheckUsernaemExist } from "../../../../../Pages/Open_Chat_Page/Open_Chat_Page";

function TypeUsername({ setInputValue, inputValue, handleInputChange, handleToggleUser, selectedUsers }) {
    const [showSuggested, setShowSuggested] = useState(true);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        const checkSuggested = async () => {
            if (inputValue.trim() === '') {
                setShowSuggested(true);
                setShowError(false);
            } else {
                const success = await CheckUsernaemExist(inputValue.trim());
                setShowSuggested(!success);
                setShowError(false);
            }
        };

        checkSuggested();
    }, [inputValue]);

    const handleInputFocus = () => {
        if (inputValue.trim() === '') {
            setShowSuggested(true);
        }
    };

    const handleKeyPress = async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const success = await CheckUsernaemExist(inputValue.trim());
            setShowError(success);
        }
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
                onChange={(e) => {
                    setInputValue(e.target.value);
                    handleInputChange(e);
                }}
                onFocus={handleInputFocus}
                onKeyPress={handleKeyPress}
            />
            <label htmlFor="floatingInput">Type username(s)<span style={{ color: 'red' }}>*</span></label>
            {showSuggested && (
                <div className='new-chat-form-container'
                    style={{
                        minHeight: !inputValue.trim() ? '100px' : '50px'
                    }}>
                    {!inputValue.trim() && (
                        <>
                            <div className='suggested-div'>Suggested</div>
                            <li className='chat-li' onClick={() => handleToggleUser(profile, 'General_Boat_962')} >
                                <div className='container-li-chat'>
                                    <span className='span-li-chat'>
                                        <Image
                                            boxSize='32px'
                                            objectFit='cover'
                                            src={profile}
                                            alt='Dan Abramov'
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                borderRadius: '20px'
                                            }}
                                        />
                                        General_Boat_962
                                    </span>
                                    <span
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                    >
                                        {selectedUsers.some(user => user.username === 'General_Boat_962') ? <BsCheckSquareFill /> : <FaRegSquare />}
                                    </span>
                                </div>
                            </li>
                        </>
                    )}
                    {inputValue.trim() && (
                        <li className='chat-li' onClick={() => handleToggleUser(profile, inputValue.trim())} >
                            <div className='container-li-chat'>
                                <span className='span-li-chat'>
                                    <Image
                                        boxSize='32px'
                                        objectFit='cover'
                                        src={profile}
                                        alt='Profile'
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            borderRadius: '20px'
                                        }}
                                    />
                                    {inputValue.trim()}
                                </span>
                                <span
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    {selectedUsers.some(user => user.username === inputValue.trim()) ? <BsCheckSquareFill /> : <FaRegSquare />}
                                </span>
                            </div>
                        </li>
                    )}
                </div>
            )}
            {showError && (
                <div style={{ color: 'red' }}>Invalid username</div>
            )}
        </div>
    );
}

export default TypeUsername;