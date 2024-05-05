import React, { useState } from 'react';
import {
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerCloseButton,
    DrawerFooter,
    Button,
    Image,
    Tooltip
} from "@chakra-ui/react";
import { MdAdminPanelSettings, MdBlockFlipped } from "react-icons/md";
import { FaRegSquare } from "react-icons/fa";
import { BsCheckSquareFill } from "react-icons/bs";
import "./InviteDrawer.css";

function InviteDrawer({ isOpen, onClose }) {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [displayedSection, setDisplayedSection] = useState('member');
    const [tooltipOpen, setTooltipOpen] = useState(false);

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
        <Drawer isOpen={isOpen} onClose={onClose} placement="right">
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Invite to chat</DrawerHeader>
                <DrawerBody className='about-drawer-body' padding='12px'>
                    <div className="form-floating" style={{ marginBottom: '.5rem' }}>
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
                    <div className='members-invite-about'>
                        {/* Rest of the JSX */}
                    </div>
                    {displayedSection === 'member' && (
                        <div className='member-section-about'>
                            {/* Rest of the JSX */}
                        </div>
                    )}
                    {displayedSection === 'invited' && (
                        <div className='invite-section-about'>
                            {/* Rest of the JSX */}
                        </div>
                    )}
                </DrawerBody>
                <DrawerFooter>
                    {/* Rest of the JSX */}
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

export default InviteDrawer;
