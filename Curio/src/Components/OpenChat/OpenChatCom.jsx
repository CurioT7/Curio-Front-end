import React, { useEffect, useState } from 'react';
import "./OpenChatCom.css";
import { Flex, Spacer, Box } from '@chakra-ui/react';
import { IoChatbubbleSharp, IoFilterOutline } from "react-icons/io5";
import { MdKeyboardArrowDown, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { PiArrowBendUpLeft } from "react-icons/pi";
import profile from "../../assets/avatar_default_6.png";

function OpenChatCom() {
    return (
        <Flex className='left-side-open-chat-container' style={{ display: 'flex', flexDirection: 'column' }}>
            <Flex className='chat-left-title'>
                <Box style={{
                    lineHeight: '1.5rem',
                    fontWeight: '700',
                    fontSize: '1.125rem'
                }}>Chats</Box >
                <Spacer />
                <Box style={{ display: 'flex', marginLeft: '130.312px' }}>
                    <div className='add-chat'>
                        <IoChatbubbleSharp style={{
                            width: '2rem',
                        }} />
                    </div>
                    <div className='filter-chat-options'>
                        <IoFilterOutline />
                        <MdKeyboardArrowDown />
                    </div>
                </Box>
            </Flex>
            <div className="threads-container">
                <div className='threads-list'>
                    <span className='left-section-thread'>
                        <span className='threads-arrow-leftup'><PiArrowBendUpLeft /></span>
                        <span className='thread-title'>Threads</span>
                    </span>
                    <span className="arrow-right-threads-icon">
                        <MdOutlineKeyboardArrowRight />
                    </span>
                </div>
            </div>
            <div>
                <div>
                    <a href="#" className='message-container-text'>
                        <span className='image-chat-message'>
                            <img src={profile} alt="" style={{borderRadius:'624.938px'}}/>
                        </span>
                        <div className='body-chat-message'>
                            <div className='row-1-chat'>
                                <span className='username-chat'>General_Boat_962 </span>
                                <span className='last-message-time'>5:16 PM</span>
                            </div>
                            <div className='row-2-chat'>
                                <span className='last-message'> You: a </span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </Flex>
    );
}

export default OpenChatCom;
