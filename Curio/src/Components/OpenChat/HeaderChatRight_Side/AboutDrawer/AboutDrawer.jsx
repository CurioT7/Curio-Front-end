/**
 * Function component for the About Drawer.
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Whether the drawer is open.
 * @param {Function} props.onClose - Function to close the drawer.
 * @module AboutDrawer
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
import { MdAdminPanelSettings, MdBlockFlipped } from "react-icons/md";
import "./AboutDrawer.css";

function AboutDrawer({ isOpen, onClose }) {
    const [displayedSection, setDisplayedSection] = useState('member');
    const [groupName, setGroupName] = useState('');
    const [tooltipOpen, setTooltipOpen] = useState(false); 

    /**
     * Handler for group name input change.
     * @param {Object} event - The input change event.
     */
    const handleGroupNameChange = (event) => {
        setGroupName(event.target.value);
    };

    return (
        <Drawer isOpen={isOpen} onClose={onClose} placement="right">
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Chat information</DrawerHeader>
                <DrawerBody className='about-drawer-body' padding='12px'>
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
                            value={groupName}
                            onChange={handleGroupNameChange}
                            onMouseEnter={(e) => e.target.style.background = '#ccc'}
                            onMouseLeave={(e) => e.target.style.background = 'transparent'}
                        />
                        <label htmlFor="floatingInput">Group Name<span style={{ color: 'red' }}>*&nbsp;*</span></label>
                    </div>
                    <div className='members-invite-about'>
                        <Button 
                        colorScheme='gray' 
                        variant={displayedSection === 'member' ? 'solid' : 'ghost'} 
                        borderRadius="25px"
                        onClick={() => setDisplayedSection('member')}
                        >
                            2 Members
                        </Button>
                        <Button 
                        colorScheme='gray' 
                        variant={displayedSection === 'invited' ? 'solid' : 'ghost'} 
                        borderRadius="25px"
                        onClick={() => setDisplayedSection('invited')}
                        >
                            2 Invited
                        </Button>
                    </div>
                    {displayedSection === 'member' && (
                    <div className='member-section-about'>
                        <div className='admin-member-about'>
                            <span className='image-admin-member-about'>
                                <Image
                                    borderRadius='full'
                                    boxSize='2rem'
                                    margin='0.5rem'
                                    src='https://bit.ly/dan-abramov'
                                    alt='Dan Abramov'
                                    cursor='pointer'
                                />
                            </span>
                            <span className='detail-admin-member-about'>
                                <p className='admin-name-chat-group'>SureAdhesiveness180 (you)</p>
                                <span 
                                style={{
                                    display:'flex', 
                                    alignItems:'center', 
                                    gap:'0.25rem',
                                    color: '#0045ac',
                                    fontSize: '0.75rem',
                                    lineHeight: '1rem'
                                    }}>
                                    <MdAdminPanelSettings />
                                    <span>Host</span>
                                </span>
                            </span>
                        </div>
                    </div>
                    )}
                    {displayedSection === 'invited' && (
                    <div className='invite-section-about'>
                        <div className='admin-invite-about'>
                            <span className='image-admin-invite-about'>
                                <Image
                                    borderRadius='full'
                                    boxSize='2rem'
                                    margin='0.5rem'
                                    src='https://bit.ly/dan-abramov'
                                    alt='Dan Abramov'
                                    cursor='pointer'
                                />
                            </span>
                            <span className='detail-admin-invite-about'>
                                <p className='admin-name-chat-group'>SureAdhesiveness180</p>
                                <Tooltip 
                                        hasArrow 
                                        label='Kick' 
                                        placement='top'
                                        isOpen={tooltipOpen} 
                                    >
                                        <span 
                                            onMouseEnter={() => setTooltipOpen(true)} 
                                            onMouseLeave={() => setTooltipOpen(false)} 
                                        >
                                            <MdBlockFlipped cursor='pointer'/>
                                        </span>
                                    </Tooltip>
                            </span>
                        </div>
                    </div>
                    )}
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
                    colorScheme={groupName.trim() ? 'blue' : 'gray'} 
                    variant={groupName.trim() ? 'solid' : 'none'} 
                    size='sm'
                    borderRadius="20px" 
                    style={{
                        cursor: groupName.trim() ? 'pointer' : 'default'
                    }}
                    >
                        Save
                        </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

export default AboutDrawer;
