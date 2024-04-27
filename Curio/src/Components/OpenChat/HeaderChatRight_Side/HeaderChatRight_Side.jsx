import React from 'react';
import "./HeaderChatRight_Side.css";


function HeaderChatRight_Side(props) {

    return (
        <header className='chat-header'>
            <div className='header-conatainer'>
                {props.header}
            </div>
        </header>
    );
}

export default HeaderChatRight_Side;
