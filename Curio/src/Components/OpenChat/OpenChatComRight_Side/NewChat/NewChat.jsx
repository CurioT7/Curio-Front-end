import React, { useState } from 'react';
import profile from "../../../../assets/avatar_default_6.png";
import { FaRegSquare } from "react-icons/fa";
import { BsCheckSquareFill } from "react-icons/bs";
import "./NewChat.css";
import { Image, Button, Stack, Spacer } from '@chakra-ui/react';
import HeaderChatRight_Side from "../../HeaderChatRight_Side/HeaderChatRight_Side";

function NewChat() {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [inputValue, setInputValue] = useState('');

    const handleToggleUser = (image, username) => {
        const isUserSelected = selectedUsers.some(user => user.username === username);
        if (isUserSelected) {
            // User is already selected, remove them
            const updatedUsers = selectedUsers.filter(user => user.username !== username);
            setSelectedUsers(updatedUsers);
            setInputValue(prevInputValue => {
                // Filter out the username from the input value
                const usernames = prevInputValue.split(',').map(name => name.trim());
                const updatedUsernames = usernames.filter(name => name !== username);
                return updatedUsernames.join(', ');
            });
        } else {
            // User is not selected, add them
            setSelectedUsers([...selectedUsers, { image, username }]);
            setInputValue(prevInputValue => prevInputValue ? `${prevInputValue}, ${username}` : username);
        }
    };
    
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        
    };

    return (
        <div className='chat-div'>
            <HeaderChatRight_Side header='New Chat' check='false'/>
            <form className='chat-form'>
                <main className='chat-main'>
                    <div>
                        <span>
                            <div>
                                {selectedUsers.length > 1 && (
                                    <div className="form-floating" style={{ marginBottom: '.5rem' }}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="Group Name"
                                            style={{
                                                borderRadius: '1rem',
                                                background: 'transparent',
                                                transition: 'background 0.3s'
                                            }}
                                            onMouseEnter={(e) => e.target.style.background = '#ccc'}
                                            onMouseLeave={(e) => e.target.style.background = 'transparent'}
                                            value={groupName}
                                            onChange={(e) => setGroupName(e.target.value)}
                                        />
                                        <label htmlFor="floatingInput">Group Name<span style={{ color: 'red' }}>*</span></label>
                                    </div>
                                )}
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
                                </div>
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
                        </span>
                    </div>
                </main>
                <div className='buttons-section-chat'>
                    <Stack spacing={4} direction='row-reverse' align='center'>
                        <Spacer />
                        {selectedUsers.length > 1 ? (
                            <Button
                                colorScheme='gray'
                                color={groupName.trim() === '' ? 'gray' : undefined}
                                variant={groupName.trim() === '' ? 'none' : 'ghost'}
                                size='sm'
                                borderRadius="20px"
                                style={{
                                    cursor: groupName.trim() === '' ? 'default' : 'pointer'
                                }}
                            >
                                Start Group Chat
                            </Button>
                        ) : (
                            <Button colorScheme='gray' size='sm' borderRadius="20px">
                                Start Chat
                            </Button>
                        )}
                        <Button colorScheme='gray' size='sm' borderRadius="20px">
                            Cancel
                        </Button>
                    </Stack>
                </div>
            </form>
        </div>
    );
}

export default NewChat;
