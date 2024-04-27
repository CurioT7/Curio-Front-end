import React from 'react';
import "./Threads.css";
import { Button } from '@chakra-ui/react';
import HeaderChatRight_Side from "../../HeaderChatRight_Side/HeaderChatRight_Side";


function Threads() {
    return (
        <div className='chat-div'>
            <HeaderChatRight_Side header='Threads' />
            <div className='chat-form'
                style={{
                    alignSelf: 'center',
                    padding: '0 16px',
                    textAlign: 'center',
                }}>
                <div className='threads-container'
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                        alignItems: 'center',
                    }}>
                    <h3 style={{ fontWeight: '700' }}>You don't have any threads yet</h3>
                    <small style={{ color: '#576f76', marginBottom: '0.5rem' }}>When you do, they'll show up here.</small>
                    <Button colorScheme='blue' size='sm' style={{borderRadius:'20px'}}>
                        Go to messages
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Threads;
