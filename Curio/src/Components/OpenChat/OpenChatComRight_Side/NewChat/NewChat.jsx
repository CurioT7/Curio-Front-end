import React, { useState } from 'react';
import { Button, Stack, Spacer } from '@chakra-ui/react';
import "./NewChat.css";
import HeaderChatRight_Side from "../../HeaderChatRight_Side/HeaderChatRight_Side";
import TypeUsername from './Type_Username/Type_Username';
import { handleToggleUser } from './userFunctions';

function NewChat() {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [inputValue, setInputValue] = useState('');

    const handleUserToggle = (image, username) => {
        handleToggleUser(selectedUsers, setSelectedUsers, setInputValue, username, image);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div className='chat-div'>
            <HeaderChatRight_Side header='New Chat' check='false' />
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
                                <TypeUsername
                                    setInputValue={setInputValue}
                                    inputValue={inputValue}
                                    handleInputChange={handleInputChange}
                                    handleToggleUser={handleUserToggle}
                                    selectedUsers={selectedUsers}
                                />
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
                                variant={groupName.trim() === '' ? 'none' : undefined}
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
