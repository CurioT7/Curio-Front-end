import React from 'react';
import "./LiveChat.css";
import profile from "../../../../assets/avatar_default_6.png";
import { Button } from '@chakra-ui/react'


function LiveChatInput() {
    return (
        <div className='chat-live-input'>
            <form action="">
            <Button colorScheme='teal' variant='outline'>
    Call us
  </Button>
            </form>
        </div>
    );
}

export default LiveChatInput;
