/**
 * Function component for the invite drawer.
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Whether the drawer is open.
 * @param {Function} props.onClose - Function to close the drawer.
 * @module InviteDrawer
 */
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
import TypeUsername from '../../OpenChatComRight_Side/NewChat/Type_Username/Type_Username';
import { handleToggleUser } from '../../OpenChatComRight_Side/NewChat/userFunctions';
import "./InviteDrawer.css";

function InviteDrawer({ isOpen, onClose }) {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [inputValue, setInputValue] = useState('');

    /**
     * Function to handle toggling users.
     * @param {string} image - The image of the user.
     * @param {string} username - The username of the user.
     */
    const handleUserToggle = (image, username) => {
        handleToggleUser(selectedUsers, setSelectedUsers, setInputValue, username, image);
    };

    /**
     * Function to handle input change.
     * @param {Object} e - The input change event.
     */
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
                    <TypeUsername
                        setInputValue={setInputValue}
                        inputValue={inputValue}
                        handleInputChange={handleInputChange}
                        handleToggleUser={handleUserToggle}
                        selectedUsers={selectedUsers}
                    />
                    <span style={{
                        color: '#576f76',
                        lineHeight: '1.25rem',
                        fontSize: '0.875rem'
                    }}>Search for people by username to invite them to this group.
                    </span>
                </DrawerBody>
                <DrawerFooter>
                    <Button
                        colorScheme='gray'
                        mr={3}
                        size='sm'
                        borderRadius="20px"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        colorScheme='blue'
                        size='sm'
                        borderRadius="20px"
                        style={{
                            // cursor: groupName.trim() ? 'pointer' : 'default'
                        }}
                    >
                        Send Invite
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

export default InviteDrawer;
