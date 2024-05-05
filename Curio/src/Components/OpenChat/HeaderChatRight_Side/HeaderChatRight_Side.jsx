import React from 'react';
import "./HeaderChatRight_Side.css";
import {
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverArrow,
    PopoverCloseButton,
    PopoverBody
} from "@chakra-ui/react";
import { RiNotificationFill, RiNotificationOffLine } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdPersonAddAlt1 } from "react-icons/md";
import { AiOutlineInfoCircle } from "react-icons/ai";

function HeaderChatRight_Side(props) {

    return (
        <header className='chat-header'>
            <div className='header-conatainer'>
                {props.header}
            </div>
            {props.check === "true" && (
                <Popover placement='top-start'>
                    <PopoverTrigger>
                        <Button colorScheme='teal' variant='ghost'><i className="fa-solid fa-gear" /></Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        {/* <PopoverBody className='settings-live-chat-popover'>
                        <div className='settings-live-chat-popover-option'>
                            <div className='icon-settings-live-popover'>
                                <AiOutlineInfoCircle />
                            </div>
                            <span>About</span>
                        </div>
                    </PopoverBody>
                    <PopoverBody className='settings-live-chat-popover'>
                        <div className='settings-live-chat-popover-option'>
                            <div className='icon-settings-live-popover'>
                                <MdPersonAddAlt1 />
                            </div>
                            <span>Invite</span>
                        </div>
                    </PopoverBody> */}
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
            )}
        </header>
    );
}

export default HeaderChatRight_Side;
