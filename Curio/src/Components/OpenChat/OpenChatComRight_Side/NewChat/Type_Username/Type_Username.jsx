import React from 'react';
import { Image } from '@chakra-ui/react';
import { FaRegSquare } from "react-icons/fa";
import { BsCheckSquareFill } from "react-icons/bs";
import profile from "../../../../../assets/avatar_default_6.png";

function TypeUsername({ inputValue, handleInputChange, handleToggleUser, selectedUsers }) {
    return (
        <div className="form-floating">
            <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Type username(s)"
                style={{ borderRadius: '1rem' }}
                value={inputValue}
                onChange={handleInputChange}
            />
            <label htmlFor="floatingInput">Type username(s)<span style={{ color: 'red' }}>*</span></label>
            <div className='new-chat-form-container'>
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
                <li className='chat-li' onClick={() => handleToggleUser(profile, 'sui')} >
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
                            sui
                        </span>
                        <span
                            style={{
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            {selectedUsers.some(user => user.username === 'sui') ? <BsCheckSquareFill /> : <FaRegSquare />}
                        </span>
                    </div>
                </li>
            </div>
        </div>
    );
}

export default TypeUsername;
