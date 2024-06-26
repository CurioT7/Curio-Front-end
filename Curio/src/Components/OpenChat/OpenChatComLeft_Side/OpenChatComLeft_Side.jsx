import React, { useEffect, useState } from 'react';
import "./OpenChatComLeft_Side.css";
import { Flex, Spacer, Box, position } from '@chakra-ui/react';
import { IoChatbubbleSharp, IoFilterOutline } from "react-icons/io5";
import { MdKeyboardArrowDown, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { PiArrowBendUpLeft } from "react-icons/pi";
import profile from "../../../assets/avatar_default_6.png";
import { Link } from 'react-router-dom';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    Stack,
    Button
} from '@chakra-ui/react'
import { formatTimestamp } from "../../getTimeDifference/getTimeDifference";
import { FaRegSquare } from "react-icons/fa";
import { BsCheckSquareFill } from "react-icons/bs";

function OpenChatCom({ newMessage, newParticipants, chatsData, handleChatId }) {
    if (!chatsData || !chatsData.chats) {
        return null;
    }
    const username = localStorage.getItem('username');
    const [chatChannelsChecked, setChatChannelsChecked] = useState(true);
    const [groupChatsChecked, setGroupChatsChecked] = useState(true);
    const [directChatsChecked, setDirectChatsChecked] = useState(true);

    const handleChatChannelsChange = () => {
        setChatChannelsChecked(!chatChannelsChecked);
    };

    const handleGroupChatsChange = () => {
        setGroupChatsChecked(!groupChatsChecked);
    };

    const handleDirectChatsChange = () => {
        setDirectChatsChecked(!directChatsChecked);
    };

    return (
        <Flex className='left-side-open-chat-container' style={{ display: 'flex', flexDirection: 'column', height:'100vh' }}>
            <Flex className='chat-left-title'>
                <Box style={{
                    lineHeight: '1.5rem',
                    fontWeight: '700',
                    fontSize: '1.125rem'
                }}>Chats</Box >
                <Spacer />
                <Box className='chat-icons-header'>
                    <Link to={'/room/create'} className='add-chat'>
                        <IoChatbubbleSharp style={{
                            width: '2rem',
                        }} />
                    </Link>
                    <div className='filter-chat-options'>
                        <Popover placement='top-start' style={{ position: 'relative' }}>
                            <PopoverTrigger>
                                <Button style={{ background: 'transparent', padding: '0', height: '5px' }}><IoFilterOutline />
                                    <MdKeyboardArrowDown /></Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <PopoverBody>
                                    <div className='popover-chat-list'>
                                        <Stack direction="row" align="center" style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }} onClick={handleChatChannelsChange}>
                                            <span>Chat channels</span>
                                            {chatChannelsChecked ? <BsCheckSquareFill color='blue' /> : <FaRegSquare />}
                                        </Stack>
                                        <Stack direction="row" align="center" style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }} onClick={handleGroupChatsChange}>
                                            <span>Group chats</span>
                                            {groupChatsChecked ? <BsCheckSquareFill color='blue' /> : <FaRegSquare />}
                                        </Stack>
                                        <Stack direction="row" align="center" style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }} onClick={handleDirectChatsChange}>
                                            <span>Direct chats</span>
                                            {directChatsChecked ? <BsCheckSquareFill color='blue' /> : <FaRegSquare />}
                                        </Stack>
                                        <Stack spacing={4} direction='row-reverse' align='center'>
                                            <Button colorScheme='blue' size='sm' borderRadius="20px">
                                                Apply
                                            </Button>
                                        </Stack>
                                    </div>
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>
                    </div>
                </Box>
            </Flex>
            <Link to={'/threads'} className="threads-container">
                <div className='threads-list'>
                    <span className='left-section-thread'>
                        <span className='threads-arrow-leftup'><PiArrowBendUpLeft /></span>
                        <span className='thread-title'>Threads</span>
                    </span>
                    <span className="arrow-right-threads-icon">
                        <MdOutlineKeyboardArrowRight />
                    </span>
                </div>
            </Link>
            <div style={{height: '100vh' , overflow:'auto'}}>
                {Array.isArray(chatsData.chats) && chatsData.chats.map(chat => (
                    <div key={chat._id}>
                        <Link to={`/chat/${chat._id}`} className='message-container-text' onClick={() => handleChatId(chat._id)}>
                            <span className='image-chat-message'>
                                <img
                                    src={chat?.profilePicture || profile}
                                    alt=""
                                    style={{ borderRadius: '20px' }}
                                />
                            </span>
                            <div className='body-chat-message'>
                                <div className='row-1-chat'>
                                    <span className='username-chat'>{chat.participants}</span>
                                    <span className='last-message-time'>{formatTimestamp(chat.messages[0].timestamp)}</span>
                                </div>
                                <div className='row-2-chat'>
                                    <span className='last-message'> {chat.sender === username ? 'You' : chat.sender}: {chat.messages[0].message} </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </Flex>
    );
}

export default OpenChatCom;
