/**
 * Function component for the header of the right side chat.
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.header - The header content.
 * @param {string} props.check - Check if the header is present.
 * @module HeaderChatRightSide
 */
import React, {useState} from 'react';
import "./HeaderChatRight_Side.css";
import {
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody
} from "@chakra-ui/react";
import { RiNotificationFill, RiNotificationOffLine } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdPersonAddAlt1 } from "react-icons/md";
import { AiOutlineInfoCircle } from "react-icons/ai";
import AboutDrawer from "./AboutDrawer/AboutDrawer";
import InviteDrawer from './InviteDrawer/InviteDrawer';

function HeaderChatRightSide(props) {
    const [isAboutDrawerOpen, setIsAboutDrawerOpen] = useState(false);
    const [isInviteDrawerOpen, setIsInviteDrawerOpen] = useState(false);

    /**
     * Function to toggle the about drawer.
     */
    const toggleAboutDrawer = () => {
        setIsAboutDrawerOpen(!isAboutDrawerOpen);
    };

    /**
     * Function to toggle the invite drawer.
     */
    const toggleInviteDrawer = () => {
        setIsInviteDrawerOpen(!isInviteDrawerOpen);
    };


    return (
        <header className='chat-header'>
            <div className='header-conatainer'>
                {props.header}
            </div>
            {props.check === "true" && (
                <>
                <Popover placement='top-start'>
                    <PopoverTrigger>
                        <Button colorScheme='teal' variant='ghost'><i className="fa-solid fa-gear" /></Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverBody className='settings-live-chat-popover'>
                            <div className='settings-live-chat-popover-option' onClick={toggleAboutDrawer}>
                                <div className='icon-settings-live-popover'>
                                    <AiOutlineInfoCircle />
                                </div>
                                <span>About</span>
                            </div>
                        </PopoverBody>
                        <PopoverBody className='settings-live-chat-popover'>
                            <div className='settings-live-chat-popover-option' onClick={toggleInviteDrawer}>
                                <div className='icon-settings-live-popover'>
                                    <MdPersonAddAlt1 />
                                </div>
                                <span>Invite</span>
                            </div>
                        </PopoverBody>
                        <PopoverBody className='settings-live-chat-popover'>
                            <div className='settings-live-chat-popover-option'>
                                <div className='icon-settings-live-popover'>
                                    <RiNotificationFill />
                                </div>
                                <span>Unmute notifications</span>
                            </div>
                        </PopoverBody>
                        <PopoverBody className='settings-live-chat-popover'>
                            <div className='settings-live-chat-popover-option'>
                                <div className='icon-settings-live-popover'>
                                    <FaEye />
                                </div>
                                <span>Hide chat</span>
                            </div>
                        </PopoverBody>
                        {/* <PopoverBody className='settings-live-chat-popover'>
                        <div className='settings-live-chat-popover-option'>
                            <div className='icon-settings-live-popover'>
                                <FaEyeSlash />
                            </div>
                            <span>Leave chat</span>
                        </div>
                    </PopoverBody> */}
                    </PopoverContent>
                </Popover>
                <AboutDrawer isOpen={isAboutDrawerOpen} onClose={toggleAboutDrawer} />
                <InviteDrawer isOpen={isInviteDrawerOpen} onClose={toggleInviteDrawer} />
                </>
            )}
        </header>
    );
}

export default HeaderChatRightSide;
