import React, { useState, useRef, useEffect } from 'react';
import "./LiveChat.css";
import profile from "../../../../assets/avatar_default_6.png";
import HeaderChatRight_Side from "../../HeaderChatRight_Side/HeaderChatRight_Side";
import { Button, Input, InputGroup, InputRightElement, Tooltip } from '@chakra-ui/react';
import { IoMdCamera, IoMdSend } from "react-icons/io";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import EmojiPicker from '@emoji-mart/react';
import data from '@emoji-mart/data';

function LiveChat() {
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [currentEmoji, setCurrentEmoji] = useState(null);
    const [message, setMessage] = useState('');

    const pickerRef = useRef(null);

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleEmojiSelect = (emoji) => {
        setCurrentEmoji(emoji.native);
        setMessage(message + emoji.native);
    };

    return (
        <div className='chat-div'>
            <HeaderChatRight_Side header='General_Boat_962' />
            <div className='Live-chat-form'>
                <div className='Live-chat-profile-data'>
                    <a style={{
                        textDecorationLine: 'none',
                        color: '#2a3c42',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <div className='Live-chat-profile-picture'>
                            <img src={profile} className="picture-live-chat" alt="" />
                        </div>
                        <div className='Live-chat-profile-username'>
                            General_Boat_962
                        </div>
                        <div className='Live-chat-profile-username-details'>
                            Redditor for 61d  ·  1 karma
                        </div>
                    </a>
                </div>
            </div>
            <div className='chat-live-input'>
                <form action="" className='form-input-live-chat'>
                    <Button colorScheme='gray' variant='ghost'
                        style={{
                            paddingRight: '8px',
                            paddingLeft: '8px',
                            height: '40px',
                            width: '40px',
                            borderRadius: '100%'
                        }}>
                        <IoMdCamera style={{
                            height: '40px',
                            width: '40px',
                        }} />
                    </Button>
                    <div className='live-chat-input-area'>
                        <InputGroup size='md'>
                            <Input
                                placeholder="Message"
                                size="md"
                                style={{
                                    background: '#eaedef',
                                    border: '0px',
                                    borderRadius: '20px',
                                    fontSize: '1rem',
                                    width: '100%'
                                }}
                                value={message}
                                onChange={handleMessageChange}
                            />
                            <InputRightElement width='4.5rem'>
                            <Tooltip label='Select sticker' placement='top'>
                                <Button h='1.75rem' size='sm' colorScheme='teal' variant='ghost'
                                    style={{
                                        paddingRight: '8px',
                                        paddingLeft: '8px',
                                        height: '40px',
                                        width: '40px',
                                        borderRadius: '100%'
                                    }}
                                    onClick={() => setPickerVisible(!isPickerVisible)}>
                                    <BsFillEmojiSmileFill style={{
                                        height: '40px',
                                        width: '40px',
                                    }} />
                                </Button>
                                </Tooltip>
                            </InputRightElement>
                        </InputGroup>
                    </div>
                    <Button colorScheme='blue' variant='ghost'
                        style={{
                            paddingRight: '8px',
                            paddingLeft: '8px',
                            height: '40px',
                            width: '40px',
                            borderRadius: '100%'
                        }}>
                        <IoMdSend style={{
                            height: '40px',
                            width: '40px',
                        }} />
                    </Button>
                    {isPickerVisible && (
                        <div ref={pickerRef} className="emoji-picker-container">
                            <EmojiPicker data={data}
                                previewPosition="bottom"
                                onEmojiSelect={handleEmojiSelect} />
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default LiveChat;
