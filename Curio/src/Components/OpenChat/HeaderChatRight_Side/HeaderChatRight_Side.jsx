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

function HeaderChatRight_Side(props) {

    return (
        <header className='chat-header'>
            <div className='header-conatainer'>
                {props.header}
            </div>
            <Popover placement='top-start'>
                <PopoverTrigger>
                    <Button colorScheme='teal' variant='ghost'><i className="fa-solid fa-gear" /></Button>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverBody className='settings-live-chat-popover'>
                        <div className='settings-live-chat-popover-option'>
                            <i class="fa-solid fa-info" />
                            <span>About</span>
                        </div>
                    </PopoverBody>
                    <PopoverBody className='settings-live-chat-popover'>
                        <div className='settings-live-chat-popover-option'>
                            <i class="fa-solid fa-info" />
                            <span>About</span>
                        </div>
                    </PopoverBody>
                    <PopoverBody className='settings-live-chat-popover'>
                        <div className='settings-live-chat-popover-option'>
                            <RiNotificationFill />
                            <span>Unmute notifications</span>
                        </div>
                    </PopoverBody>
                    <PopoverBody className='settings-live-chat-popover'>
                        <div className='settings-live-chat-popover-option'>
                            <i class="fa-solid fa-info" />
                            <span>About</span>
                        </div>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </header>
    );
}

export default HeaderChatRight_Side;
