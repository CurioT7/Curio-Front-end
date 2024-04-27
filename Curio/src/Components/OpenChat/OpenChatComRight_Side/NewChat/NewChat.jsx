import React, { useEffect, useState } from 'react';
import profile from "../../../../assets/avatar_default_6.png";
import { FaRegSquare } from "react-icons/fa";
import { BsCheckSquareFill } from "react-icons/bs";
import "./NewChat.css";
import { Image, Button, Stack, Spacer } from '@chakra-ui/react';
import HeaderChatRight_Side from "../../HeaderChatRight_Side/HeaderChatRight_Side";


function NewChat() {
    const [squareIsChecked, setSquareIsChecked] = useState(false);
    const [selectedUser, setSelectedUser] = useState({ image: '', username: '' });

    const handleSquareIsCheckedAndSelectUser = (image, username) => {
        setSquareIsChecked(!squareIsChecked);
        setSelectedUser({ image, username });
        if (!squareIsChecked) {
            document.getElementById("floatingInput").value = username;
        } else {
            document.getElementById("floatingInput").value = "";
        }
    };

    return (
        <div className='chat-div'>
            <HeaderChatRight_Side header='New Chat' />
            <form className='chat-form'>
                <main className='chat-main'>
                    <div>
                        <span>
                            <div>
                                <div class="form-floating">
                                    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" style={{ borderRadius: '1rem' }}/>
                                    <label for="floatingInput">Type username(s)<span style={{color:'red'}}>*</span></label>
                                </div>
                                <div className='new-chat-form-container'>
                                    <div className='suggested-div'>Suggested</div>
                                    <li className='chat-li' onClick={() => handleSquareIsCheckedAndSelectUser({profile}, 'General_Boat_962')} >
                                        <div className='container-li-chat'>
                                            <span className='span-li-chat'>
                                                <Image
                                                    boxSize='32px'
                                                    objectFit='cover'
                                                    src={profile}
                                                    alt='Dan Abramov'
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        borderRadius: '20px'
                                                    }}
                                                />
                                                General_Boat_962
                                            </span>
                                            <span
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                {squareIsChecked ? <BsCheckSquareFill /> : <FaRegSquare />}
                                            </span>
                                        </div>
                                    </li>
                                </div>
                            </div>
                        </span>
                    </div>
                </main>
                <div className='buttons-section-chat'>
                    <Stack spacing={4} direction='row-reverse' align='center'>
                        <Spacer />
                        <Button colorScheme='gray' size='sm' borderRadius="20px">
                            Start Chat
                        </Button>
                        <Button colorScheme='gray' size='sm' borderRadius="20px">
                            Cancel
                        </Button>
                    </Stack>
                </div>
            </form>
        </div>
    );
}

export default NewChat;
