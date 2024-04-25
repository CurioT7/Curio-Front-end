import React, { useEffect, useState } from 'react';
import "./OpenChatCom.css";
import { Flex, Spacer, Box } from '@chakra-ui/react';
import { IoChatbubbleSharp, IoFilterOutline } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";

function OpenChatCom() {
    return (
        <Flex className='left-side-open-chat-container'>
            <Flex className='chat-left-title'>
                <Box style={{
                    lineHeight: '1.5rem',
                    fontWeight: '700',
                    fontSize: '1.125rem'
                }}>Chats</Box >
                <Spacer />
                <Box style={{ display: 'flex' , marginLeft:'130.312px'}}>
                    <div className='add-chat'>
                        <IoChatbubbleSharp style={{
                            width: '2rem',
                            // paddingLeft:'.375rem',
                            // paddingRight:'.375rem',
                            // alignItems: 'center',
                            // display: 'inline-flex',
                            // marginRight: '.25rem',
                            // marginLeft: '130.312px',
                            // cursor: 'pointer'
                        }} />
                    </div>
                    <div className='filter-chat-options'>
                        <IoFilterOutline />
                        <MdKeyboardArrowDown />
                    </div>
                </Box>
            </Flex>
        </Flex>
    );
}

export default OpenChatCom;
