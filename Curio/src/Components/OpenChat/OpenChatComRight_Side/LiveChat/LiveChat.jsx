import React, { useState, useRef } from 'react';
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
    const [message, setMessage] = useState('');

    const pickerRef = useRef(null);

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleEmojiSelect = (emoji) => {
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
            <div className='message-date-live-chat'>
                <div className='date-line-beside' />
                Apr 28
                <div className='date-line-beside' />
            </div>
            <div className='message-content-live-chat-container'>
                <span className='image-chat-message'>
                    <img src={profile} alt="" style={{ borderRadius: '20px' }} />
                </span>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5em'
                }}>
                    <div style={{
                        display:'flex',
                        flexDirection:'row',
                        gap: '.25rem',
                        alignItems: 'center'
                    }}>
                        <span className='sender-name-live-chat'>General_Boat_962</span>
                        <span className='sender-time-live-chat'>1:04 AM</span>
                    </div>
                    <span>
                        Hi, I am Omar Adel
                    </span>
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
                                <Tooltip hasArrow label='Select sticker' placement='top'>
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
                    <Button colorScheme={message ? 'blue' : 'gray'} variant={message ? 'ghost' : 'none'}
                        style={{
                            paddingRight: '8px',
                            paddingLeft: '8px',
                            height: '40px',
                            width: '40px',
                            borderRadius: '100%',
                            cursor: message ? 'pointer' : 'default'
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
